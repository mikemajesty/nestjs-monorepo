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

var SkipRW = require('../skip');

var skip1 = SkipRW(1);
test('SkipRW: skip1', testRW.cases(skip1, [
    [null, [0x00]],

    // truncated buffer
    {
        readTest: {
            bytes: [],
            error: {
                name: 'BufrwShortBufferError',
                type: 'bufrw.short-buffer',
                message: 'expected at least 1 bytes, only have 0 @0',
                offset: 0,
                actual: 0,
                expected: 1,
            }
        }
    }
]));

var skip5 = SkipRW(5, 0xaa);
test('SkipRW: skip5', testRW.cases(skip5, [
    [null, [0xaa, 0xaa, 0xaa, 0xaa, 0xaa]],

    // truncated buffer
    {
        readTest: {
            bytes: [1, 2, 3],
            error: {
                name: 'BufrwShortBufferError',
                type: 'bufrw.short-buffer',
                message: 'expected at least 5 bytes, only have 3 @0',
                offset: 0,
                actual: 3,
                expected: 5,
            }
        }
    }
]));
