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

var hexdiff = require('hexer/diff');

var util = require('util');
var formatError = require('./interface').formatError;
var intoBufferResult = require('./interface').intoBufferResult;
var fromBufferResult = require('./interface').fromBufferResult;

module.exports.cases = testCases;

function testCases(rw, cases) {
    var self = function runTestCases(assert, done) {
        for (var i = 0; i < cases.length; i++) {
            var testCase;
            if (Array.isArray(cases[i])) {
                var value = cases[i][0];
                var bytes = cases[i][1];
                testCase = {
                    lengthTest: {
                        length: bytes.length,
                        value: value
                    },
                    writeTest: {
                        bytes: bytes,
                        value: value
                    },
                    readTest: {
                        bytes: bytes,
                        value: value
                    }
                };
            } else if (typeof cases[i] !== 'object') {
                throw new Error('invalid test case ' + i);
            } else {
                testCase = cases[i];
            }
            new RWTestCase(assert, rw, testCase).run();
        }
        (done || assert.end)();
    };
    self.assert = null;
    self.rw = null;
    return self;
}

function RWTestCase(assert, rw, testCase) {
    this.assert = assert;
    this.rw = rw;
    this.testCase = testCase;
}

RWTestCase.prototype.run = function run() {
    if (this.testCase.lengthTest) this.runLengthTest();
    if (this.testCase.writeTest) this.runWriteTest();
    if (this.testCase.readTest) this.runReadTest();
};

RWTestCase.prototype.runLengthTest = function runLengthTest() {
    var testCase = this.testCase.lengthTest;
    var val = testCase.value;
    var res = this.rw.byteLength(val);
    if (res.err) {
        if (testCase.error) {
            this.assert.deepEqual(
                copyErr(res.err, testCase.error),
                testCase.error, 'expected length error');
        } else {
            this.assert.ifError(res.err, 'no length error');
        }
    } else if (testCase.error) {
        this.assert.fail('expected length error');
    } else {
        this.assert.deepEqual(res && res.length, testCase.length, util.format('length: %j', val));
    }
};

RWTestCase.prototype.runWriteTest = function runWriteTest() {
    var testCase = this.testCase.writeTest;
    var val = testCase.value;
    var got = Buffer.alloc(testCase.bytes ? testCase.bytes.length : testCase.length || 0);
    var res = intoBufferResult(this.rw, got, val);
    var err = res.err;

    if (err) {
        if (testCase.error) {
            this.assert.deepEqual(
                copyErr(err, testCase.error),
                testCase.error, 'expected write error');
        } else {
            this.assert.ifError(err, 'no write error');
            // istanbul ignore else
            if (err) this.dumpError('write', err);
        }
    } else if (testCase.error) {
        this.assert.fail('expected write error');
    } else {
        var desc = util.format('write: %j', val);
        var buf = Buffer.from(testCase.bytes);
        // istanbul ignore if
        if (got.toString('hex') !== buf.toString('hex')) {
            // TODO: re-run write with an annotated buffer
            this.assert.comment('expected v actual:\n' +
                hexdiff(buf, got, {colored: true}));
            this.assert.fail(desc);
        } else {
            this.assert.pass(desc);
        }
    }
};

RWTestCase.prototype.runReadTest = function runReadTest() {
    var testCase = this.testCase.readTest;
    var buffer = Buffer.from(testCase.bytes);
    var res = fromBufferResult(this.rw, buffer);
    var err = res.err;
    var got = res.value;
    if (err) {
        if (testCase.error) {
            this.assert.deepEqual(
                copyErr(err, testCase.error),
                testCase.error, 'expected read error');
        } else {
            this.assert.ifError(err, 'no read error');
            // istanbul ignore else
            if (err) this.dumpError('read', err);
        }
    } else if (testCase.error) {
        this.assert.fail('expected read error');
    } else {
        var val = testCase.value;
        this.assert.deepEqual(got, val, util.format('read: %j', val));
        if (typeof val === 'object') {
            var gotConsName = got && got.constructor && got.constructor.name;
            var valConsName = val && val.constructor && val.constructor.name;
            this.assert.equal(gotConsName, valConsName,
                'expected ' + valConsName + ' constructor');
        }
    }
};

RWTestCase.prototype.dumpError = function dumpError(kind, err) {
    var dump = kind + ' error ' + formatError(err, {
        color: true
    });
    var lines = dump.split(/\n/);
    for (var i = 0; i < lines.length; ++i) {
        this.assert.comment(lines[i]);
    }
};

function copyErr(err, tmpl) {
    var out = {};
    // istanbul ignore else
    if (err) {
        Object.keys(tmpl).forEach(function(key) {
            out[key] = err[key];
        });
    }
    return out;
}
