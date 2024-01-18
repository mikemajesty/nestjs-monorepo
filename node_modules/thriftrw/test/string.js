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

var test = require('tape');
var testRW = require('bufrw/test_rw');
var testThrift = require('./thrift-test');

var thriftrw = require('../index');
var StringRW = thriftrw.StringRW;
var ThriftString = thriftrw.ThriftString;
var TYPE = require('../TYPE');

var validTestCases = [
    ['', [
        0x00, 0x00, 0x00, 0x00
    ]],
    ['cat', [
        0x00, 0x00, 0x00, 0x03, // len: 3
        0x63, 0x61, 0x74        // chars  -- "cat"
    ]]
];

var testCases = [].concat(
    validTestCases
);

test('StringRW', testRW.cases(StringRW, testCases));
test('ThriftString', testThrift(ThriftString, StringRW, TYPE.STRING));
