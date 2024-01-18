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

var test = require('tape');

var ConcatReadBuffer = require('../../stream/concat_read_buffer');

test('ConcatReadBuffer', function t(assert) {
    var buf = ConcatReadBuffer();
    assert.equal(buf.avail(), 0, 'starts out with no avail');
    assert.equal(buf.free(), 0, 'starts out with no free');
    assert.deepEqual(buf.shift(2), Buffer.alloc(0), 'expected empty shift at first');

    buf.push(Buffer.from([1, 2, 3, 4]));
    assert.equal(buf.avail(), 4, 'now has 4 avail');
    assert.equal(buf.free(), 0, 'still has no free');
    assert.deepEqual(buf.shift(2), Buffer.from([1, 2]), 'expected shift first two');

    buf.clear();
    assert.equal(buf.avail(), 0, 'expected now empty avail');
    assert.equal(buf.free(), 0, 'expected now empty free');
    assert.deepEqual(buf.shift(2), Buffer.alloc(0), 'expected no shift after clear');

    buf.push(Buffer.from([5, 6]));
    assert.equal(buf.avail(), 2, 'now has 2 avail');
    assert.equal(buf.free(), 0, 'still has no free');
    buf.push(Buffer.from([7, 8]));
    assert.equal(buf.avail(), 4, 'now has 4 avail');
    assert.equal(buf.free(), 0, 'still has no free');
    assert.deepEqual(buf.shift(4), Buffer.from([5, 6, 7, 8]), 'expected exact shift of four');
    assert.equal(buf.avail(), 0, 'expected now empty avail');
    assert.equal(buf.free(), 0, 'expected now empty free');
    assert.deepEqual(buf.shift(2), Buffer.alloc(0), 'expected no shift after drain');

    assert.end();
});
