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

module.exports = VariableBufferRW;

var inherits = require('util').inherits;

var ReadResult = require('./base').ReadResult;
var BufferRW = require('./base').BufferRW;
var errors = require('./errors');

function VariableBufferRW(sizerw, lazy) {
    if (!(this instanceof VariableBufferRW)) {
        return new VariableBufferRW(sizerw, lazy);
    }
    this.sizerw = sizerw;
    if (lazy) {
        this.poolReadFrom = this.lazyPoolReadFrom;
    } else {
        this.poolReadFrom = this.eagerPoolReadFrom;
    }
    BufferRW.call(this);
}
inherits(VariableBufferRW, BufferRW);

VariableBufferRW.prototype.poolByteLength = function poolByteLength(destResult, buf) {
    var length = 0;
    if (Buffer.isBuffer(buf)) {
        length = buf.length;
    } else if (buf === null || buf === undefined) {
        length = 0;
    } else {
        return destResult.reset(errors.expected(buf, 'buffer, null, or undefined'), null);
    }
    this.sizerw.poolByteLength(destResult, length);
    if (destResult.err) return destResult;
    return destResult.reset(null, destResult.length + length);
};

VariableBufferRW.prototype.poolWriteInto = function poolWriteInto(destResult, buf, buffer, offset) {
    var start = offset + this.sizerw.width;
    var length = 0;
    if (Buffer.isBuffer(buf)) {
        length = buf.copy(buffer, start);
    } else if (buf === null || buf === undefined) {
        length = 0;
    } else {
        return destResult.reset(errors.expected(buf, 'buffer, null, or undefined'), offset);
    }
    this.sizerw.poolWriteInto(destResult, length, buffer, offset);
    if (destResult.err) return destResult;
    return destResult.reset(null, start + length);
};

VariableBufferRW.prototype.eagerPoolReadFrom = function eagerPoolReadFrom(destResult, buffer, offset) {
    this.sizerw.poolReadFrom(destResult, buffer, offset);
    if (destResult.err) return destResult;
    var length = destResult.value;
    var remain = buffer.length - destResult.offset;
    if (remain < length) {
        return ReadResult.poolShortError(destResult, length, remain, offset, destResult.offset);
    } else {
        offset = destResult.offset;
        var buf = Buffer.alloc(length);
        buffer.copy(buf, 0, offset);
        return destResult.reset(null, offset + length, buf);
    }
};

VariableBufferRW.prototype.lazyPoolReadFrom = function lazyPoolReadFrom(destResult, buffer, offset) {
    this.sizerw.poolReadFrom(destResult, buffer, offset);
    if (destResult.err) return destResult;
    var length = destResult.value;
    var remain = buffer.length - destResult.offset;
    if (remain < length) {
        return ReadResult.poolShortError(destResult, length, remain, offset, destResult.offset);
    } else {
        offset = destResult.offset;
        var end = offset + length;
        var buf = buffer.slice(offset, end);
        return destResult.reset(null, end, buf);
    }
};
