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

var util = require('util');
var assert = require('assert');
var ThriftList = require('./list').ThriftList;
var TYPE = require('./TYPE');

function ThriftSet(valueType, annotations) {
    ThriftList.call(this, valueType, annotations);
    this.mode = annotations && annotations['js.type'] || 'array';
    this.form = null;
    this.surface = null;
    if (this.mode === 'object') {
        if (valueType.name === 'string') {
            this.rw.form = this.objectStringForm;
        // istanbul ignore else
        } else if (
            valueType.name === 'byte' ||
            valueType.name === 'i16' ||
            valueType.name === 'i32'
        ) {
            this.rw.form = this.objectNumberForm;
        } else {
            assert.fail('sets with js.type of \'object\' must have a value type ' +
                'of \'string\', \'byte\', \'i16\', or \'i32\'');
        }
        this.surface = Object;
    // istanbul ignore else
    } else if (this.mode === 'array') {
        this.rw.form = this.arrayForm;
        this.surface = Array;
    } else {
        assert.fail('set must have js.type of object or array (default)');
    }
    this.annotations = annotations;
}

util.inherits(ThriftSet, ThriftList);

ThriftSet.prototype.name = 'set';
ThriftSet.prototype.typeid = TYPE.SET;
// Lists are indistinguishable on the wire apart from the typeid.
// A prior version of thriftrw was writing sets with the list typeid.
// Allowing an alternate typeid eases migration temporarily.
ThriftSet.prototype.altTypeid = TYPE.LIST;
ThriftSet.prototype.models = 'type';

ThriftSet.prototype.arrayForm = {
    create: function create() {
        return [];
    },
    add: function add(values, value) {
        values.push(value);
    },
    toArray: function toArray(values) {
        assert(Array.isArray(values), 'set must be expressed as an array');
        return values;
    }
};

ThriftSet.prototype.objectNumberForm = {
    create: function create() {
        return {};
    },
    add: function add(values, value) {
        values[value] = true;
    },
    toArray: function toArray(object) {
        assert(object && typeof object === 'object', 'set must be expressed as an object');
        var keys = Object.keys(object);
        var values = [];
        for (var index = 0; index < keys.length; index++) {
            // istanbul ignore else
            if (object[keys[index]]) {
                values.push(+keys[index]);
            }
        }
        return values;
    }
};

ThriftSet.prototype.objectStringForm = {
    create: function create() {
        return {};
    },
    add: function add(values, value) {
        values[value] = true;
    },
    toArray: function toArray(object) {
        assert(object && typeof object === 'object', 'set must be expressed as an object');
        var keys = Object.keys(object);
        var values = [];
        for (var index = 0; index < keys.length; index++) {
            // istanbul ignore else
            if (object[keys[index]]) {
                values.push(keys[index]);
            }
        }
        return values;
    }
};

module.exports.ThriftSet = ThriftSet;
