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

var bufrw = require('../');
var LengthResult = require('../base').LengthResult;
var ReadResult = require('../base').ReadResult;
var WriteResult = require('../base').WriteResult;
var UInt8 = require('../atoms').UInt8;
var UInt16BE = require('../atoms').UInt16BE;
var DoubleBE = require('../atoms').DoubleBE;
var StringRW = require('../string_rw');
var StructRW = require('../struct');
var str1 = StringRW(UInt8);

var anonLoc = StructRW({
    lat: DoubleBE,
    lng: DoubleBE
});

test('StructRW: anonLoc', testRW.cases(anonLoc, [
    [{lat: 37.775497, lng: -122.417519},
     [0x40, 0x42, 0xe3, 0x43, 0x7c, 0x56, 0x92, 0xb4,
      0xc0, 0x5e, 0x9a, 0xb8, 0xa1, 0x9c, 0x9d, 0x5a]]
]));

function Loc(lat, lng) {
    if (!(this instanceof Loc)) {
        return new Loc(lat, lng);
    }
    var self = this;
    self.lat = lat || 0;
    self.lng = lng || 0;
}

var consLoc = StructRW(Loc, {
    lat: DoubleBE,
    lng: DoubleBE
});

test('StructRW: consLoc', testRW.cases(consLoc, [
    [Loc(37.775497, -122.417519),
     [0x40, 0x42, 0xe3, 0x43, 0x7c, 0x56, 0x92, 0xb4,
      0xc0, 0x5e, 0x9a, 0xb8, 0xa1, 0x9c, 0x9d, 0x5a]]
]));


function Frame(mess) {
    if (!(this instanceof Frame)) {
        return new Frame(mess);
    }
    var self = this;
    self.size = 0;
    self.mess = mess || '';
}

var lengthRes = new LengthResult();
Frame.rw = StructRW(Frame, [
    {call: {
        poolByteLength: function(destResult, frame) {
            var res = str1.poolByteLength(destResult, frame.mess);
            if (res.err) return res;
            frame.size = res.length + UInt16BE.width;
            if (frame.size > 10) {
                return destResult.reset(new Error('arbitrary length limit'), null);
            } else {
                return destResult.reset(null, 0);
            }
        },
        poolWriteInto: function(destResult, frame, buffer, offset) {
            var res = str1.poolByteLength(lengthRes, frame.mess);
            if (res.err) return res;
            frame.size = res.length + UInt16BE.width;
            if (buffer.length - offset < frame.size) {
                return destResult.reset(new Error('not enough room'), null);
            } else {
                return destResult.reset(null, 0);
            }
        }
    }},
    {name: 'size', rw: UInt16BE},
    {name: 'mess', rw: str1},
    {call: {
        poolReadFrom: function(destResult, frame, buffer, offset) {
            if (offset < buffer.length) {
                return destResult.reset(new Error('frame data past message'), offset);
            } else {
                return destResult.reset(null, offset);
            }
        }
    }}
]);

test('StructRW: frame', testRW.cases(Frame.rw, [
    [Frame('cat'), [0x00, 0x06, 0x03, 0x63, 0x61, 0x74]],

    // provoke call error paths
    {
        lengthTest: {
            value: Frame('what even is this?'),
            error: {
                message: 'arbitrary length limit'
            }
        },
        writeTest: {
            value: Frame('what even is this?'),
            length: 2,
            error: {
                message: 'not enough room'
            }
        },
        readTest: {
            bytes: [0x00, 0x00, 0x00, 0xff],
            error: {
                message: 'frame data past message'
            }
        }
    }
]));


function Thing(foo, bar) {
    if (!(this instanceof Thing)) return new Thing(foo, bar);
    var self = this;
    self.foo = foo;
    self.bar = bar;
}

Thing.RW = bufrw.Struct(Thing, {
    foo: bufrw.UInt8,
    bar: bufrw.UInt8,
    baz: bufrw.FixedWidth(8)
});

test('StructRW: writing with invalid field', testRW.cases(Thing.RW, [
    {
        lengthTest: {
            value: Thing(8, 9),
            error: {
                name: 'BufrwMissingStructFieldError',
                type: 'bufrw.missing.struct-field',
                message: 'missing field baz on Thing',
                struct: 'Thing',
                field: 'baz'
            }
        },
        writeTest: {
            value: Thing(8, 9),
            length: 10,
            error: {
                name: 'BufrwMissingStructFieldError',
                type: 'bufrw.missing.struct-field',
                message: 'missing field baz on Thing',
                struct: 'Thing',
                field: 'baz'
            }
        }
    }
]));

function NonPoolFrame(mess) {
    this.size = 0;
    this.mess = mess || '';
}

NonPoolFrame.rw = StructRW(NonPoolFrame, [
    {call: {
        byteLength: function(frame) {
            var res = str1.byteLength(frame.mess);
            if (res.err) return res;
            frame.size = res.length + UInt16BE.width;
            if (frame.size > 10) {
                return new LengthResult(new Error('arbitrary length limit'), null);
            } else {
                return new LengthResult(null, 0);
            }
        },
        writeInto: function(frame, buffer, offset) {
            var res = str1.byteLength(frame.mess);
            if (res.err) return res;
            frame.size = res.length + UInt16BE.width;
            if (buffer.length - offset < frame.size) {
                return new WriteResult(new Error('not enough room'), null);
            } else {
                return new WriteResult(null, 0);
            }
        }
    }},
    {name: 'size', rw: UInt16BE},
    {name: 'mess', rw: str1},
    {call: {
        readFrom: function(frame, buffer, offset) {
            if (offset < buffer.length) {
                return ReadResult.error(new Error('frame data past message'), offset);
            } else {
                return ReadResult.just(offset);
            }
        }
    }}
]);

test('StructRW: non pooled frame', testRW.cases(NonPoolFrame.rw, [
    [new NonPoolFrame('cat'), [0x00, 0x06, 0x03, 0x63, 0x61, 0x74]],

    // provoke call error paths
    {
        lengthTest: {
            value: new NonPoolFrame('what even is this?'),
            error: {
                message: 'arbitrary length limit'
            }
        },
        writeTest: {
            value: new NonPoolFrame('what even is this?'),
            length: 2,
            error: {
                message: 'not enough room'
            }
        },
        readTest: {
            bytes: [0x00, 0x00, 0x00, 0xff],
            error: {
                message: 'frame data past message'
            }
        }
    }
]));

test('structrw poolreadfrom correctly allocates new obj', function t(assert) {
    var buf = Buffer.from([0x00, 0x06, 0x03, 0x63, 0x61, 0x74]);
    var destResult = new ReadResult(null, 0, {a: 'b'});
    NonPoolFrame.rw.poolReadFrom(destResult, buf, 0);
    assert.equal(destResult.value.constructor, NonPoolFrame);
    assert.end();
});

test('structrw poolreadfrom correctly reuses obj', function t(assert) {
    var buf = Buffer.from([0x00, 0x06, 0x03, 0x63, 0x61, 0x74]);
    var obj = new NonPoolFrame();
    var destResult = new ReadResult(null, 0, obj);
    NonPoolFrame.rw.poolReadFrom(destResult, buf, 0);
    assert.equal(destResult.value, obj);
    assert.end();
});
