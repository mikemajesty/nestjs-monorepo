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

// The loader test module is a utility for validating both the synchronous
// Thrift constructor and the asynchronous Thrift.load constructor.
// The exported withLoader function calls back twice, once with synchronous
// loadThrift and testThrift functions and again with asynchronous versions.
// This allows some tests, particularly those that exercise Thrift IDL files
// that have "include" directives, to exercise both the synchronous and
// asynchronous code paths.

var fs = require('fs');
var path = require('path');
var test = require('tape');
var Thrift = require('../thrift').Thrift;

function asyncReadFile(filename, encoding, cb) {
    var error;
    var source;
    if (process.browser) {
        source = global.idls[filename];
        if (!source) {
            error = Error(filename + ': missing file');
        }
    } else {
        try {
            source = fs.readFileSync(path.resolve(filename), encoding);
        } catch (err) {
            error = err;
        }
    }
    setTimeout(function () {
        cb(error, source);
    }, 0);
}

function readFileNotExpected(_, _, cb) {
    cb(Error('Thrift must be constructed with options.fs.readFile'))
}

function loadThriftAsync(options, cb) {
    if (options && typeof options === 'object') {
        var readFile = readFileNotExpected;
        if (options.allowFilesystemAccess || options.fs) {
            readFile = asyncReadFile;
        }
        options.fs = {readFile: readFile};
        delete options.allowFilesystemAccess;
    }
    try {
        Thrift.load(options, cb);
    } catch (err) {
        cb(err);
    }
}

function loadThriftSync(options, cb) {
    var thrift;
    var error;
    try {
        thrift = new Thrift(options);
    } catch (err) {
        error = err;
    }
    cb(error, thrift);
}

function testSync(name, testCase) {
    test(name + ' sync', testCase);
}

function testAsync(name, testCase) {
    test(name + ' async', testCase);
}

function withLoader(f) {
    f(loadThriftSync, testSync);
    f(loadThriftAsync, testAsync);
}

module.exports = withLoader;
