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

module.exports = RepeatRW;

var inherits = require('util').inherits;

var BufferRW = require('./base').BufferRW;
var errors = require('./errors');

function RepeatRW(countrw, repeatedrw) {
    if (!(this instanceof RepeatRW)) {
        return new RepeatRW(countrw, repeatedrw);
    }
    this.countrw = countrw;
    this.repeatedrw = repeatedrw;

    BufferRW.call(this);
}
inherits(RepeatRW, BufferRW);

RepeatRW.prototype.poolByteLength = function poolByteLength(destResult, values) {
    if (!Array.isArray(values)) {
        return destResult.reset(errors.expected(values, 'an array'));
    }
    var res = this.countrw.poolByteLength(destResult, values.length);
    if (res.err) return res;
    var length = res.length;
    for (var i = 0; i < values.length; i++) {
        var partres = this.repeatedrw.poolByteLength(destResult, values[i]);
        if (partres.err) return partres;
        length += res.length;
    }
    return destResult.reset(null, length);
};

RepeatRW.prototype.poolWriteInto = function poolWriteInto(destResult, values, buffer, offset) {
    if (!Array.isArray(values)) {
        return destResult.reset(errors.expected(values, 'an array'), offset);
    }
    var res = this.countrw.poolWriteInto(destResult, values.length, buffer, offset);
    if (res.err) return res;
    offset = res.offset;
    for (var i = 0; i < values.length; i++) {
        res = this.repeatedrw.poolWriteInto(destResult, values[i], buffer, offset);
        if (res.err) return res;
        offset = res.offset;
    }
    return res;
};

RepeatRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    var res = this.countrw.poolReadFrom(destResult, buffer, offset);
    if (res.err) return res;
    offset = res.offset;
    var count = res.value;
    var values = new Array(count);
    for (var i = 0; i < count; i++) {
        res = this.repeatedrw.poolReadFrom(destResult, buffer, offset);
        if (res.err) return res;
        offset = res.offset;

        if (Array.isArray(res.value)) values[i] = res.value.slice(0);
        else if (typeof res.value === 'object') values[i] = shallowCopy(res.value);
        else values[i] = res.value;
    }
    return destResult.reset(null, offset, values);
};

function shallowCopy(obj) {
    var keys = Object.keys(obj);
    var i;
    var dest = {};
    for (i = 0; i < keys.length; i++) {
        dest[keys[i]] = obj[keys[i]];
    }
    return dest;
}
