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
var Thrift = require('../thrift').Thrift;

var thrift = new Thrift({source: 'union Foo { 1: i32 six, 2: i32 halfDozen }'});

test('UnionRW', testRW.cases(thrift.Foo.rw, [

    [new thrift.Foo({six: 6}), [
        0x08,                      // type:1 -- 8 -- I32
        0x00, 0x01,                // id:2   -- 1 -- six
        0x00, 0x00, 0x00, 0x06,    // ok:1   -- 1 -- 6
        0x00                       // type:1 -- 0 -- stop
    ]],

    [new thrift.Foo({halfDozen: 6}), [
        0x08,                      // type:1 -- 8 -- I32
        0x00, 0x02,                // id:2   -- 1 -- halfDozen
        0x00, 0x00, 0x00, 0x06,    // ok:1   -- 1 -- 6
        0x00                       // type:1 -- 0 -- stop
    ]]

]));

