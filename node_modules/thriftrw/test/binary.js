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
var testThrift = require('./thrift-test');

var thriftrw = require('../index');
var BinaryRW = thriftrw.BinaryRW;
var ThriftBinary = thriftrw.ThriftBinary;
var TYPE = require('../TYPE');

var Buffer = require('buffer').Buffer;

test('BinaryRW', testRW.cases(BinaryRW, [

    [Buffer(''), [
        0x00, 0x00, 0x00, 0x00 // len:0
    ]],

    [Buffer([0x00, 0x88, 0xff]), [
        0x00, 0x00, 0x00, 0x03, // len:3
        0x00, 0x88, 0xff
    ]],

    [Buffer('hello'), [
        0x00, 0x00, 0x00, 0x05,       // len:5
        0x68, 0x65, 0x6c, 0x6c, 0x6f  // chars  -- "hello"
    ]],

    [Buffer('world'), [
        0x00, 0x00, 0x00, 0x05,       // len:5
        0x77, 0x6f, 0x72, 0x6c, 0x64  // chars  -- "world"
    ]],

    {
        writeTest: {
            value: null,
            error: {
                type: 'bufrw.short-buffer',
                name: 'BufrwShortBufferError',
                message: 'expected at least 4 bytes, only have 0 @0'
            }
        }
    },

    {
        readTest: {
            value: Buffer([0x00, 0x01]),
            bytes: [
                0x00, 0x00, 0x00, 0x03, // len:3
                0x00, 0x01
            ],
            error: {
                type: 'bufrw.short-buffer',
                name: 'BufrwShortBufferError',
                message: 'expected at least 3 bytes, only have 2 @[0:4]'
            }
        }
    }

]));

test('ThriftBinary', testThrift(ThriftBinary, BinaryRW, TYPE.STRING));
