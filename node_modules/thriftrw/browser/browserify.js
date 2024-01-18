// Copyright (c) 2020 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var browserify = require('browserify');
var fs = require('fs');
var path = require('path');
var brfs = require('brfs');
var through = require('through2');
var idl = require('../thrift-idl');
var resolve = require('resolve');

// Setting browserField: false as an option in 'var b = browserify()' should prevent
// browserify from using the 'browser' field from our package.json, which is only
// meant to be used when users use this library to bundle their projects.
// But this feature is broken, see here : https://github.com/browserify/browserify/pull/1826
// This is a hack around the issue.
function fixBrowserifyBrowserField(b) {
    b._bresolve = function (id, opts, cb) {
        if (!opts.basedir) opts.basedir = path.dirname(opts.filename);
        // Resolve builtin modules.
        if (b._mdeps.options.modules[id]) return process.nextTick(function () {
            cb(null, b._mdeps.options.modules[id]);
        });
        resolve(id, opts, cb);
    };
}

function buildTestBundle() {
    // Allow tests to have access to the thrift files.
    var idls = {};
    var files = fs.readdirSync(path.join('..', 'test'));
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file.endsWith('.thrift')) {
            idls[path.join('/', 'test', file)] = fs.readFileSync(path.join('..', 'test', file), 'utf-8');
        }
    }

    var b = browserify(path.join('..', 'test', 'index.js'), {insertGlobalVars: {
        'global.idls': function() {
            return JSON.stringify(idls);
        }
    }});
    fixBrowserifyBrowserField(b);

    // Replace fs.readFileSync with actual file source for the tests.
    b.transform(function (file) {
        // We don't need brfs to run on the library, just on the tests.
        // test/asts.js and test/idls.js don't work well with brfs because of the 'fs: fs' option
        if (!path.parse(file).dir.endsWith('test') || ['asts.js', 'idls.js'].indexOf(path.parse(file).base) >= 0) {
            return through(function (buf, enc, next) {
                this.push(buf);
                next();
            });
        }
        return brfs(file, {});
    });

    b.bundle().pipe(fs.createWriteStream(path.join('dist', 'test-bundle.js')));
}

function buildReleaseBundle() {
    var b = browserify(path.join('..', 'index.js'), {standalone: 'thriftrw'});
    fixBrowserifyBrowserField(b);
    b.bundle().pipe(process.stdout);
}

buildTestBundle()
buildReleaseBundle()
