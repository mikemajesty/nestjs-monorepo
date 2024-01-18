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

/* eslint camelcase:[0] */
/* eslint no-new:[0] */
'use strict';

var Buffer = require('buffer').Buffer;
var test = require('tape');
var fs = require('fs');
var path = require('path');
var Thrift = require('../thrift').Thrift;

var source = fs.readFileSync(path.join(__dirname, 'enum.thrift'), 'utf-8');
var thrift = new Thrift({source: source});

var MyStruct = thrift.getType('MyStruct');

test('can access enum def annotations', function t(assert) {
    var MAE = thrift.models.MyAnnotatedEnum;
    assert.deepEqual(MAE.annotations, {'aka': 'my.annotated.enum'});
    assert.deepEqual(MAE.namesToAnnotations.MAE_A, {'aka': 'my.annotated.enum.a'});
    assert.end();
});

test('round trip an enum', function t(assert) {
    var inStruct = {me2_2: 'ME2_2', me3_n2: 'ME3_N2', me3_d1: 'ME3_D1'};
    var buffer = MyStruct.toBuffer(inStruct);
    var outStruct = MyStruct.fromBuffer(buffer);
    assert.deepEquals(outStruct, inStruct);
    assert.end();
});

test('first enum is 0 by default', function t(assert) {
    var inStruct = {me2_2: null, me3_n2: null, me3_d1: 'ME3_0'};
    var buffer = MyStruct.toBuffer(inStruct);
    var expected = (Buffer.from || Buffer)([
        0x08, 0x00, // struct
        0x03, // field number 3
        0x00, 0x00, 0x00, 0x00, // value 0
        0x00
    ]);
    assert.deepEqual(buffer, expected);
    assert.end();
});

test('count resumes from previous enum', function t(assert) {
    var inStruct = {me2_2: null, me3_n2: null, me3_d1: 'ME3_N1'};
    var buffer = MyStruct.toBuffer(inStruct);
    var expected = (Buffer.from || Buffer)([
        0x08,                   // typeid:1 -- 8, struct
        0x00, 0x03,             // field:2  -- 3
        0xff, 0xff, 0xff, 0xff, // value~4  -- -1
        0x00                    // typeid:1 -- 0, stop
    ]);
    assert.deepEqual(buffer, expected);
    assert.end();
});

test('duplicate name permitted', function t(assert) {
    var inStruct = {me2_2: null, me3_n2: null, me3_d1: 'ME3_D0'};
    var buffer = MyStruct.toBuffer(inStruct);
    var expected = (Buffer.from || Buffer)([
        0x08,                   // typeid:1 -- 0, struct
        0x00, 0x03,             // field~2  -- 3
        0x00, 0x00, 0x00, 0x00, // value~4  -- 0
        0x00                    // typeid:1 -- 0, stop
    ]);
    assert.deepEqual(buffer, expected);
    assert.end();
});

test('duplicate name returns in normal form', function t(assert) {
    var inStruct = {me2_2: null, me3_n2: null, me3_d1: 'ME3_D0'};
    var buffer = MyStruct.toBuffer(inStruct);
    var outStruct = MyStruct.fromBuffer(buffer);
    assert.deepEqual(outStruct, {
        me2_2: 'ME2_2',
        me3_n2: 'ME3_N2',
        me3_d1: 'ME3_D0'
    });
    assert.end();
});

test('throws on name collision', function t(assert) {
    var source = fs.readFileSync(path.join(__dirname, 'enum-collision.thrift'), 'utf-8');
    assert.throws(function throws() {
        var thrift = new Thrift({source: source});
    }, /duplicate name in enum MyEnum4 at 24:6/);
    assert.end();
});

test('throws on overflow', function t(assert) {
    var source = fs.readFileSync(path.join(__dirname, 'enum-overflow.thrift'), 'utf-8');
    assert.throws(function throws() {
        var thrift = new Thrift({source: source});
        throw err;
    }, /overflow in value in enum MyEnum4 at 24:6/);
    assert.end();
});

test('can\'t encode non-name', function t(assert) {
    var inStruct = {me3_d1: -1};
    assert.throws(function throws() {
        MyStruct.toBuffer(inStruct);
    }, /name must be a string for enumeration MyEnum3, got: -1 \(number\)/);
    assert.end();
});

test('can\'t encode unknown name', function t(assert) {
    var inStruct = {me3_d1: 'BOGUS'};
    assert.throws(function throws() {
        MyStruct.toBuffer(inStruct);
    }, /name must be a valid member of enumeration MyEnum3, got: BOGUS/);
    assert.end();
});

test('can\'t decode unknown number', function t(assert) {
    var buffer = (Buffer.from || Buffer)([
        0x08,                   // typeid:1  -- 8, struct
        0x00, 0x03,             // fieldid:2 -- 3
        0x00, 0x00, 0x00, 0x0b, // value:4   -- 11
        0x00                    // typeid:1  -- 0, stop
    ]);
    assert.throws(function throws() {
        MyStruct.fromBuffer(buffer);
    }, /value must be a valid member of enumeration MyEnum3, got: 11/);
    assert.end();
});
