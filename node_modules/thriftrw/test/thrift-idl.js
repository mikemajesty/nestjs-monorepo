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

/* eslint max-len:[0, 120] */
'use strict';

var idl = require('../thrift-idl');
var fs = require('fs');
var path = require('path');
var test = require('tape');

test('thrift IDL parser can parse thrift test files', function t(assert) {
    var idls = {};
    if (process.browser) {
        idls = global.idls;
    } else {
        var extension = '.thrift';
        var dirname = path.join(__dirname, 'thrift');
        var filenames = fs.readdirSync(dirname);
        for (var index = 0; index < filenames.length; index++) {
            var filename = filenames[index];
            var fullFilename = path.join(dirname, filename);
            if (filename.indexOf(extension, filename.length - extension.length) > 0) {
                idls[filename] = fs.readFileSync(fullFilename, 'utf-8');
            }
        }
    }

    var filenames = Object.keys(idls);
    for (var i = 0; i < filenames.length; i++) {
        var file = filenames[i];
        try {
            idl.parse(idls[file]);
            assert.pass(file);
        } catch (err) {
            assert.fail(file);
        }
    }
    assert.end();
});
