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

var Buffer = require('buffer').Buffer;
var test = require('tape');
var testRW = require('bufrw/test_rw');

var thriftrw = require('../index');
var TStruct = thriftrw.TStruct;
var TMap = thriftrw.TMap;
var TMapRW = thriftrw.TMapRW;
var TField = thriftrw.TField;
var TPair = thriftrw.TPair;

test('TMapRW', testRW.cases(TMapRW, [

    [TMap(11, 12, [
        TPair((Buffer.from || Buffer)('key0'), TStruct([
            TField(12, 1, TStruct([TField(8, 1, 20)])),
            TField(12, 2, TStruct([TField(11, 1, (Buffer.from || Buffer)('str2'))]))
        ])),
        TPair((Buffer.from || Buffer)('key1'), TStruct([
            TField(12, 1, TStruct([TField(8, 1, 10)])),
            TField(12, 2, TStruct([TField(11, 1, (Buffer.from || Buffer)('str1'))]))
        ]))
    ]), [

        0x0b,                   // key_type:1         -- string
        0x0c,                   // val_type:1         -- struct
        0x00, 0x00, 0x00, 0x02, // length:4           -- 2
                                //                    --
        0x00, 0x00, 0x00, 0x04, // key[0] str_len:4   -- 4
        0x6b, 0x65, 0x79, 0x30, // key[0] chars       -- "key0"
        0x0c,                   // val[0] type:1      -- struct
        0x00, 0x01,             // val[0] id:2        -- 1
        0x08,                   // val[0] > type:1    -- i32
        0x00, 0x01,             // val[0] > id:2      -- 1
        0x00, 0x00, 0x00, 0x14, // val[0] > Int32BE   -- 20
        0x00,                   // val[0] > type:1    -- stop
        0x0c,                   // val[0] type:1      -- struct
        0x00, 0x02,             // val[0] id:2        -- 2
        0x0b,                   // val[0] > type:1    -- string
        0x00, 0x01,             // val[0] > id:2      -- 1
        0x00, 0x00, 0x00, 0x04, // val[0] > str_len:4 -- 4
        0x73, 0x74, 0x72, 0x32, // val[0] > chars     -- "str2"
        0x00,                   // val[0] > type:1    -- stop
        0x00,                   // val[0] > type:1    -- stop
                                //                    --
        0x00, 0x00, 0x00, 0x04, // key[1] str_len:4   -- 4
        0x6b, 0x65, 0x79, 0x31, // key[1] chars       -- "key1"
        0x0c,                   // val[1] type:1      -- struct
        0x00, 0x01,             // val[1] id:2        -- 1
        0x08,                   // val[1] > type:1    -- i32
        0x00, 0x01,             // val[1] > id:2      -- 1
        0x00, 0x00, 0x00, 0x0a, // val[1] > Int32BE   -- 10
        0x00,                   // val[1] > type:1    -- stop
        0x0c,                   // val[1] type:1      -- struct
        0x00, 0x02,             // val[1] id:2        -- 2
        0x0b,                   // val[1] > type:1    -- string
        0x00, 0x01,             // val[1] > id:2      -- 1
        0x00, 0x00, 0x00, 0x04, // val[1] > str_len:4 -- 4
        0x73, 0x74, 0x72, 0x31, // val[1] > chars     -- "str1"
        0x00,                   // val[1] > type:1    -- stop
        0x00                    // val[1] > type:1    -- stop
    ]],

    // invalid size
    {
        readTest: {
            bytes: [
                0x08,                  // key_type:1 -- i32
                0x08,                  // val_type:1 -- i32
                0x80, 0x00, 0x00, 0x00 // length:4   -- 0
            ],
            error: {
                type: 'thrift-invalid-size',
                name: 'ThriftInvalidSizeError',
                message: 'invalid size -2147483648 of map::size; ' +
                         'expects non-negative number',
                size: -2147483648,
                what: 'map::size'
            }
        }
    },

    // invalid key type
    {
        lengthTest: {
            value: TMap(-1, 8, []),
            error: {
                type: 'thrift-invalid-typeid',
                name: 'ThriftInvalidTypeidError',
                message: 'invalid typeid -1 of map::ktype; ' +
                         'expects one of the values in TYPE'
            }
        },
        writeTest: {
            value: TMap(-1, 8, []),
            error: {
                type: 'thrift-invalid-typeid',
                name: 'ThriftInvalidTypeidError',
                message: 'invalid typeid -1 of map::ktype; ' +
                         'expects one of the values in TYPE'
            }
        },
        readTest: {
            bytes: [
                0xff,                  // key_type:1 -- invalid (-1)
                0x08,                  // val_type:1 -- invalid (-1)
                0x00, 0x00, 0x00, 0x00 // length:4   -- 0
            ],
            error: {
                type: 'thrift-invalid-typeid',
                name: 'ThriftInvalidTypeidError',
                message: 'invalid typeid -1 of map::ktype; ' +
                         'expects one of the values in TYPE'
            }
        }
    },

    // invalid val type
    {
        lengthTest: {
            value: TMap(8, -1, []),
            error: {
                type: 'thrift-invalid-typeid',
                name: 'ThriftInvalidTypeidError',
                message: 'invalid typeid -1 of map::vtype; ' +
                         'expects one of the values in TYPE'
            }
        },
        writeTest: {
            value: TMap(8, -1, []),
            error: {
                type: 'thrift-invalid-typeid',
                name: 'ThriftInvalidTypeidError',
                message: 'invalid typeid -1 of map::vtype; ' +
                         'expects one of the values in TYPE'
            }
        },
        readTest: {
            bytes: [
                0x08,                  // key_type:1 -- invalid (-1)
                0xff,                  // val_type:1 -- invalid (-1)
                0x00, 0x00, 0x00, 0x00 // length:4   -- 0
            ],
            error: {
                type: 'thrift-invalid-typeid',
                name: 'ThriftInvalidTypeidError',
                message: 'invalid typeid -1 of map::vtype; ' +
                         'expects one of the values in TYPE'
            }
        }
    }

]));
