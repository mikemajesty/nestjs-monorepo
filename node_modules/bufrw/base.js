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

var assert = require('assert');

var errors = require('./errors');

module.exports.BufferRW = BufferRW;
module.exports.LengthResult = LengthResult;
module.exports.WriteResult = WriteResult;
module.exports.ReadResult = ReadResult;

function BufferRW(byteLength, readFrom, writeInto, isPooled) {
    if (!(this instanceof BufferRW)) {
        return new BufferRW(byteLength, readFrom, writeInto, isPooled);
    }

    // istanbul ignore else
    if (byteLength && readFrom && writeInto) {
        assert(typeof byteLength === 'function', 'expected byteLength to be function');
        assert(typeof readFrom === 'function', 'expected readFrom to be function');
        assert(typeof writeInto === 'function', 'expected writeInto to be function');
        // istanbul ignore else
        if (isPooled) {
            this.poolByteLength = byteLength;
            this.poolReadFrom = readFrom;
            this.poolWriteInto = writeInto;
        } else {
            this.byteLength = byteLength;
            this.readFrom = readFrom;
            this.writeInto = writeInto;
        }
    } else {
        // Args weren't specified. Expect either pool methods or regular
        // methods to be overriden.

        assert(
            this.poolReadFrom !== BufferRW.prototype.poolReadFrom ||
            this.readFrom !== BufferRW.prototype.readFrom,
            'expected either poolReadFrom or readFrom to be overriden'
        );
        assert(
            this.poolWriteInto !== BufferRW.prototype.poolWriteInto ||
            this.writeInto !== BufferRW.prototype.writeInto,
            'expected either poolWriteInto or writeInto to be overriden'
        );
        assert(
            this.poolByteLength !== BufferRW.prototype.poolByteLength ||
            this.byteLength !== BufferRW.prototype.byteLength,
            'expected either poolByteLength or byteLength to be overriden'
        );
    }
}

BufferRW.prototype.readFrom = function readFrom(arg1, arg2, arg3) {
    assert(this.poolReadFrom !== BufferRW.prototype.poolReadFrom, 'poolReadFrom is overridden');
    var readResult = new ReadResult();
    this.poolReadFrom(readResult, arg1, arg2, arg3);
    return readResult;
};

BufferRW.prototype.writeInto = function writeInto(value, buffer, offset) {
    assert(this.poolWriteInto !== BufferRW.prototype.poolWriteInto, 'poolWriteInto is overridden');
    var writeResult = new WriteResult();
    this.poolWriteInto(writeResult, value, buffer, offset);
    return writeResult;
};

BufferRW.prototype.byteLength = function byteLength(arg1, arg2, arg3) {
    assert(this.poolbyteLength !== BufferRW.prototype.poolByteLength, 'poolByteLength is overridden');
    var lengthResult = new LengthResult();
    this.poolByteLength(lengthResult, arg1, arg2, arg3);
    return lengthResult;
};

// istanbul ignore next
BufferRW.prototype.poolReadFrom = function poolReadFrom(destResult, arg1, arg2, arg3) {
    var res = this.readFrom(arg1, arg2, arg3);
    return destResult.copyFrom(res);
};

// istanbul ignore next
BufferRW.prototype.poolWriteInto = function poolWriteInto(destResult, value, buffer, offset) {
    var res = this.writeInto(value, buffer, offset);
    return destResult.copyFrom(res);
};

// istanbul ignore next
BufferRW.prototype.poolByteLength = function poolByteLength(destResult, arg1, arg2, arg3) {
    var res = this.byteLength(arg1, arg2, arg3);
    return destResult.copyFrom(res);
};

function LengthResult(err, length) {
    this.err = err || null;
    this.length = length || 0;
}

LengthResult.prototype.reset = function reset(err, length) {
    this.err = err;
    this.length = length;
    return this;
};

// istanbul ignore next
LengthResult.prototype.copyFrom = function copyFrom(srcRes) {
    this.err = srcRes.err;
    this.length = srcRes.length;
    return this;
};

