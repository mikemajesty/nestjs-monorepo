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

var emptyBuffer = Buffer.alloc(0);

function ConcatReadBuffer() {
    if (!(this instanceof ConcatReadBuffer)) {
        return new ConcatReadBuffer();
    }
    this.buffer = emptyBuffer;
}

ConcatReadBuffer.prototype.avail = function avail() {
    return this.buffer.length;
};

ConcatReadBuffer.prototype.free = function free() {
    return 0;
};

ConcatReadBuffer.prototype.clear = function clear() {
    this.buffer = emptyBuffer;
};

ConcatReadBuffer.prototype.push = function push(chunk) {
    if (this.buffer.length) {
        this.buffer = Buffer.concat([this.buffer, chunk], this.buffer.length + chunk.length);
    } else {
        this.buffer = chunk;
    }
};

ConcatReadBuffer.prototype.shift = function shift(n) {
    var chunk;
    if (this.buffer.length < n) {
        chunk = emptyBuffer;
    } else if (this.buffer.length > n) {
        chunk = this.buffer.slice(0, n);
        this.buffer = this.buffer.slice(n);
    } else {
        chunk = this.buffer;
        this.buffer = emptyBuffer;
    }
    return chunk;
};


// istanbul ignore next
ConcatReadBuffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    return this.buffer.readUInt8(offset, noAssert);
};

// istanbul ignore next
ConcatReadBuffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    return this.buffer.readUInt16BE(offset, noAssert);
};

// istanbul ignore next
ConcatReadBuffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    return this.buffer.readUInt32BE(offset, noAssert);
};

// TODO: complete Buffer API aping

module.exports = ConcatReadBuffer;
