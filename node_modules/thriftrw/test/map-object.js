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
var bufrw = require('bufrw');
var testRW = require('bufrw/test_rw');

var thriftrw = require('../index');
var MapObjectRW = thriftrw.MapObjectRW;

var strType = {
    name: 'string',
    typeid: 1,
    rw: bufrw.str1
};
var i16Type = {
    name: 'i16',
    typeid: 2,
    rw: bufrw.Int16BE
};

var strI16MapRW = new MapObjectRW(strType, i16Type);
test('MapObjectRW: strI16MapRW', testRW.cases(strI16MapRW, [
    [{}, [
        0x01,                  // key_type:1 -- 99
        0x02,                  // val_type:1 -- 98
        0x00, 0x00, 0x00, 0x00 // length:4   -- 0
    ]],

    [{
        'abc': 1,
        'def': 2,
        'ghi': 3
    }, [
        0x01,                   // key_type:1 -- 99
        0x02,                   // val_type:1 -- 98
        0x00, 0x00, 0x00, 0x03, // length:4   -- 3
                                //            --
        0x03,                   // str_len:4  -- 3
        0x61, 0x62, 0x63,       // chars      -- "abc"
        0x00, 0x01,             // Int16BE    -- 1
                                //            --
        0x03,                   // str_len:4  -- 3
        0x64, 0x65, 0x66,       // chars      -- "def"
        0x00, 0x02,             // Int16BE    -- 2
                                //            --
        0x03,                   // str_len:4  -- 3
        0x67, 0x68, 0x69,       // chars      -- "ghi"
        0x00, 0x03              // Int16BE    -- 3
    ]],

    {
        readTest: {
            bytes: [
                0x09,                  // key_type:1 -- 99
                0x02,                  // val_type:1 -- 98
                0x00, 0x00, 0x00, 0x00 // length:4   -- 3
            ],
            error: {
                type: 'thrift-map-key-typeid-mismatch',
                name: 'ThriftMapKeyTypeidMismatchError',
                message: 'encoded map key typeid 9 doesn\'t match expected ' +
                         'type "string" (id: 1)'
            }
        }
    },

    {
        readTest: {
            bytes: [
                0x01,                  // key_type:1 -- 99
                0x09,                  // val_type:1 -- 98
                0x00, 0x00, 0x00, 0x00 // length:4   -- 3
            ],
            error: {
                type: 'thrift-map-val-typeid-mismatch',
                name: 'ThriftMapValTypeidMismatchError',
                message: 'encoded map value typeid 9 doesn\'t match expected ' +
                         'type "i16" (id: 2)'
            }
        }
    }
]));

var strStrMapRW = new MapObjectRW(strType, strType);
test('MapObjectRW: strStrMapRW', testRW.cases(strStrMapRW, [
    [{
        'abc': 'ABC',
        'def': 'DEF',
        'ghi': 'GHI'
    }, [
        0x01,                   // key_type:1 -- 99
        0x01,                   // val_type:1 -- 98
        0x00, 0x00, 0x00, 0x03, // length:4   -- 3
                                //            --
        0x03,                   // str_len:4  -- 3
        0x61, 0x62, 0x63,       // chars      -- "abc"
        0x03,                   // str_len:4  -- 3
        0x41, 0x42, 0x43,       // chars      -- "ABC"
                                //            --
        0x03,                   // str_len:4  -- 3
        0x64, 0x65, 0x66,       // chars      -- "def"
        0x03,                   // str_len:4  -- 3
        0x44, 0x45, 0x46,       // chars      -- "DEF"
                                //            --
        0x03,                   // str_len:4  -- 3
        0x67, 0x68, 0x69,       // chars      -- "ghi"
        0x03,                   // str_len:4  -- 3
        0x47, 0x48, 0x49        // chars      -- "GHI"
    ]]
]));
