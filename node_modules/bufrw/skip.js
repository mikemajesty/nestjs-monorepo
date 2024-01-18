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

module.exports = SkipRW;

var inherits = require('util').inherits;

var ReadResult = require('./base').ReadResult;
var FixedWidthRW = require('./fixed_width_rw');

function SkipRW(length, fill) {
    if (!(this instanceof SkipRW)) {
        return new SkipRW(length, fill);
    }
    this.fill = fill || 0;
    FixedWidthRW.call(this, length);
}
inherits(SkipRW, FixedWidthRW);

SkipRW.prototype.poolByteLength = function poolByteLength(destResult) {
    return destResult.reset(null, this.length);
};

SkipRW.prototype.poolWriteInto = function poolWriteInto(destResult, val, buffer, offset) {
    var end = offset + this.length;
    buffer.fill(this.fill, offset, end);
    return destResult.reset(null, end);
};

SkipRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    var end = offset + this.length;
    if (end > buffer.length) {
        return ReadResult.poolShortError(destResult, this.length, buffer.length - offset, offset);
    } else {
        return destResult.reset(null, end, null);
    }
};
