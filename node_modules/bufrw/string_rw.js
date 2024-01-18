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

module.exports = StringRW;

var inherits = require('util').inherits;

var ReadResult = require('./base').ReadResult;
var errors = require('./errors');
var BufferRW = require('./base').BufferRW;

function StringRW(sizerw, encoding) {
    if (!(this instanceof StringRW)) {
        return new StringRW(sizerw, encoding);
    }
    this.sizerw = sizerw;
    this.encoding = encoding || 'utf8';
    if (!this.sizerw.width) {
        this.poolWriteInto = this.poolWriteVariableWidthInto;
    } else {
        this.poolWriteInto = this.poolWriteFixedWidthInto;
    }

    BufferRW.call(this);
}
inherits(StringRW, BufferRW);

StringRW.prototype.poolByteLength = function poolByteLength(destResult, str) {
    var length = 0;
    if (typeof str === 'string') {
        length = Buffer.byteLength(str, this.encoding);
    } else if (str !== null && str !== undefined) {
        return destResult.reset(errors.expected(str, 'string, null, or undefined'), null);
    }
    this.sizerw.poolByteLength(destResult, length);
    if (destResult.err) return destResult;
    return destResult.reset(null, destResult.length + length);
};

StringRW.prototype.poolWriteFixedWidthInto = 
function poolWriteFixedWidthInto(destResult, str, buffer, offset) {
    var start = offset + this.sizerw.width;
    var length = 0;
    if (typeof str === 'string') {
        length = buffer.write(str, start, this.encoding);
    } else if (str !== null && str !== undefined) {
        return destResult.reset(errors.expected(str, 'string, null, or undefined'), offset);
    }
    this.sizerw.poolWriteInto(destResult, length, buffer, offset);
    // istanbul ignore if
    if (destResult.err) return destResult;
    return destResult.reset(null, start + length);
};

StringRW.prototype.poolWriteVariableWidthInto = 
function poolWriteVariableWidthInto(destResult, str, buffer, offset) {
    var size = 0;
    if (typeof str === 'string') {
        size = Buffer.byteLength(str, this.encoding);
    } else if (str !== null && str !== undefined) {
        return destResult.reset(errors.expected(str, 'string, null, or undefined'), offset);
    }
    var res = this.sizerw.poolWriteInto(destResult, size, buffer, offset);
    if (res.err) return res;
    offset = res.offset;
    if (typeof str === 'string') {
        res.offset += buffer.write(str, offset, this.encoding);
    }
    return res;
};

StringRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    var res = this.sizerw.poolReadFrom(destResult, buffer, offset);
    if (res.err) return res;
    var length = res.value;
    var remain = buffer.length - res.offset;
    if (remain < length) {
        return ReadResult.poolShortError(destResult, length, remain, offset, res.offset);
    } else {
        offset = res.offset;
        var end = offset + length;
        var str = buffer.toString(this.encoding, offset, end);
        return destResult.reset(null, end, str);
    }
};
