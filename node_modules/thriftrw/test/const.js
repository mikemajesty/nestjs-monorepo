// Copyright (c) 2020 Uber Technologies, Inc.
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

var Thrift = require('..').Thrift;
var fs = require('fs');
var path = require('path');
var source = fs.readFileSync(path.join(__dirname, 'const.thrift'), 'utf-8');
var thrift;

test('consts parse', function t(assert) {
    thrift = new Thrift({source: source});
    assert.equal(thrift.consts.ten, 10, 'ten constant');
    assert.equal(thrift.consts.tenForward, 10, 'forward reference');
    assert.deepEqual(thrift.consts.edges, {0: 1, 1: 2}, 'map constant');
    assert.deepEqual(thrift.consts.names, ['a', 'ab', 'abc'], 'list constant');
    assert.deepEqual(thrift.consts.tens, [10, 10, 10], 'list of identifiers');
    assert.end();
});
