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
var thriftTest = require('./thrift-test');

var thriftrw = require('../index');
var I32RW = thriftrw.I32RW;
var ThriftI32 = thriftrw.ThriftI32;
var TYPE = require('../TYPE');

/*eslint-disable space-in-brackets*/
var testCases = [
    [-0x12345678, [0xed, 0xcb, 0xa9, 0x88]],
    [ 0x00000000, [0x00, 0x00, 0x00, 0x00]],
    [ 0x12345678, [0x12, 0x34, 0x56, 0x78]],

    {
        writeTest: {
            value: '10',
            bytes: [0x00, 0x00, 0x00, 0x0a]
        }
    },
    {
        writeTest: {
            value: '+255',
            bytes: [0x00, 0x00, 0x00, 0xff]
        }
    },

    {
        readTest: {
            bytes: [],
            error: {
                message: 'short read, 0 byte left over after consuming 0',
                name: 'BufrwShortReadError',
                type: 'bufrw.short-read'
            }
        }
    },

    {
        readTest: {
            bytes: [0, 0, 0],
            error: {
                message: 'short read, 3 byte left over after consuming 0',
                name: 'BufrwShortReadError',
                type: 'bufrw.short-read'
            }
        }
    },


    {
        writeTest: {
            value: 0xffffffff,
            bytes: [0xff, 0xff, 0xff, 0xff],
            error: {
                message: 'value 4294967295 out of range, min: -2147483648 max: 2147483647',
                name: 'BufrwRangeErrorError',
                type: 'bufrw.range-error'
            }
        }
    },
    {
        writeTest: {
            value: 'hello',
            error: {
                type: 'bufrw.invalid-argument',
                name: 'BufrwInvalidArgumentError',
                message: 'invalid argument, expected a number'
            }
        }
    }
];
/*eslint-enable space-in-brackets*/

test('I32RW', testRW.cases(new I32RW(), testCases));
test('ThriftI32', thriftTest(ThriftI32, ThriftI32.prototype.rw, TYPE.I32));
