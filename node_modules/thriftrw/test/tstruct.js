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
var TStructRW = thriftrw.TStructRW;
var TField = thriftrw.TField;

test('TStructRW', testRW.cases(TStructRW, [

    [TStruct([TField(8, 1, 123)]), [
        0x08,                   // type:1  -- i32
        0x00, 0x01,             // id:2    -- 1
        0x00, 0x00, 0x00, 0x7b, // Int32BE -- 123
        0x00                    // type:1  -- stop
    ]],

    [TStruct([TField(11, 1, (Buffer.from || Buffer)('hello'))]), [
        0x0b,                   // type:1 -- string
        0x00, 0x01,             // id:2   -- 1
        0x00, 0x00, 0x00, 0x05, // len:4  -- 5
        0x68, 0x65, 0x6c, 0x6c, // chars  -- "hell"
        0x6f,                   // chars  -- "o"
        0x00                    // type:1 -- stop
    ]],

    [TStruct([
        TField(3, 9, 20),
        TField(6, 10, 10)
    ]), [
        0x03,       // type:1  -- byte
        0x00, 0x09, // id:2    -- 9
        0x14,       // byte:1  -- 20
        0x06,       // type:1  -- i16
        0x00, 0x0a, // id:2    -- 6
        0x00, 0x0a, // Int16BE -- 10
        0x00        // type:1  -- stop
    ]],

    [TStruct([
        TField(12, 1, TStruct([TField(8, 1, 10)])),
        TField(12, 2, TStruct([TField(11, 1, (Buffer.from || Buffer)('hello'))]))
    ]), [
        0x0c,                   // type:1  -- struct
        0x00, 0x01,             // id:2    -- 1
        0x08,                   // type:1  -- i32
        0x00, 0x01,             // id:2    -- 1
        0x00, 0x00, 0x00, 0x0a, // Int32BE -- 10
        0x00,                   // type:1  -- stop
        0x0c,                   // type:1  -- struct
        0x00, 0x02,             // id:2    -- 2
        0x0b,                   // type:1  -- string
        0x00, 0x01,             // id:2    -- 1
        0x00, 0x00, 0x00, 0x05, // len:4   -- 5
        0x68, 0x65, 0x6c, 0x6c, // chars   -- "hell"
        0x6f,                   // chars   -- "o"
        0x00,                   // type:1  -- stop
        0x00                    // type:1  -- stop
    ]],

    {
        lengthTest: {
            value: TStruct([TField(-1, 1, null)]),
            error: {
                type: 'thrift-invalid-typeid',
                name: 'ThriftInvalidTypeidError',
                message: 'invalid typeid -1 of field::type; ' +
                         'expects one of the values in TYPE'
            }
        },
        writeTest: {
            value: TStruct([TField(-1, 1, null)]),
            error: {
                type: 'thrift-invalid-typeid',
                name: 'ThriftInvalidTypeidError',
                message: 'invalid typeid -1 of field::type; ' +
                         'expects one of the values in TYPE'
            }
        },
        readTest: {
            bytes: [
                0xff,       // type:1 -- invalid (-1)
                0x00, 0x01, // id:2   -- 1
                0x00        // type:1 -- stop
            ],
            error: {
                type: 'thrift-invalid-typeid',
                name: 'ThriftInvalidTypeidError',
                message: 'invalid typeid -1 of field::type; ' +
                         'expects one of the values in TYPE'
            }
        }
    }

]));
