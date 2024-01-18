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

var FixedWidthRW = require('../fixed_width_rw');

var fix8 = FixedWidthRW(8);
var fixed8 = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08];
test('FixedWidthRW: simple fix:8', testRW.cases(fix8, [
    [Buffer.from(fixed8), fixed8],

    // mismatch errors
    {
        lengthTest: {
            value: Buffer.from([0x01]),
            error: {
                type: 'bufrw.fixed-length-mismatch',
                message: 'supplied length 1 mismatches fixed length 8',
                expected: 8,
                got: 1
            }
        },
        writeTest: {
            value: Buffer.from([0x01]),
            error: {
                type: 'bufrw.fixed-length-mismatch',
                message: 'supplied length 1 mismatches fixed length 8',
                expected: 8,
                got: 1
            }
        },
        readTest: {
            bytes: [0x01],
            error: {
                name: 'BufrwShortBufferError',
                type: 'bufrw.short-buffer',
                message: 'expected at least 8 bytes, only have 1 @0',
                offset: 0,
                actual: 1,
                expected: 8
            }
        }
    }

]));
