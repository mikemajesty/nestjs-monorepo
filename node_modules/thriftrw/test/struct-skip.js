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

var Buffer = require('buffer').Buffer;
var Thrift = require('../thrift').Thrift;
var fs = require('fs');
var path = require('path');
var source = fs.readFileSync(path.join(__dirname, 'struct.thrift'), 'utf-8');
var thrift = new Thrift({source: source});

var Health = thrift.$Health;

test('skip void', function t(assert) {
    var result = Health.rw.readFrom((Buffer.from || Buffer)([
        0x02,                     // type:1   -- 2 -- BOOL
        0x00, 0x02,               // id:2     -- 2 -- WHAT EVEN IS!?
        0x00,                     // bool:1

        0x00                      // typeid:1 -- 0 -- STOP
    ]), 0);
    if (result.err) {
        return assert.end(result.err);
    }
    assert.deepEqual(result.value, new Health());
    assert.end();
});

test('string', function t(assert) {
    var result = Health.rw.readFrom((Buffer.from || Buffer)([
        11,                       // typeid:1 -- 11 -- STRING
        0x00, 0x02,               // id:2     -- 2  -- WHAT EVEN IS!?
        0x00, 0x00, 0x00, 0x02,   // len~4
        0x20, 0x20,               // '  '
        0x00                      // typeid:1 -- 0  -- STOP
    ]), 0);
    if (result.err) {
        return assert.end(result.err);
    }
    assert.deepEqual(result.value, new Health());
    assert.end();
});

test('struct', function t(assert) {
    var result = Health.rw.readFrom((Buffer.from || Buffer)([
        12,                       // typeid:1 -- 12 -- STRUCT
        0x00, 0x02,               // id:2     -- 2  -- ?
        11,                       //   typeid:1 -- 11 -- STRING
        0x00, 0x01,               //   fieldid:2 -- 1 -- ?
        0x00, 0x00, 0x00, 0x02,   //   len~4
        0x20, 0x20,               //   '  '
        0x00,                     //   typeid:1 -- 0  -- STOP
        0x00                      // typeid:1 -- 0  -- STOP
    ]), 0);
    if (result.err) {
        return assert.end(result.err);
    }
    assert.deepEqual(result.value, new Health());
    assert.end();
});

test('map', function t(assert) {
    var result = Health.rw.readFrom((Buffer.from || Buffer)([
        0x0d,                   // typeid:1           -- 13, map
        0x00, 0x02,             // id:2               -- 2 UNKNOWN

        // Thus begins a large map
        0x0b,                   // key_type:1         -- string    @ 4
        0x0c,                   // val_type:1         -- struct
        0x00, 0x00, 0x00, 0x02, // length:4           -- 2
                                //                    --
        0x00, 0x00, 0x00, 0x04, // key[0] str_len:4   -- 4         @ 10
        0x6b, 0x65, 0x79, 0x30, // key[0] chars       -- "key0"    @ 14
        0x0c,                   // val[0] type:1      -- struct    @ 18
        0x00, 0x01,             // val[0] id:2        -- 1         @ 19
        0x08,                   // val[0] > type:1    -- i32       @ 21
        0x00, 0x01,             // val[0] > id:2      -- 1         @ 22
        0x00, 0x00, 0x00, 0x14, // val[0] > Int32BE   -- 20        @ 24
        0x00,                   // val[0] > type:1    -- stop      @ 25
        0x0c,                   // val[0] type:1      -- struct    @ 26
        0x00, 0x02,             // val[0] id:2        -- 2         @ 27
        0x0b,                   // val[0] > type:1    -- string    @ 29
        0x00, 0x01,             // val[0] > id:2      -- 1         @ 30
        0x00, 0x00, 0x00, 0x04, // val[0] > str_len:4 -- 4         @ 32
        0x73, 0x74, 0x72, 0x32, // val[0] > chars     -- "str2"    @ 36
        0x00,                   // val[0] > type:1    -- stop      @ 40
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
        0x00,                   // val[1] > type:1    -- stop
        // Thus ends the map

        0x00                      // typeid:1         -- 0 STOP
    ]), 0);
    if (result.err) {
        return assert.end(result.err);
    }
    assert.deepEqual(result.value, new Health());
    assert.end();
});

test('list', function t(assert) {
    var result = Health.rw.readFrom((Buffer.from || Buffer)([
        0x02,                     // type:1      -- 2 BOOL
        0x00, 0x02,               // id:2        -- 2 UNKNOWN
        0x0f,                     // typeid:1    -- 15, list

        // Thus begins a list
        0x0c,                   // el_type:1     -- struct
        0x00, 0x00, 0x00, 0x03, // length:4      -- 3
        0x08,                   // el[0] type:1  -- i32
        0x00, 0x01,             // el[0] id:2    -- 2
        0x00, 0x00, 0x00, 0x1e, // el[0] Int32BE -- 30
        0x00,                   // el[0] type:1  -- stop
        0x08,                   // el[1] type:1  -- i32
        0x00, 0x01,             // el[1] id:2    -- 2
        0x00, 0x00, 0x00, 0x64, // el[1] Int32BE -- 100
        0x00,                   // el[1] type:1  -- stop
        0x08,                   // el[2] type:1  -- i32
        0x00, 0x01,             // el[2] id:2    -- 2
        0x00, 0x00, 0x00, 0xc8, // el[2] Int32BE -- 200
        0x00,                   // el[2] type:1  -- stop
        // Thus ends the map

        0x00                      // typeid:1    -- 0 STOP
    ]), 0);
    if (result.err) {
        return assert.end(result.err);
    }
    assert.deepEqual(result.value, new Health());
    assert.end();
});
