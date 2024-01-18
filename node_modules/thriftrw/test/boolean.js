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
var invalidArgumentTestCase = require('./helpers').invalidArgumentTestCase;

var thriftrw = require('../index');
var BooleanRW = thriftrw.BooleanRW;
var ThriftBoolean = thriftrw.ThriftBoolean;
var TYPE = require('../TYPE');

var validTestCases = [
    [false, [0x00]],
    [true, [0x01]]
];

var invalidArgumentTestCases = [
    null,
    undefined,
    1,
    0x00,
    0x01,
    0x02,
    [],
    {}
].map(invalidArgumentTestCase('boolean'));

var testCases = [].concat(
    validTestCases,
    invalidArgumentTestCases
);

test('BooleanRW', testRW.cases(BooleanRW, testCases));
test('ThriftBoolean', testThrift(ThriftBoolean, BooleanRW, TYPE.BOOL));