// istanbul ignore next
LengthResult.error = function error(err, length) {
    return new LengthResult(err, length);
};

// istanbul ignore next
LengthResult.just = function just(length) {
    return new LengthResult(null, length);
};

function WriteResult(err, offset) {
    this.err = err || null;
    this.offset = offset || 0;
}

WriteResult.prototype.reset = function reset(err, offset) {
    this.err = err;
    this.offset = offset;
    return this;
};

// istanbul ignore next
WriteResult.prototype.copyFrom = function copyFrom(srcResult) {
    this.err = srcResult.err;
    this.offset = srcResult.offset;
};

// istanbul ignore next
WriteResult.error = function error(err, offset) {
    return new WriteResult(err, offset);
};

// istanbul ignore next
/*jshint maxparams:6*/
WriteResult.poolRangedError = function poolRangedError(destResult, err, start, end, value) {
    assert(typeof destResult === 'object' && destResult.constructor.name === 'WriteResult');

    err.offest = start;
    err.endOffset = end;
    return destResult.reset(err, start, value);
};

// istanbul ignore next
WriteResult.rangedError = function rangedError(err, start, end, value) {
    return WriteResult.poolRangedError(new WriteResult(), start, end, value);
};

// istanbul ignore next
WriteResult.just = function just(offset) {
    return new WriteResult(null, offset);
};


// istanbul ignore next
WriteResult.shortError = function shortError(expected, actual, offset) {
    return WriteResult.poolShortError(new WriteResult(), expected, actual, offset);
};

// istanbul ignore next
WriteResult.poolShortError = function poolShortError(destResult, expected, actual, offset) {
    assert(typeof destResult === 'object' && destResult.constructor.name === 'WriteResult');

    return destResult.reset(new errors.ShortBuffer({
        expected: expected,
        actual: actual,
        offset: offset
    }), offset);
};

function ReadResult(err, offset, value) {
    this.err = err || null;
    this.offset = offset || 0;
    // istanbul ignore next
    this.value = value === undefined ? null : value;
}

// istanbul ignore next
ReadResult.prototype.copyFrom = function copyFrom(srcResult) {
    this.err = srcResult.err;
    this.offset = srcResult.offset;
    this.value = srcResult.value;
    return this;
};

// istanbul ignore next
ReadResult.prototype.reset = function reset(err, offset, value) {
    this.err = err;
    this.offset = offset;
    this.value = value;
    return this;
};

// istanbul ignore next
ReadResult.error = function error(err, offset, value) {
    return new ReadResult(err, offset, value);
};

// istanbul ignore next
ReadResult.poolRangedError = function poolRangedError(destResult, err, start, end, value) {
    assert(typeof destResult === 'object' && destResult.constructor.name === 'ReadResult');

    err.offest = start;
    err.endOffset = end;
    return destResult.reset(err, start, value);
};

// istanbul ignore next
ReadResult.rangedError = function rangedError(err, start, end, value) {
    return ReadResult.poolRangedError(new ReadResult(), err, start, end, value);
};

// istanbul ignore next
ReadResult.just = function just(offset, value) {
    return new ReadResult(null, offset, value);
};

// istanbul ignore next
ReadResult.shortError = function shortError(destResult, expected, actual, offset, endOffset) {
    return ReadResult.poolShortError(new ReadResult(), expected, actual, offset, endOffset);
};

ReadResult.poolShortError = function poolShortError(destResult, expected, actual, offset, endOffset) {
    assert(typeof destResult === 'object' && destResult.constructor.name === 'ReadResult');
    var err;

    if (endOffset === undefined) {
        err = new errors.ShortBuffer({
            expected: expected,
            actual: actual,
            offset: offset
        }); 
    } else {
        err = new errors.ShortBufferRanged({
            expected: expected,
            actual: actual,
            offset: offset,
            endOffset: endOffset
        });
    }

    return destResult.reset(err, offset);
};
