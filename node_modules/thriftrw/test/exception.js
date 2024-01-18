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
var fs = require('fs');
var path = require('path');
var Thrift = require('../thrift').Thrift;

var source = fs.readFileSync(path.join(__dirname, 'exception.thrift'), 'utf-8');
var thrift = new Thrift({source: source});

var err = new thrift.BogusNameError({message: 'Bogus name: Voldemort', bogusName: 'Voldemort'});

test('Exception RW', testRW.cases(thrift.BogusNameError.rw, [

    [err, [
        0x0b,                         // typeid:1 -- 11, STRING
        0x00, 0x01,                   // id:2     -- 1, bogusName
        0x00, 0x00, 0x00, 0x09,       // length:4 -- 9
        0x56, 0x6f, 0x6c, 0x64, 0x65, //          -- 'Voldemort'
        0x6d, 0x6f, 0x72, 0x74,       //
        0x0b,                         // typeid:1 -- 11, STRING
        0x00, 0x02,                   // id:2     -- 2, message
        0x00, 0x00, 0x00, 0x15,       // lenght:4 -- 21
        0x42, 0x6f, 0x67, 0x75, 0x73,
        0x20, 0x6e, 0x61, 0x6d, 0x65,
        0x3a, 0x20, 0x56, 0x6f, 0x6c,
        0x64, 0x65, 0x6d, 0x6f, 0x72,
        0x74,
        0x00                          // typeid:1 -- 0, STOP
    ]]

]));

var err2 = new thrift.BogusWithType({message: 'Bogus name: Voldemort', type: 'Voldemort'});

test('Exception RW with type', testRW.cases(thrift.BogusWithType.rw, [

    [err2, [
        0x0b,                         // typeid:1 -- 11, STRING
        0x00, 0x01,                   // id:2     -- 1, type
        0x00, 0x00, 0x00, 0x09,       // length:4 -- 9
        0x56, 0x6f, 0x6c, 0x64, 0x65, //          -- 'Voldemort'
        0x6d, 0x6f, 0x72, 0x74,       //
        0x0b,                         // typeid:1 -- 11, STRING
        0x00, 0x02,                   // id:2     -- 2, message
        0x00, 0x00, 0x00, 0x15,       // lenght:4 -- 21
        0x42, 0x6f, 0x67, 0x75, 0x73,
        0x20, 0x6e, 0x61, 0x6d, 0x65,
        0x3a, 0x20, 0x56, 0x6f, 0x6c,
        0x64, 0x65, 0x6d, 0x6f, 0x72,
        0x74,
        0x00                          // typeid:1 -- 0, STOP
    ]]

]));
