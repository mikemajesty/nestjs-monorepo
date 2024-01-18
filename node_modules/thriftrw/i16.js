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

var bufrw = require('bufrw');
var ebufrw = require('bufrw/errors');
var util = require('util');
var TYPE = require('./TYPE');
var errors = require('./errors');

function I16RW() {
}

util.inherits(I16RW, bufrw.Base);

I16RW.prototype.name = 'i16';
I16RW.prototype.width = 2;
I16RW.prototype.min = -0x7fff - 1;
I16RW.prototype.max = 0x7fff;

I16RW.prototype.poolReadFrom = function poolReadFrom(result, buffer, offset) {
    var remain = buffer.length - offset;
    if (remain < this.width) {
        return result.reset(ebufrw.ShortRead({
            remaining: remain,
            buffer: buffer,
            offset: offset,
        }), offset);
    }
    var value = buffer.readInt16BE(offset);
    return result.reset(null, offset + this.width, value);
};

I16RW.prototype.poolWriteInto = function poolWriteInto(result, value, buffer, offset) {
    var coerced = +value;
    if ((typeof value !== 'string' && typeof value !== 'number') || !isFinite(coerced)) {
        return result.reset(new ebufrw.InvalidArgument({
            expected: 'a number'
        }));
    }

    var remain = buffer.length - offset;
    // istanbul ignore if
    if (remain < this.width) {
        return bufrw.WriteResult.poolShortError(result, this.width, remain, offset);
    }

    if (value < this.min || value > this.max) {
        return result.reset(new ebufrw.RangeError({
            value: coerced,
            min: this.min,
            max: this.max
        }));
    }

    buffer.writeInt16BE(coerced, offset);
    return result.reset(null, offset + this.width);
};

I16RW.prototype.poolByteLength = function poolByteLength(result, value) {
    return result.reset(null, this.width);
};

function ThriftI16(annotations) {
    this.annotations = annotations;
}

ThriftI16.prototype.rw = new I16RW();
ThriftI16.prototype.name = 'i16';
ThriftI16.prototype.typeid = TYPE.I16;
ThriftI16.prototype.surface = Number;
ThriftI16.prototype.models = 'type';

module.exports.I16RW = I16RW;
module.exports.ThriftI16 = ThriftI16;
