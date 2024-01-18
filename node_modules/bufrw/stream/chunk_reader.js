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
var Transform = require('stream').Transform;
var ReadMachine = require('./read_machine');

module.exports = ChunkReader;

function ChunkReader(sizeRW, chunkRW, options) {
    if (!(this instanceof ChunkReader)) {
        return new ChunkReader(sizeRW, chunkRW, options);
    }
    var self = this;
    options = options || {};
    Transform.call(self, options);
    this._readableState.objectMode = true;
    this.mach = ReadMachine(sizeRW, chunkRW, emit);
    function emit(value) {
        self.push(value);
    }
}

inherits(ChunkReader, Transform);

ChunkReader.prototype._transform = function _transform(buf, encoding, callback) {
    var err = this.mach.handleChunk(buf);
    callback(err);
};

ChunkReader.prototype._flush = function _flush(callback) {
    var err = this.mach.flush();
    callback(err);
};
