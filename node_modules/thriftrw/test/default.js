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
var entryIdl = path.join(__dirname, 'default.thrift');
var model;

var allowFilesystemAccess = !process.browser;
var idls;
if (process.browser) {
    idls = global.idls;
}

test('default values on structs work', function t(assert) {
    model = new Thrift({entryPoint: entryIdl, allowFilesystemAccess: allowFilesystemAccess, idls: idls});
    var health = new model.Health({name: 'grand'});
    assert.equals(health.ok, true, 'default truth value passes through');
    assert.equals(health.notOk, false, 'default false value passes through');
    assert.equals(health.message, 'OK', 'default string passes through');
    assert.equals(health.name, 'grand', 'option overrides default');
    assert.equals(health.respected, null, 'null is default value');
    assert.equals(health.ragdoll, null, 'null is default value for dependent thrifts');
    assert.deepEquals(health.numbers, [1, 2, 3], 'complex defaults serialize');
    assert.end();
});

test('default value as undefined respected in constructor', function t(assert) {
    model = new Thrift({
        entryPoint: entryIdl,
        allowFilesystemAccess: allowFilesystemAccess,
        defaultAsUndefined: true,
        idls: idls
    });
    var health = new model.Health({name: 'grand'});
    assert.equals(health.respected, undefined, 'undefined as default value');
    assert.equals(health.ragdoll, undefined, 'undefined as default value for dependent thrifts');
    assert.end();
});
