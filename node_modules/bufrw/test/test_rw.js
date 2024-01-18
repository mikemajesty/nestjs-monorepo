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

var testRW = require('../test_rw');
var TypedError = require('error/typed');
var test = require('tape');

var BufferRW = require('../base').BufferRW;

var BangError = TypedError({
    type: 'bang',
    message: 'bang'
});

var dummyRW = {
    poolByteLength: function(destResult) {
        return destResult.reset(null, 0);
    },
    poolWriteInto: function(destResult, val, buffer, offset) {
        return destResult.reset(null, offset);
    },
    poolReadFrom: function(destResult, buffer, offset) {
        return destResult.reset(null, offset, null);
    },
};

dummyRW.__proto__ = BufferRW.prototype;

var brokenRW = {
    poolByteLength: function(destResult) {
        return destResult.reset(new Error('boom'));
    },
    poolWriteInto: function(destResult, val, buffer, offset) {
        return destResult.reset(new BangError(), offset);
    },
    poolReadFrom: function(destResult, buffer, offset) {
        return destResult.reset(new Error('bork'), offset);
    },
};

brokenRW.__proto__ = BufferRW.prototype;

test('testRW: checks cases', function t(assert) {
    assert.throws(function badTest() {
        testRW.cases(dummyRW, ['BAD'])(null, null);
    }, /invalid test case 0/, 'catches invalid test cases');
    assert.end();
});

test('testRW: unexpected errors', function t(assert) {
    var rwTest = testRW.cases(brokenRW, [
        [null, [0x00]]
    ]);
    runMockedTest(rwTest, function done(results) {
        assert.equal(results[0].name, 'no length error', 'expected "no length error"');
        assert.equal(results[0].actual.message, 'boom', 'expected actual "boom" error');

        assert.equal(results[1].name, 'no write error', 'expected "no write error"');
        assert.equal(results[1].actual.message, 'bang', 'expected actual "bang" error');
        assert.equal(results[2],
            'write error BangError: bang');

        assert.equal(results[4].name, 'no read error', 'expected "no read error"');
        assert.equal(results[4].actual.message, 'bork', 'expected actual "bork" error');

        assert.equal(results[5],
            'read error Error: bork');

        assert.end();
    });
});

test('testRW: error expectations', function t(assert) {
    var rwTest = testRW.cases(dummyRW, [
        {
            lengthTest: {
                value: null,
                error: {message: 'nope length'}
            },
            writeTest: {
                length: 0,
                value: null,
                error: {message: 'nope write'}
            },
            readTest: {
                bytes: [],
                error: {message: 'nope read'}
            }
        }
    ]);
    runMockedTest(rwTest, function done(results) {
        assert.equal(results[0].name, 'expected length error', 'expected "expected length error"');
        assert.equal(results[1].name, 'expected write error', 'expected "expected write error"');
        assert.equal(results[2].name, 'expected read error', 'expected "expected read error"');
        assert.end();
    });
});

function runMockedTest(t, callback) {
    var results = [];
    var assert = require('tape').Test('(mock)');
    assert.on('result', onResult);
    assert.once('end', onEnd);
    t(assert);
    function onResult(msg) {
        results.push(msg);
    }
    function onEnd() {
        assert.removeListener('result', onResult);
        callback(results);
    }
}
