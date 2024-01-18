// Copyright (c) 2015 Uber Technologies, Inc.
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

var testRW = require('../test_rw');
var test = require('tape');

var StringRW = require('../string_rw');
var varint = require('../varint');

var strn = StringRW(varint.unsigned);

test('Unsigned VarInt', testRW.cases(varint.unsigned, [
    [0, [0x00]],
    [42, [0x2a]],
    [420, [
        0x80 | 0x03,
        0x24
    ]],
    [123456, [
        0x80 | 0x07,
        0x80 | 0x44,
        0x40
    ]],

    // invalid arg to length/write
    {
        lengthTest: {value: -1, error: {
            type: 'bufrw.invalid-argument',
            name: 'BufrwInvalidArgumentError',
            message: 'invalid argument, expected unsigned integer'
        }},
        writeTest: {value: -1, error: {
            name: 'BufrwInvalidArgumentError',
            type: 'bufrw.invalid-argument',
            message: 'invalid argument, expected unsigned integer',
        }}
    },

    // XXX truncated buffer
    {
        writeTest: {
            value: 420,
            length: 1,
            bytes: [0x80], // continue w/ zero'd 7 bits
            error: {
                name: 'BufrwShortBufferError',
                type: 'bufrw.short-buffer',
                message: 'expected at least 2 bytes, only have 1 @0',
                offset: 0,
                actual: 1,
                expected: 2,
            }
        },
        readTest: {
            bytes: [0x80], // continue w/ zero'd 7 bits
            error: {
                name: 'BufrwShortBufferError',
                type: 'bufrw.short-buffer',
                message: 'expected at least 2 bytes, only have 1 @[0:1]',
                offset: 0,
                endOffset: 1,
                actual: 1,
                expected: 2,
            }
        }
    }
]));

var bigTestStr =
    '1234567890 1234567890 1234567890 1234567890\n' +
    '1234567890 1234567890 1234567890 1234567890\n' +
    '1234567890 1234567890 1234567890 1234567890\n' +
    '1234567890 1234567890 1234567890 1234567890\n';

var bigTestBytes = [0x80 | 0x01, 0x30]; // 4 * 44 = 0xb0
var testSeq = [0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30];
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        if (j > 0) bigTestBytes.push(0x20);             // ' '
        bigTestBytes.push.apply(bigTestBytes, testSeq); // '1234567890'
    }                                                   //
    bigTestBytes.push(0x0a);                            // '\n'
}

test('strn', testRW.cases(strn, [
    ['', [0x00]],
    ['/', [0x01, 0x2f]],
    ['abc', [0x03, 0x61, 0x62, 0x63]],
    [bigTestStr, bigTestBytes],

    // undefined value length/write
    {
        lengthTest: {
            length: 1,
            value: undefined
        },
        writeTest: {
            bytes: [0x00],
            value: undefined
        }
    },

    // null value length/write
    {
        lengthTest: {
            length: 1,
            value: null
        },
        writeTest: {
            bytes: [0x00],
            value: null
        }
    },

    // invalid value length/write
    {
        lengthTest: {
            value: {},
            error: {
                type: 'bufrw.invalid-argument',
                name: 'BufrwInvalidArgumentError',
                message: 'invalid argument, expected string, null, or undefined'
            }
        },
        writeTest: {
            value: {},
            error: {
                type: 'bufrw.invalid-argument',
                name: 'BufrwInvalidArgumentError',
                message: 'invalid argument, expected string, null, or undefined'
            }
        }
    }

]));
