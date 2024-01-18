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

var ConcatReadBuffer = require('./concat_read_buffer');
var errors = require('../errors');
var iface = require('../interface');
var ReadResult = require('../base').ReadResult;

module.exports = ReadMachine;

var States = {
    PendingLength: 0,
    Seeking: 1
};

function ReadMachine(sizeRW, chunkRW, emit) {
    if (!(this instanceof ReadMachine)) {
        return new ReadMachine(sizeRW, chunkRW, emit);
    }
    // istanbul ignore if
    if (typeof sizeRW.width !== 'number') {
        throw errors.expected(sizeRW, 'atomic RW');
    }
    this.sizeRW = sizeRW;
    this.chunkRW = chunkRW;
    this.buffer = new ConcatReadBuffer();
    this.expecting = this.sizeRW.width;
    this.state = States.PendingLength;
    // istanbul ignore else
    if (typeof emit === 'function') this.emit = emit;
}

// istanbul ignore next
ReadMachine.prototype.emit = function emit() {
};

ReadMachine.prototype.handleChunk = function handleChunk(buf) {
    this.buffer.push(buf);
    var err = null;
    while (this.buffer.avail() >= this.expecting) {
        switch (this.state) {
            case States.PendingLength:
                err = this.pend();
                break;

            case States.Seeking:
                err = this.seek();
                break;

            // istanbul ignore next
            default:
                err = errors.BrokenReaderState({
                    state: this.state,
                    expecting: this.expecting,
                    avail: this.buffer.avail()
                });
        }
        if (err) break;
    }
    return err;
};

var pendReadRes = new ReadResult();
ReadMachine.prototype.pend = function pend() {
    var sizeRes = this.sizeRW.poolReadFrom(pendReadRes, this.buffer, 0);
    var err = sizeRes.err;
    if (!err && !sizeRes.value) {
        err = errors.ZeroLengthChunk();
    }
    if (err) {
        this.buffer.shift(this.sizeRW.width);
        this.expecting = this.sizeRW.width;
        this.state = States.PendingLength;
        return err;
    } else {
        this.expecting = sizeRes.value;
        this.state = States.Seeking;
        return null;
    }
};

var seekReadRes = new ReadResult();
var seekReadRes2 = new ReadResult();
ReadMachine.prototype.seek = function seek() {
    var chunk = this.buffer.shift(this.expecting);
    // istanbul ignore if
    if (!chunk.length) {
        return errors.BrokenReaderState({
            state: this.state,
            expecting: this.expecting,
            avail: this.buffer.avail()
        });
    }
    this.expecting = this.sizeRW.width;
    this.state = States.PendingLength;

    // pooled inline of fromBufferResult
    this.chunkRW.poolReadFrom(seekReadRes, chunk, 0);
    iface.checkAllReadFrom(seekReadRes, chunk);
    if (seekReadRes.err) {
        var annBuf = iface.makeAnnotatedBuffer(chunk, 0, false);
        this.chunkRW.poolReadFrom(seekReadRes2, annBuf, 0);
        iface.checkAllReadFrom(seekReadRes2, chunk);
        iface.annotateError(seekReadRes, seekReadRes2, 0, annBuf);
        return seekReadRes.err;
    } else {
        this.emit(seekReadRes.value);
        return;
    }
};

ReadMachine.prototype.flush = function flush() {
    var avail = this.buffer.avail();
    if (avail) {
        this.buffer.clear();
        this.expecting = 4;
        this.state = States.PendingLength;
        return errors.TruncatedRead({
            length: avail,
            state: this.state,
            expecting: this.expecting
        });
    } else {
        return null;
    }
};
