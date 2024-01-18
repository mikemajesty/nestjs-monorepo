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
var I16RW = thriftrw.I16RW;
var ThriftI16 = thriftrw.ThriftI16;
var TYPE = require('../TYPE');

/*eslint-disable space-in-brackets,no-multi-spaces*/
var testCases = [
    [-0x1234, [0xed, 0xcc]],
    [      0, [0x00, 0x00]],
    [ 0x1234, [0x12, 0x34]],

    {
        writeTest: {
            value: '10',
            bytes: [0x00, 0x0a]
        }
    },
    {
        writeTest: {
            value: 0xffff,
            bytes: [0xff, 0xff],
            error: {
                message: 'value 65535 out of range, min: -32768 max: 32767',
                name: 'BufrwRangeErrorError',
                type: 'bufrw.range-error'
            }
        }
    },

    {
        readTest: {
            bytes: [],
            error: {
                // message: 'short read, 4 bytes needed after consuming 0'
                // TODO validate message (currently incorrect)
                name: 'BufrwShortReadError',
                type: 'bufrw.short-read'
            }
        }
    },

    {
        writeTest: {
            value: '+255',
            bytes: [0x00, 0xff]
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
/*eslint-enable space-in-brackets,no-multi-spaces*/

test('I16RW', testRW.cases(new I16RW(), testCases));
test('ThriftI16', testThrift(ThriftI16, ThriftI16.prototype.rw, TYPE.I16));
