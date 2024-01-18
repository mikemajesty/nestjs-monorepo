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

var Thrift = require('../thrift').Thrift;
var fs = require('fs');
var path = require('path');
var source = fs.readFileSync(path.join(__dirname, 'service.thrift'), 'utf-8');
var thrift = new Thrift({source: source, strict: false});

test('has args', function t(assert) {
    assert.ok(thrift.getType('Foo::foo_args'), 'has args');
    assert.ok(thrift.Foo.foo.args, 'has args exposed on service object');
    assert.end();
});

test('void function has no success in result struct', function t(assert) {
    var result = thrift.getType('Foo::bar_result');
    assert.deepEqual(Object.keys(result.fieldsById), ['1'], 'only exception id');
    assert.deepEquals(Object.keys(result.fieldsByName), ['barError'], 'only exception name');
    assert.end();
});

test('non-void function has success in result struct', function t(assert) {
    var result = thrift.getType('Foo::foo_result');
    assert.deepEqual(Object.keys(result.fieldsById), ['0', '1'], 'success and error ids');
    assert.deepEquals(Object.keys(result.fieldsByName), ['success', 'fail'], 'success and error field names');
    assert.end();
});

test('returns base-type that is not void', function t(assert) {
    var result = thrift.getType('Foo::returnsI32_result');
    assert.deepEqual(Object.keys(result.fieldsById), ['0'], 'success id');
    assert.deepEquals(Object.keys(result.fieldsByName), ['success'], 'success name');
    assert.end();
});

test('returns non-base-type', function t(assert) {
    var result = thrift.getType('Foo::returnsStruct_result');
    assert.deepEqual(Object.keys(result.fieldsById), ['0'], 'success id');
    assert.deepEquals(Object.keys(result.fieldsByName), ['success'], 'success name');
    assert.end();
});

test('service extends from another service', function t(assert) {
    assert.deepEqual(
        Object.keys(thrift.Qux),
        ['quux', 'foo', 'bar', 'returnsI32', 'returnsStruct'],
        'Service contains function from BaseService'
    );

    assert.deepEqual(
        Object.keys(thrift.Corge),
        ['grault', 'quux', 'foo', 'bar', 'returnsI32', 'returnsStruct'],
        'Service contains function from BaseService'
    );

    assert.deepEqual(
        Object.keys(thrift.Garply),
        ['waldo', 'quux', 'foo', 'bar', 'returnsI32', 'returnsStruct'],
        'Service contains function from BaseService'
    );

    assert.equal(
        thrift.Qux.foo,
        thrift.Foo.foo,
        'Function Qux.foo is the same as Foo.foo by reference'
    );

    assert.end();
});

test('service extends throws on duplicate function name', function t(assert) {
    assert.throws(
        duplicateFunction,
        /Foo.bar already inherited from baseService/,
        'Service extends throws if function with same name already exists'
    );

    function duplicateFunction() {
        var source = fs.readFileSync(path.join(__dirname, 'service-duplicate-function-error.thrift'), 'utf-8');
        return new Thrift({source: source});
    }

    assert.end();
});
