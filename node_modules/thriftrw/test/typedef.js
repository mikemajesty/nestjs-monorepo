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

var source = fs.readFileSync(path.join(__dirname, 'typedef.thrift'), 'utf-8');
var thrift = new Thrift({source: source});

test('follows references through typedefs', function t(assert) {
    assert.strictEqual(thrift.getType('Structure'), thrift.getType('Tree'));
    assert.end();
});

test('Typedef rw', testRW.cases(thrift.Tree.rw, [

    [new thrift.Tree({value: 0, children: []}), [
        0x08,                   // typeid:1  -- 8, i32
        0x00, 0x01,             // id:2      -- 1, "value"
        0x00, 0x00, 0x00, 0x00, // value:4   -- 0
        0x0f,                   // typeid:1  -- 15, list
        0x00, 0x02,             // id:2      -- 2, "children"
        0x0c,                   // el_type:1 -- struct
        0x00, 0x00, 0x00, 0x00, // length:4  -- 0
        0x00                    // typeid:1  -- 0, stop
    ]]

]));
