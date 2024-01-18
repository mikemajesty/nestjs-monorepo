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
var path = require('path');
var fs = require('fs');
var path = require('path');
var Thrift = require('../thrift').Thrift;

var source = fs.readFileSync(path.join(__dirname, 'list.thrift'), 'utf-8');
var thrift = new Thrift({source: source});

var byteList = thrift.models.ListOfI8;
var stringList = thrift.models.ListOfString;
var listList = thrift.models.ListOfListOfStruct;

test('ThriftList.rw: list of bytes', testRW.cases(byteList.rw, [

    [[], [
        0x03,                  // type:1   -- 3, BYTE
        0x00, 0x00, 0x00, 0x00 // length:4 -- 0
    ]],

    [[1, 2, 3], [
        0x03,                   // type:1   -- 3, BYTE
        0x00, 0x00, 0x00, 0x03, // length:4 -- 3
        0x01,                   // byte:1 -- 1
        0x02,                   // byte:1 -- 2
        0x03                    // byte:1 -- 3
    ]],

    {
        readTest: {
            bytes: [
                0x2b,                  // type:1
                0x00, 0x00, 0x00, 0x00 // length:4 -- 0
            ],
            error: {
                type: 'thrift-typeid-mismatch',
                name: 'ThriftTypeidMismatchError',
                message: 'encoded list typeid 43 doesn\'t match expected ' +
                         'type "i8" (id: 3)'
            }
        }
    },

    {
        readTest: {
            bytes: [
                0x03,                  // type:1 -- 3, BYTE
                0xff, 0xff, 0xff, 0xff // length:4 -- -1
            ],
            error: {
                type: 'thrift-invalid-size',
                name: 'ThriftInvalidSizeError',
                message: 'invalid size -1 of list; expects non-negative number'
            }
        }
    }

]));

test('ThriftList.rw: list of strings', testRW.cases(stringList.rw, [

    [[], [
        0x0b,                  // type:1   -- 11, STRING
        0x00, 0x00, 0x00, 0x00 // length:4 -- 0
    ]],

    [['a', 'ab', 'abc'], [
        0x0b,                    // type:1    -- 11, STRING
        0x00, 0x00, 0x00, 0x03,  // length:4  -- 3
        0x00, 0x00, 0x00, 0x01,  // str_len:4 -- 1
        0x61,                    // chars     -- "a"
        0x000, 0x00, 0x00, 0x02, // str_len:4 -- 1
        0x61, 0x62,              // chars     -- "ab"
        0x00, 0x00, 0x00, 0x03,  // str_len:4 -- 1
        0x61, 0x62, 0x63         // chars     -- "abc"
    ]]

]));

test('ThriftList.rw: list of list of structs', testRW.cases(thrift.Service.function.result.rw, [

    [
        new thrift.Service.function.Result({success: [[], [], [], [], []]}),
        [
                         //       | STRUCT
            15,          // 0     | success: LIST
            0, 0,        // 1-2   | field id 0 success
            15,          // 3     | element type LIST
            0, 0, 0, 5,  // 3-6   | length 5
            12,          // 8     | 0: element type STRUCT
            0, 0, 0, 0,  // 9-12  | length: 0
            12,          // 13    | 1: element type STRUCT
            0, 0, 0, 0,  // 14-17 | length: 0
            12,          // .     | 2: element type STRUCT
            0, 0, 0, 0,  // .     | length: 0
            12,          // .     | 3: element type STRUCT
            0, 0, 0, 0,  //       | length: 0
            12,          //       | 4: element type STRUCT
            0, 0, 0, 0,  //       | length: 0
            0            //       | STOP
        ]
    ]

]));
