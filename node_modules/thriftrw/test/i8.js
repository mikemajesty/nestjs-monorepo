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
var invalidArgumentTestCase = require('./helpers').invalidArgumentTestCase;
var path = require('path');
var fs = require('fs');

var thriftrw = require('../index');
var Thrift = thriftrw.Thrift;
var I8RW = thriftrw.I8RW;
var ThriftI8 = thriftrw.ThriftI8;
var TYPE = require('../TYPE');

var Buffer = require('buffer').Buffer;

var validTestCases = [
    [0x00, [0x00]], // min: 0
    [0x7f, [0x7f]],  // max: 127
    {
        writeTest: {
            value: '1',
            bytes: [0x01]
        }
    },
    {
        writeTest: {
            value: '0',
            bytes: [0x00]
        }
    },
    {
        writeTest: {
            value: 0xff,
            bytes: [0xff],
            error: {
                message: 'value 255 out of range, min: -128 max: 127',
                name: 'BufrwRangeErrorError',
                type: 'bufrw.range-error'
            }
        }
    },
];

var invalidArgumentTestCases = [
    null,
    undefined,
    true,
    false,
    's',
    'hello',
    [],
    {},
    (Buffer.alloc || Buffer)(1),
    (Buffer.from || Buffer)([0]),
    (Buffer.from || Buffer)('string')
].map(invalidArgumentTestCase('number'));

var invalidShortBufferTestCases = [{
    writeTest: {
        value: 0,
        error: {
            type: 'bufrw.short-buffer',
            name: 'BufrwShortBufferError',
            message: 'expected at least 1 bytes, only have 0 @0'
        }
    }
}, {
    readTest: {
        bytes: [],
        error: {
            type: 'bufrw.short-read',
            name: 'BufrwShortReadError',
            message: 'short read, 0 byte left over after consuming 0'
        }
    },
    writeTest: {
        bytes: [],
        value: 0,
        error: {
            type: 'bufrw.short-buffer',
            name: 'BufrwShortBufferError',
            message: 'expected at least 1 bytes, only have 0 @0'
        }
    },
}];

var outOfRangeTestCases = [{
    writeTest: {
        value: 0xff,
        bytes: [0xff],
        error: {
            type: 'bufrw.range-error',
            name: 'BufrwRangeErrorError',
            message: 'value 255 out of range, min: -128 max: 127'
        }
    }
}];

var testCases = [].concat(
    validTestCases,
    invalidArgumentTestCases,
    invalidShortBufferTestCases,
    outOfRangeTestCases
);

test('I8RW', testRW.cases(ThriftI8.prototype.rw, testCases));
test('ThriftI8', testThrift(ThriftI8, ThriftI8.prototype.rw, TYPE.I8));

test('Thrift i8 IDL', function t(assert) {
    var source = fs.readFileSync(path.join(__dirname, 'i8.thrift'), 'utf-8');
    var thrift = new Thrift({source: source});
    assert.equal(thrift.typedefs.piecesOf8, Number, 'should surface a number');
    assert.equal(thrift.models.piecesOf8.to.rw, ThriftI8.prototype.rw, 'should refer to I8 rw');
    assert.end();
});
