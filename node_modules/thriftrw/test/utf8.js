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

'use strict';

var path = require('path');
var fs = require('fs');
var withLoader = require('./loader');

var allowFilesystemAccess = !process.browser;
var idls = process.browser ? global.idls : null;

withLoader(function (loadThrift, test) {
    test('parse a UTF-8 encoded comment', function t(assert) {
        loadThrift({
            entryPoint: path.join(__dirname, 'utf8_parent.thrift'),
            allowFilesystemAccess: allowFilesystemAccess,
            idls: idls,
        }, function (err, thrift) {
            assert.ifError(err);
            var MyEnum = thrift.getType('MyEnum');
            assert.end();
        });
    });
});
