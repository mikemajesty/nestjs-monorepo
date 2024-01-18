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

/* eslint no-self-compare: [0] */
'use strict';

var Buffer = require('buffer').Buffer;
var util = require('util');
var bufrw = require('bufrw');
var Long = require('long');
var TYPE = require('./TYPE');
var errors = require('bufrw/errors');

// istanbul ignore next
function I64RW() {
    bufrw.Base.call(this);
}

util.inherits(I64RW, bufrw.Base);

I64RW.prototype.width = 8;

I64RW.prototype.lengthResult = bufrw.LengthResult.just(8);

I64RW.prototype.poolByteLength = function poolByteLength(destResult, value) {
    return destResult.reset(null, 8);
};

I64RW.prototype.poolWriteInto = function poolWriteInto(destResult, value, buffer, offset) {
    if (value instanceof Buffer) {
        return this.writeBufferInt64Into(destResult, value, buffer, offset);
    } else if (typeof value === 'number') {
        var number = Long.fromNumber(value);
        buffer.writeInt32BE(number.high, offset);
        buffer.writeInt32BE(number.low, offset + 4);
        return destResult.reset(null, offset + 8);
    } else if (Array.isArray(value)) {
        return this.writeArrayInt64Into(destResult, value, buffer, offset);
    } else if (typeof value === 'string') {
        return this.writeStringInt64Into(destResult, value, buffer, offset);
    } else if (value && typeof value === 'object') {
        return this.writeObjectInt64Into(destResult, value, buffer, offset);
    } else {
        return destResult.reset(errors.expected(value, 'i64 representation'));
    }
};

I64RW.prototype.writeBufferInt64Into = function writeBufferInt64Into(destResult, value, buffer, offset) {
    value.copy(buffer, offset, 0, 8);
    return destResult.reset(null, offset + 8);
};

I64RW.prototype.writeObjectInt64Into =
function writeObjectInt64Into(destResult, value, buffer, offset) {
    if (typeof value.high !== 'number' && typeof value.hi !== 'number') {
        return destResult.reset(errors.expected(value,
            '{hi[gh], lo[w]} with high bits, or other i64 representation'), null);
    }
    if (typeof value.low !== 'number' && typeof value.lo !== 'number') {
        return destResult.reset(errors.expected(value,
            '{hi[gh], lo[w]} with low bits, or other i64 representation'), null);
    }
    var remain = buffer.length - offset;
    if (remain < this.width) {
        return bufrw.WriteResult.poolShortError(destResult, this.width, remain, offset);
    }

    buffer.writeInt32BE(value.high || value.hi || 0, offset);
    buffer.writeInt32BE(value.low || value.lo || 0, offset + 4);
    return destResult.reset(null, offset + 8);
};

I64RW.prototype.writeArrayInt64Into =
function writeArrayInt64Into(destResult, value, buffer, offset) {
    if (value.length !== 8) {
        return destResult.reset(errors.expected(value,
            'an array of 8 bytes, or other i64 representation'), null);
    }
    // Does not validate individual byte values, particularly allowing unsigned
    // or signed byte values without discrimination.
    for (var index = 0; index < 8; index++) {
        buffer[offset + index] = value[index] & 0xFF;
    }
    return destResult.reset(null, offset + 8);
};

I64RW.prototype.writeStringInt64Into =
function writeStringInt64Into(destResult, value, buffer, offset) {
    if (value.length !== 16) {
        return destResult.reset(errors.expected(value,
            'a string of 16 hex characters, or other i64 representation'), null);
    }

    var hi = parseInt(value.slice(0, 8), 16);
    if (hi !== hi) { // NaN
        return destResult.reset(errors.expected(value,
            'a string of hex characters, or other i64 representation'), null);
    }
    var lo = parseInt(value.slice(8, 16), 16);
    if (lo !== lo) { // NaN
        return destResult.reset(errors.expected(value,
            'a string of hex characters, or other i64 representation'), null);
    }

    buffer.writeInt32BE(hi, offset);
    buffer.writeInt32BE(lo, offset + 4);
    return destResult.reset(null, offset + 8);
};

function I64LongRW() {}

util.inherits(I64LongRW, I64RW);

I64LongRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    var value = Long.fromBits(
        buffer.readInt32BE(offset + 4, 4),
        buffer.readInt32BE(offset, 4)
    );
    return destResult.reset(null, offset + 8, value);
};

var i64LongRW = new I64LongRW();

function I64DateRW() {}

util.inherits(I64DateRW, I64RW);

I64DateRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    var remain = buffer.length - offset;
    if (remain < this.width) {
        return destResult.reset(errors.ShortRead({
            remaining: remain,
            offset: offset,
            buffer: buffer,
        }), offset);
    }

    var long = Long.fromBits(
        buffer.readInt32BE(offset + 4, 4),
        buffer.readInt32BE(offset + 0, 4)
    );
    var ms = long.toNumber();
    var value = new Date(ms);
    return destResult.reset(null, offset + 8, value);
};

I64DateRW.prototype.poolWriteInto = function poolWriteInto(destResult, value, buffer, offset) {
    if (value instanceof Buffer) {
        return this.writeBufferInt64Into(destResult, value, buffer, offset);
    }
    if (Array.isArray(value)) {
        return this.writeArrayInt64Into(destResult, value, buffer, offset);
    }
    if (typeof value === 'string') {
        value = Date.parse(value);
    }
    value = Long.fromNumber(+value);
    return this.writeObjectInt64Into(destResult, value, buffer, offset);
};

var i64DateRW = new I64DateRW();

function I64BufferRW() {}

util.inherits(I64BufferRW, I64RW);

I64BufferRW.prototype.poolReadFrom = function poolReadTInt64From(destResult, buffer, offset) {
    // The following branches right only on legacy versions of Node.js
    // istanbul ignore next
    var value = (Buffer.alloc || Buffer)(8);
    buffer.copy(value, 0, offset, offset + 8);
    return destResult.reset(null, offset + 8, value);
};

var i64BufferRW = new I64BufferRW();

function ThriftI64(annotations) {
    if (annotations && annotations['js.type'] === 'Long') {
        this.rw = i64LongRW;
        this.surface = Long;
    } else if (annotations && annotations['js.type'] === 'Date') {
        this.rw = i64DateRW;
        this.surface = Date;
    } else {
        this.rw = i64BufferRW;
        this.surface = Buffer;
    }
    this.annotations = annotations;
}

ThriftI64.prototype.name = 'i64';
ThriftI64.prototype.typeid = TYPE.I64;
ThriftI64.prototype.models = 'type';

module.exports.I64RW = I64RW;
module.exports.I64BufferRW = I64BufferRW;
module.exports.I64LongRW = I64LongRW;
module.exports.I64DateRW = I64DateRW;
module.exports.ThriftI64 = ThriftI64;
