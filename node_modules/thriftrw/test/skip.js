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
var formatError = require('bufrw/interface').formatError;
var skip = require('../skip').skipField;
var ReadResult = require('bufrw/base').ReadResult;

test('skips a bool', createCase([
    0x02, // typeid:1 -- 2, BOOL
    0x01  // bool:1 -- 1, true
]));

test('skips a byte', createCase([
    0x03, // typeid:1 -- 3, BYTE
    0x20  // byte:1 -- 32, ' '
]));

test('skips a double', createCase([
    0x04, // typeid:1 -- 4, DOUBLE
    0x00, 0x00, 0x00, 0x00, // maybe this represents a number
    0x00, 0x00, 0x00, 0x00
]));

test('skips an i16', createCase([
    0x06, // typeid:1 -- 6, I16
    0x00, 0x00
]));

test('skips a i32', createCase([
    0x08, // typeid:1 -- 8, I32
    0x00, 0x00, 0x00, 0x00
]));

test('skips a i64', createCase([
    0x0a, // typeid:1 -- 10, I64
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00
]));

test('skip a null string', createCase([
    0x0b,                   // typeid:1 -- 11, STRING
    0x00, 0x00, 0x00, 0x00  // str_len:4 -- 0
]));

test('skip a string', createCase([
    0x0b,                   // typeid:1 -- 11, STRING
    0x00, 0x00, 0x00, 0x08, // str_len:4 -- 8
    0x00, 0x00, 0x00, 0x00, // 8 null chars
    0x00, 0x00, 0x00, 0x00
]));

test('skip a null struct', createCase([
    0x0c,                   // typeid:1 -- 12, STRUCT
    0x00                    // > typeid:0 -- 0, STOP
]));

test('skip a struct with all the atoms', createCase([
    0x0c,                   // typeid:1 -- 12, STRUCT

    0x02,                   // typeid:1 -- 2, BOOL
    0x00, 0x00,             // fid:2 -- 0
    0x00,                   // bool:1 -- 0, false

    0x03,                   // typeid:1 -- 3, BYTE
    0x00, 0x01,             // fid:2 -- 1
    0x61,                   // byte:1 -- 61, 'a'

    0x04,                   // typeid:1 -- 4, DOUBLE
    0x00, 0x02,             // fid:2 -- 2
    0x00, 0x00, 0x00, 0x00, // double:8
    0x00, 0x00, 0x00, 0x00,

    0x06,                   // typeid:1 -- 6, I16
    0x00, 0x03,             // fid:2 -- 3
    0x00, 0x00,             // i16:2

    0x08,                   // typeid:1 -- 8, I32
    0x00, 0x04,             // fid:2 -- 4
    0x00, 0x00, 0x00, 0x00, // i32:4

    0x0a,                   // typeid:1 -- 10, I64
    0x00, 0x05,             // fid:2 -- 5
    0x00, 0x00, 0x00, 0x00, // i64:8
    0x00, 0x00, 0x00, 0x00,

    0x0b,                   // typeid:1 -- 11, STRING
    0x00, 0x06,             // fid:2 -- 6
    0x00, 0x00, 0x00, 0x04, // str_len:4 -- 8
    0x00, 0x00, 0x00, 0x00, // 4 null chars

    0x00                    // > typeid:0 -- 0, STOP
]));

test('skip structs of structs', createCase([
    0x0c,       // typeid:1    -- 12, STRUCT
    0x0c,       // > typeid:1  -- 12, STRUCT
    0x00, 0x01, // > fid:2     -- 1
    0x0c,       // >> typeid:1 -- 12, STRUCT
    0x00, 0x01, // >> fid:2    -- 1
    0x00,       // >> typeid:0 -- 0, STOP
    0x00,       // > typeid:0  -- 0, STOP
    0x00        // typeid:0    -- 0, STOP
]));

test('skip list of strings', createCase([
    0x0f,                   // typeid:1  -- 15, LIST
    0x0b,                   // vtypeid:1 -- 11, STRING
    0x00, 0x00, 0x00, 0x02, // length:4  -- 2

    0x00, 0x00, 0x00, 0x04, // str_len:4 -- 4
    0x61, 0x62, 0x63, 0x64, // 'abcd'

    0x00, 0x00, 0x00, 0x03, // str_len:4 -- 3
    0x41, 0x42, 0x43        // 'ABC'
]));

test('skip set of strings', createCase([
    0x0e,                   // typeid:1  -- 14, SET
    0x0b,                   // vtypeid:1 -- 11, STRING
    0x00, 0x00, 0x00, 0x02, // length:4  -- 2

    0x00, 0x00, 0x00, 0x04, // str_len:4 -- 4
    0x61, 0x62, 0x63, 0x64, // 'abcd'

    0x00, 0x00, 0x00, 0x03, // str_len:4 -- 3
    0x41, 0x42, 0x43        // 'ABC'
]));

test('skip map of strings to i32s', createCase([
    0x0d,                   // typeid:1  -- 13, MAP
    0x0b,                   // ktypeid:1 -- 11, STRING
    0x08,                   // vtypeid:1 -- 8, I32
    0x00, 0x00, 0x00, 0x02, // length:4  -- 2

    0x00, 0x00, 0x00, 0x04, // key[0] str_len:4 -- 4
    0x61, 0x62, 0x63, 0x64, // key[0] 'abcd'
    0x00, 0x00, 0x00, 0x01, // val[0] num~4 -- 1

    0x00, 0x00, 0x00, 0x03, // key[1] str_len:4 -- 3
    0x41, 0x42, 0x43,       // key[1] 'ABC'
    0x00, 0x00, 0x00, 0x02  // val[1] num~4 -- 2
]));

function createCase(bytes) {
    return function t(assert) {
        var res = new ReadResult();
        var result = skip(res, (Buffer.from || Buffer)(bytes), 0);
        if (result.err) {
            assert.comment(formatError(result.err), {color: true});
            return assert.end(result.err);
        }
        assert.equal(result.offset, bytes.length, 'stops at end of buffer');
        assert.end();
    };
}

test('skip short buffer', function t(assert) {
    var bytes = [];
    var res = new ReadResult();
    var result = skip(res, (Buffer.from || Buffer)(bytes), 0);
    assert.ok(result.err !== null);
    assert.end();
});
