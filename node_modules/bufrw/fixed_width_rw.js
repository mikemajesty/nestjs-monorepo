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

module.exports = FixedWidthRW;

var inherits = require('util').inherits;

var ReadResult = require('./base').ReadResult;
var BufferRW = require('./base').BufferRW;
var errors = require('./errors');

function FixedWidthRW(length, readFrom, writeInto) {
    if (!(this instanceof FixedWidthRW)) {
        return new FixedWidthRW(length, readFrom, writeInto);
    }
    this.length = length;

   // BufferRW.call(this);
}
inherits(FixedWidthRW, BufferRW);

FixedWidthRW.prototype.poolByteLength = function poolByteLength(destResult, slice) {
    if (slice.length !== this.length) {
        return destResult.reset(errors.FixedLengthMismatch({
            expected: this.length,
            got: slice.length
        }), null);
    } else {
        return destResult.reset(null, this.length);
    }
};

FixedWidthRW.prototype.poolWriteInto = function poolWriteInto(destResult, slice, buffer, offset) {
    if (slice.length !== this.length) {
        return destResult.reset(errors.FixedLengthMismatch({
            expected: this.length,
            got: slice.length
        }), offset);
    }
    slice.copy(buffer, offset);
    //return new WriteResult(null, offset + this.length);
    return destResult.reset(null, offset + this.length);
};

FixedWidthRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    var end = offset + this.length;
    if (end > buffer.length) {
        return ReadResult.poolShortError(destResult, this.length, buffer.length - offset, offset);
    } else {
        //var res = new ReadResult(null, end, buffer.slice(offset, end));
        return destResult.reset(null, end, buffer.slice(offset, end));
    }
};
