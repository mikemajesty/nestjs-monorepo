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

var atoms = require('../atoms');
var RepeatRW = require('../repeat');
var SeriesRW = require('../series');
var ReadResult = require('../base').ReadResult;
var StructRW = require('../struct');

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

// n:1 (x<Int8>){n}
var tinyIntList = RepeatRW(atoms.UInt8, atoms.Int8);
test('RepeatRW: tinyIntList', testRW.cases(tinyIntList, [
    [[], [0x00]],
    [[-1, 0, 1], [0x03,
                  0xff,
                  0x00,
                  0x01]]
]));

// n:2 (x<Int16BE>){n}
var shortIntList = RepeatRW(atoms.UInt16BE, atoms.Int16BE);
test('RepeatRW: shortIntList', testRW.cases(shortIntList, [
    [[], [0x00, 0x00]],
    [[-1, 0, 1], [0x00, 0x03,
                  0xff, 0xff,
                  0x00, 0x00,
                  0x00, 0x01]],

    // invalid arguments through length/write
    {
        lengthTest: {
            value: 42,
            error: {
                type: 'bufrw.invalid-argument',
                message: 'invalid argument, expected an array',
                argType: 'number',
                argConstructor: 'Number'
            }
        },
        writeTest: {
            value: 42,
            error: {
                type: 'bufrw.invalid-argument',
                message: 'invalid argument, expected an array',
                argType: 'number',
                argConstructor: 'Number'
            }
        }
    }

]));

test('RepeatRW: passes countrw error thru', testRW.cases(RepeatRW(brokenRW, atoms.Int8), [
    {
        lengthTest: {
            value: [],
            error: {message: 'boom'}
        },
        writeTest: {
            value: [],
            length: 1,
            error: {message: 'bang'}
        },
        readTest: {
            bytes: [0],
            error: {message: 'bork'}
        }
    }
]));

test('RepeatRW: passes partrw error thru', testRW.cases(RepeatRW(atoms.UInt8, brokenRW), [
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
            bytes: [1, 1],
            error: {message: 'bork'}
        }
    }
]));

test('RepeatRW: properly handles repeated array rws', function t(assert) {
    var thing = RepeatRW(atoms.UInt8, SeriesRW(atoms.UInt8, atoms.UInt8));
    var buf = Buffer.from([0x01, 0x02, 0x03]);

    var readResult = new ReadResult();
    thing.poolReadFrom(readResult, buf, 0);

    assert.deepEquals(readResult.value, [[2, 3]]);

    assert.end();
});

function Loc(lat, lng) {
    if (!(this instanceof Loc)) {
        return new Loc(lat, lng);
    }
    var self = this;
    self.lat = lat || 0;
    self.lng = lng || 0;
}

var consLoc = StructRW(Loc, {
    lat: atoms.DoubleBE,
    lng: atoms.DoubleBE
});

test('RepeatRW: properly handles repeated object rws', function t(assert) {
    var thing = RepeatRW(atoms.UInt8, consLoc);
    var buf = Buffer.from([0x01, 0x40, 0x42, 0xe3, 0x43, 0x7c, 0x56, 0x92, 0xb4,
      0xc0, 0x5e, 0x9a, 0xb8, 0xa1, 0x9c, 0x9d, 0x5a]);

    var readResult = new ReadResult();
    thing.poolReadFrom(readResult, buf, 0);

    assert.deepEquals(readResult.value, [{lat: 37.775497, lng: -122.417519}]);

    assert.end();
});
