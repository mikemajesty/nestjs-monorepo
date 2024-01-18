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

var inherits = require('util').inherits;
var inspect = require('util').inspect;
var Transform = require('stream').Transform;
var WrappedError = require('error/wrapped');

var toBufferResult = require('../interface').toBufferResult;

var ChunkWriteError = WrappedError({
    type: 'chunk-write',
    message: '{origMessage} while writing {valueInspected}',
    valueInspected: null,
    value: null
});

module.exports = ChunkWriter;

// TODO: pre-allocated buffer strategies

function ChunkWriter(chunkRW, options) {
    if (!(this instanceof ChunkWriter)) {
        return new ChunkWriter(chunkRW, options);
    }
    Transform.call(this, options);
    this._writableState.objectMode = true;
    this._readableState.objectMode = false;
    this.chunkRW = chunkRW;
}

inherits(ChunkWriter, Transform);

ChunkWriter.prototype._transform = function _transform(value, encoding, callback) {
    var res = toBufferResult(this.chunkRW, value);
    var err = res.err;
    var buffer = res.value;
    if (err) {
        callback(ChunkWriteError(err, {
            valueInspected: inspect(value),
            value: value
        }));
    } else {
        this.push(buffer);
        callback();
    }
};
