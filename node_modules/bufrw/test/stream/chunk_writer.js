// Copyright (c) 2015 Uber Technologies, Inc.

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

var PassThrough = require('stream').PassThrough;
var util = require('util');

var ChunkWriter = require('../../stream/chunk_writer.js');

var testExpectations = require('../lib/test_expectations');
var byteLength = require('../../interface').byteLength;
var intoBuffer = require('../../interface').intoBuffer;
var UInt8 = require('../../atoms').UInt8;
var StringRW = require('../../string_rw');
var SeriesRW = require('../../series');
var BufferRW = require('../../base').BufferRW;

var str1 = StringRW(UInt8);
var frameRW = SeriesRW(UInt8, str1);
var writeErrorRW = {
    poolByteLength: function(destResult) {
        return destResult.reset(null, 0);
    },
    poolWriteInto: function(destResult) {
        return destResult.reset(new Error('boom'), 0);
    }
};

writeErrorRW.__proto__ = BufferRW.prototype;

var frames = [];
var expectedBuffers = [];
[
    'boot', 'cat',
    'boots', 'cats',
    'boots', 'N',
    'cats', 'N',
    'boots', 'N',
    'cats'
].forEach(function eachToken(token, i) {
    var frame = [0, token];
    frame[0] = byteLength(frameRW, frame);
    var expectedBuffer = intoBuffer(frameRW, Buffer.alloc(frame[0]), frame);
    var assertMess = util.format('got expected[%s] buffer', i);
    frames.push(frame);
    expectedBuffers.push({
        buffer: function expectToken(buffer, assert) {
            assert.deepEqual(buffer, expectedBuffer, assertMess);
        }
    });
});

function writerTest(desc, frameRW, frames, expected) {
    testExpectations(desc, expected, function run(expect, done) {
        var writer = ChunkWriter(frameRW);
        var stream = PassThrough({
            objectMode: true
        });
        frames.forEach(function(frame) {
            stream.push(frame);
        });
        stream.push(null);
        writer.on('data', function onData(buffer) {
            expect('buffer', buffer);
        });
        writer.on('error', function onError(err) {
            expect('error', err);
            writer.end();
        });
        writer.on('finish', done);
        writer.on('end', done);
        stream.pipe(writer);
    });
}

writerTest('writes expected frame buffers', frameRW, frames, expectedBuffers);

writerTest('handles write errors', SeriesRW(UInt8, writeErrorRW),
    [[1, '']],
    [
        {
            error: function(err, assert) {
                assert.equal(err.message, 'boom while writing [ 1, \'\' ]', 'expected boom');
            }
        }
    ]);
