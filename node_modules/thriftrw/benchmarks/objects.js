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

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var Thrift = require('../thrift').Thrift;
var benchCasesSync = require('./lib/benchmark').benchCasesSync;
var Cases = require('./cases');

var sourceFile = path.join(__dirname, 'benchmark.thrift');
var source = fs.readFileSync(sourceFile, 'utf8');
var thrift = new Thrift({source: source});

var jsen = require('jsen');
var greek = ['alpha', 'beta', 'gama', 'delta', 'epsilon', 'zeta', 'eta',
    'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi',
    'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega'];

function generateMultipleObjectCases() {
    var cases = {};
    for (var index = 0; index < greek.length; index += 6) {
        var c = generateObjectCases(index);
        cases[index + ' thrift'] = c.thrift;
        cases[index + ' json'] = c.json;
    }
    return cases;
}

function generateObjectCases(length) {

    var payload = generatePayload(length);
    var schema = generateOptionalSchema(24);

    var verify = jsen(schema);
    var valid = verify(payload);
    assert.ok(valid, 'json must be valid');

    var cases = {
        'thrift': new Cases.ThriftCase({payload: payload, rw: thrift.CoordinatesHolder.rw}),
        'json': new Cases.JsonCase({payload: payload, verify: verify})
    };

    return cases;
}

function generatePayload(length) {
    var payload = {};
    for (var index = 0; index < length; index++) {
        var name = greek[index];
        payload[name] = name;
    }
    return payload;
}

function generateOptionalSchema(length) {
    var properties = {};
    for (var index = 0; index < length; index++) {
        var name = greek[index];
        properties[name] = {type: 'string'};
    }
    var schema = {type: 'object', properties: properties};
    return schema;
}

benchCasesSync(generateMultipleObjectCases());
