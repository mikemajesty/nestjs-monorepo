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

/* eslint max-statements:[1, 30] */
'use strict';

var bufrw = require('bufrw');
var assert = require('assert');
var TYPE = require('./TYPE');
var errors = require('./errors');
var util = require('util');

function ThriftList(valueType, annotations) {
    this.valueType = valueType;
    this.rw = new ListRW(valueType, this);
    this.annotations = annotations;
}

ThriftList.prototype.name = 'list';
ThriftList.prototype.typeid = TYPE.LIST;
ThriftList.prototype.surface = Array;
ThriftList.prototype.models = 'type';

function ListRW(valueType, model) {
    this.valueType = valueType;
    this.model = model;

    bufrw.Base.call(this);
}

util.inherits(ListRW, bufrw.Base);

ListRW.prototype.headerRW = bufrw.Series([bufrw.Int8, bufrw.Int32BE]);

ListRW.prototype.form = {
    create: function create() {
        return [];
    },
    add: function add(array, value) {
        array.push(value);
    },
    toArray: function toArray(array) {
        assert(Array.isArray(array), 'list must be expressed as an array');
        return array;
    }
};

ListRW.prototype.poolByteLength = function poolByteLength(destResult, list) {
    var valueType = this.valueType;

    list = this.form.toArray(list);

    var length = 5; // header length
    var t;
    for (var i = 0; i < list.length; i++) {
        t = valueType.rw.poolByteLength(destResult, list[i]);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        length += t.length;
    }
    return destResult.reset(null, length);
};

ListRW.prototype.poolWriteInto = function poolWriteInto(destResult, list, buffer, offset) {
    var valueType = this.valueType;

    list = this.form.toArray(list);

    var t = this.headerRW.poolWriteInto(destResult, [valueType.typeid, list.length],
        buffer, offset);
    // istanbul ignore if
    if (t.err) {
        return t;
    }
    offset = t.offset;

    for (var i = 0; i < list.length; i++) {
        t = valueType.rw.poolWriteInto(destResult, list[i], buffer, offset);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        offset = t.offset;
    }
    return destResult.reset(null, offset);
};

ListRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    var valueType = this.valueType;

    var t = this.headerRW.poolReadFrom(destResult, buffer, offset);
    // istanbul ignore if
    if (t.err) {
        return t;
    }
    offset = t.offset;
    var valueTypeid = t.value[0];
    var size = t.value[1];

    if (valueTypeid !== valueType.typeid) {
        return destResult.reset(errors.TypeIdMismatch({
            encoded: valueTypeid,
            expectedId: valueType.typeid,
            expected: valueType.name,
            what: this.model.name
        }), offset, null);
    }
    if (size < 0) {
        return destResult.reset(errors.InvalidSizeError({
            size: size,
            what: this.model.name
        }), offset, null);
    }

    var list = this.form.create();

    for (var i = 0; i < size; i++) {
        t = valueType.rw.poolReadFrom(destResult, buffer, offset);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        offset = t.offset;
        this.form.add(list, t.value);
    }
    return destResult.reset(null, offset, list);
};

module.exports.ListRW = ListRW;
module.exports.ThriftList = ThriftList;
