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
var fs = require('fs');
var path = require('path');
var source = fs.readFileSync(path.join(__dirname, 'recursion.thrift'), 'utf-8');
var thrift = new Thrift({source: source});
var Shark = thrift.Shark;

test('recursive rw', testRW.cases(Shark.rw, [

    [new Shark(), [
        0x00 // type:1 -- 0 -- stop
    ]],

    [new Shark({left: new Shark(), right: new Shark()}), [
        0x0c,       // type:1 -- 12 -- STRUCT
        0x00, 0x02, // id:2   -- 2  -- left
        0x00,       // typeid -- 0  -- STOP
        0x0c,       // type:1 -- 12 -- STRUCT
        0x00, 0x03, // id:2   -- 3  -- right
        0x00,       // typeid -- 0  -- STOP
        0x00        // type:1 -- 0  -- STOP
    ]],

    [new Shark({name: 'Katie'}), [
        0x0b,                         // type:1  -- 11 -- STRING
        0x00, 0x01,                   // id:2    -- 1  -- name
        0x00, 0x00, 0x00, 0x05,       // name~4  -- 5
        0x4b, 0x61, 0x74, 0x69, 0x65, // 'Katie'
        0x00                          // type:1  -- 0  -- STOP
    ]],

    [new Shark({name: 'Katie', left: new Shark()}), [
        0x0b,                         // type:1  -- 11 -- STRING
        0x00, 0x01,                   // id:2    -- 1  -- name
        0x00, 0x00, 0x00, 0x05,       // name~4  -- 5
        0x4b, 0x61, 0x74, 0x69, 0x65, // 'Katie'
        0x0c,                         // type:1  -- 12 -- STRUCT
        0x00, 0x02,                   // id:2    -- 2  -- left
        0x00,                         // typeid  -- 0  -- STOP
        0x00                          // type:1  -- 0  -- STOP
    ]],

    [new Shark({name: 'Katie', right: new Shark({right: new Shark()})}), [
        0x0b,                         // type:1  -- 11 -- STRING
        0x00, 0x01,                   // id:2    -- 1  -- name
        0x00, 0x00, 0x00, 0x05,       // name~4  -- 5
        0x4b, 0x61, 0x74, 0x69, 0x65, // 'Katie'
        0x0c,                         // type:1  -- 12 -- STRUCT
        0x00, 0x03,                   // id:2    -- 3  -- right
        0x0c,                         // type:1  -- 12 -- STRUCT
        0x00, 0x03,                   // id:2    -- 3  -- right
        0x00,                         // typeid  -- 0  -- STOP
        0x00,                         // typeid  -- 0  -- STOP
        0x00                          // type:1  -- 0  -- STOP
    ]],

    {
        readTest: {
            bytes: [
                0x0b,      // type:1 -- 11 -- STRING
                0x00, 0x02 // id:2   -- 2  -- left
            ],
            error: {
                type: 'thrift-unexpected-field-value-typeid',
                name: 'ThriftUnexpectedFieldValueTypeidError',
                message: 'unexpected typeid 11 (STRING) for field "left" with id 2 on Shark; expected 12 (STRUCT)'
            }
        }
    }

]));
