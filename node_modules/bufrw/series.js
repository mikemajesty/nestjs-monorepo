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

module.exports = SeriesRW;

var inherits = require('util').inherits;

var ReadResult = require('./base').ReadResult;
var BufferRW = require('./base').BufferRW;
var errors = require('./errors');

function SeriesRW(rws) {
    if (!Array.isArray(rws) || arguments.length > 1) {
        rws = Array.prototype.slice.call(arguments);
    }
    if (!(this instanceof SeriesRW)) {
        return new SeriesRW(rws);
    }
    this.rws = rws;
    BufferRW.call(this);
}
inherits(SeriesRW, BufferRW);

SeriesRW.prototype.poolByteLength = function poolByteLength(destResult, values) {
    if (!Array.isArray(values) && values !== null) {
        return destResult.reset(errors.expected(values, 'an array or null'));
    }
    var length = 0;
    for (var i = 0; i < this.rws.length; i++) {
        this.rws[i].poolByteLength(destResult, values && values[i]);
        if (destResult.err) return destResult;
        length += destResult.length;
    }
    return destResult.reset(null, length);
};

SeriesRW.prototype.poolWriteInto = function poolWriteInto(destResult, values, buffer, offset) {
    if (!Array.isArray(values) && values !== null) {
        return destResult.reset(errors.expected(values, 'an array or null'), offset);
    }
    for (var i = 0; i < this.rws.length; i++) {
        this.rws[i].poolWriteInto(destResult, values && values[i], buffer, offset);
        if (destResult.err) return destResult;
        offset = destResult.offset;
    }
    return destResult;
};

var readResult = new ReadResult();
SeriesRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    // The prior value cannot be reused, even if it is already an array of the right size.
    // The array may have been captured by reference by the prior consumer.
    var values = new Array(this.rws.length);
    for (var i = 0; i < this.rws.length; i++) {
        this.rws[i].poolReadFrom(readResult, buffer, offset);
        if (readResult.err) return destResult.copyFrom(readResult);
        offset = readResult.offset;
        values[i] = readResult.value;
    }
    // The values must be assigned to the result last so reading a series is reentrant.
    destResult.value = values;
    return destResult.reset(null, offset, destResult.value);
};
