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
var ThriftMap = require('../map').ThriftMap;
var Thrift = require('../thrift').Thrift;

var source = fs.readFileSync(path.join(__dirname, 'map.thrift'), 'utf-8');
var thrift = new Thrift({source: source});

var strI16Map = thrift.models.Graph.fieldsByName.stringsToI16s.valueType;
var strI16MapEntries = thrift.models.Graph.fieldsByName.stringsToI16Entries.valueType;
var i16I16Map = thrift.models.Graph.fieldsByName.i16sToI16s;

test('ThriftMap: strI16MapRW', testRW.cases(strI16Map.rw, [
    [{}, [
        0x0b,                  // key_type:1 -- 11, string
        0x06,                  // val_type:1 -- 6, i16
        0x00, 0x00, 0x00, 0x00 // length:4   -- 0
    ]],

    [{
        'abc': 1,
        'def': 2,
        'ghi': 3
    }, [
        0x0b,                   // key_type:1 -- 11, string
        0x06,                   // val_type:1 -- 6, i16
        0x00, 0x00, 0x00, 0x03, // length:4   -- 3
                                //            --
        0x00, 0x00, 0x00, 0x03, // str_len:4  -- 3
        0x61, 0x62, 0x63,       // chars      -- "abc"
        0x00, 0x01,             // Int16BE    -- 1
                                //            --
        0x00, 0x00, 0x00, 0x03, // str_len:4  -- 3
        0x64, 0x65, 0x66,       // chars      -- "def"
        0x00, 0x02,             // Int16BE    -- 2
                                //            --
        0x00, 0x00, 0x00, 0x03, // str_len:4  -- 3
        0x67, 0x68, 0x69,       // chars      -- "ghi"
        0x00, 0x03              // Int16BE    -- 3
    ]],

    {
        readTest: {
            bytes: [
                0x09,                  // key_type:1 -- 9
                0x02,                  // val_type:1 -- 2
                0x00, 0x00, 0x00, 0x00 // length:4   -- 0
            ],
            error: {
                type: 'thrift-map-key-typeid-mismatch',
                name: 'ThriftMapKeyTypeidMismatchError',
                message: 'encoded map key typeid 9 doesn\'t match expected ' +
                         'type "string" (id: 11)'
            }
        }
    },

    {
        readTest: {
            bytes: [
                0x0b,                  // key_type:1 -- 11
                0x09,                  // val_type:1 -- 9
                0x00, 0x00, 0x00, 0x00 // length:4   -- 0
            ],
            error: {
                type: 'thrift-map-val-typeid-mismatch',
                name: 'ThriftMapValTypeidMismatchError',
                message: 'encoded map value typeid 9 doesn\'t match expected ' +
                         'type "i16" (id: 6)'
            }
        }
    }

]));

test('ThriftMap: strI16MapRW', testRW.cases(strI16MapEntries.rw, [
    [[], [
        0x0b,                  // key_type:1 -- 11, string
        0x06,                  // val_type:1 -- 6, i16
        0x00, 0x00, 0x00, 0x00 // length:4   -- 0
    ]],

    [[
        ['abc', 1],
        ['def', 2],
        ['ghi', 3]
    ], [
        0x0b,                   // key_type:1 -- 11, string
        0x06,                   // val_type:1 -- 6, i16
        0x00, 0x00, 0x00, 0x03, // length:4   -- 3
                                //            --
        0x00, 0x00, 0x00, 0x03, // str_len:4  -- 3
        0x61, 0x62, 0x63,       // chars      -- "abc"
        0x00, 0x01,             // Int16BE    -- 1
                                //            --
        0x00, 0x00, 0x00, 0x03, // str_len:4  -- 3
        0x64, 0x65, 0x66,       // chars      -- "def"
        0x00, 0x02,             // Int16BE    -- 2
                                //            --
        0x00, 0x00, 0x00, 0x03, // str_len:4  -- 3
        0x67, 0x68, 0x69,       // chars      -- "ghi"
        0x00, 0x03              // Int16BE    -- 3
    ]],

    {
        readTest: {
            bytes: [
                0x09,                  // key_type:1 -- 9
                0x02,                  // val_type:1 -- 2
                0x00, 0x00, 0x00, 0x00 // length:4   -- 0
            ],
            error: {
                type: 'thrift-map-key-typeid-mismatch',
                name: 'ThriftMapKeyTypeidMismatchError',
                message: 'encoded map key typeid 9 doesn\'t match expected ' +
                         'type "string" (id: 11)'
            }
        }
    },

    {
        readTest: {
            bytes: [
                0x0b,                  // key_type:1 -- 11
                0x09,                  // val_type:1 -- 9
                0x00, 0x00, 0x00, 0x00 // length:4   -- 0
            ],
            error: {
                type: 'thrift-map-val-typeid-mismatch',
                name: 'ThriftMapValTypeidMismatchError',
                message: 'encoded map value typeid 9 doesn\'t match expected ' +
                         'type "i16" (id: 6)'
            }
        }
    }

]));

test('map<i8, i8>', testRW.cases(thrift.models.MapI8I8.rw, [
    [{2: 3}, [
        0x03,                   // key_type:1 -- 3, i8
        0x03,                   // val_type:1 -- 3, i8
        0x00, 0x00, 0x00, 0x01, // length:4   -- 1
        0x02,                   // [0] key -- 2
        0x03                    // [1] value -- 3
    ]]
]));

test('map<i16, i16>', testRW.cases(thrift.models.MapI16I16.rw, [
    [{2: 3}, [
        0x06,                   // key_type:1 -- 6, i16
        0x06,                   // val_type:1 -- 6, i16
        0x00, 0x00, 0x00, 0x01, // length:4   -- 1
        0x00, 0x02,             // [0] key -- 2
        0x00, 0x03              // [1] value -- 3
    ]]
]));

test('map<i32, i32>', testRW.cases(thrift.models.MapI32I32.rw, [
    [{2: 3}, [
        0x08,                   // key_type:1 -- 8, i32
        0x08,                   // val_type:1 -- 8, i32
        0x00, 0x00, 0x00, 0x01, // length:4   -- 1
        0x00, 0x00, 0x00, 0x02, // [0] key -- 2
        0x00, 0x00, 0x00, 0x03  // [1] value -- 3
    ]]
]));

test('invalid map type annotation', function t(assert) {
    assert.throws(
        function throws() {
            new Thrift({
                source: 'struct Graph { 1: required map<byte, byte> (js.type = "bogus") edges }'
            });
        },
         /unexpected map js.type annotation "bogus"/,
        'Thrift should not parse with invalid map type'
    );
    assert.end();
});
