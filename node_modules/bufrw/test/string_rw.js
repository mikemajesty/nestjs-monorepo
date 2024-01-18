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

var brokenRW = {
    poolByteLength: function(destResult) {
        return destResult.reset(new Error('boom'));
    },
    poolWriteInto: function(destResult, val, buffer, offset) {
        return destResult.reset(new Error('bang'), offset);
    },
    poolReadFrom: function(destResult, buffer, offset) {
        return destResult.reset(new Error('bork'), offset);
    },
};

brokenRW.prototype = require('../base').BufferRW.prototype;
var atoms = require('../atoms');
var StringRW = require('../string_rw');

var str1 = StringRW(atoms.UInt8, 'utf8');

test('StringRW: simple str~1 in utf8', testRW.cases(str1, [
    {
        lengthTest: {
            value: null,
            length: 1
        },
        writeTest: {
            value: null,
            bytes: [0x00]
        }
    },

    {
        lengthTest: {
            value: undefined,
            length: 1
        },
        writeTest: {
            value: undefined,
            bytes: [0x00]
        }
    },

    ['', [0x00]],
    ['cat', [0x03, 0x63, 0x61, 0x74]],
    ['c“a”t', [0x09, 0x63, 0xe2, 0x80,
               0x9c, 0x61, 0xe2, 0x80,
               0x9d, 0x74]],

    // invalid arg to length/write
    {
        lengthTest: {value: 42, error: {
            type: 'bufrw.invalid-argument',
            name: 'BufrwInvalidArgumentError',
            message: 'invalid argument, expected string, null, or undefined',
            argType: 'number',
            argConstructor: 'Number'
        }},
        writeTest: {value: 42, error: {
            name: 'BufrwInvalidArgumentError',
            type: 'bufrw.invalid-argument',
            message: 'invalid argument, expected string, null, or undefined',
            argType: 'number',
            argConstructor: 'Number'
        }}
    },

    // truncated buffer
    {
        readTest: {
            bytes: [0x03, 0x63, 0x61], // cat~3 with missing "t" byte
            error: {
                name: 'BufrwShortBufferError',
                type: 'bufrw.short-buffer',
                message: 'expected at least 3 bytes, only have 2 @[0:1]',
                offset: 0,
                endOffset: 1,
                actual: 2,
                expected: 3,
            }
        }
    }
]));

test('StringRW: passes sizerw error thru', testRW.cases(StringRW(brokenRW, 'utf8'), [
    {
        lengthTest: {
            value: 'cat',
            error: {message: 'boom'}
        },
        writeTest: {
            value: 'cat',
            length: 1,
            error: {message: 'bang'}
        },
        readTest: {
            bytes: [0x03, 0x63, 0x61, 0x74],
            error: {message: 'bork'}
        }
    }
]));
