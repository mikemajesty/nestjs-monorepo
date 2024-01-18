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

var BufferRW = require('../base').BufferRW;
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

brokenRW.prototype = BufferRW.prototype;

var atoms = require('../atoms');
var SeriesRW = require('../series');

function orFillZero(rw) {
    return new BufferRW(
        rw.poolByteLength.bind(rw),
        rw.poolReadFrom.bind(rw),
        writeInto,
        true);
    function writeInto(destResult, value, buffer, offset) {
        if (value === null || value === undefined) {
            var end = offset + rw.width;
            buffer.fill(0, offset, end);
            return destResult.reset(null, end);
        } else {
            return rw.poolWriteInto(destResult, value, buffer, offset);
        }
    }
}

var tinyShortWord = SeriesRW(
    orFillZero(atoms.UInt8),
    orFillZero(atoms.UInt16BE),
    orFillZero(atoms.UInt32BE));

var duduple = SeriesRW(
    SeriesRW(atoms.UInt8, atoms.UInt8),
    SeriesRW(atoms.UInt8, atoms.UInt8));

test('SeriesRW: tinyShortWord', testRW.cases(tinyShortWord, [
    [[0, 0, 0], [0x00,
                 0x00, 0x00,
                 0x00, 0x00, 0x00, 0x00]],

    // null values is ok
    {
        lengthTest: {
            value: null,
            length: 7,
        },
        writeTest: {
            value: null,
            bytes: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
        }
    },

    // invalid arg to length/write
    {
        lengthTest: {value: 42, error: {
            type: 'bufrw.invalid-argument',
            name: 'BufrwInvalidArgumentError',
            message: 'invalid argument, expected an array or null',
            argType: 'number',
            argConstructor: 'Number'
        }},
        writeTest: {value: 42, error: {
            name: 'BufrwInvalidArgumentError',
            type: 'bufrw.invalid-argument',
            message: 'invalid argument, expected an array or null',
            argType: 'number',
            argConstructor: 'Number'
        }}
    }
]));

test('SeriesRW: passes error thru', testRW.cases(SeriesRW(brokenRW), [
    {
        lengthTest: {
            value: [1],
            error: {message: 'boom'}
        },
        writeTest: {
            value: [1],
            length: 1,
            error: {message: 'bang'}
        },
        readTest: {
            bytes: [1],
            error: {message: 'bork'}
        }
    }
]));

test('SeriesRW: duple of duples', testRW.cases(duduple, [
    [[[0, 1], [2, 3]], [
        0x00, 0x01, 0x02, 0x03
    ]]
]));
