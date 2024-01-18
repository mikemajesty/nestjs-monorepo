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
var bufrw = require('bufrw');
var TYPE = require('./TYPE');
var errors = require('./errors');
var ThriftConst = require('./const').ThriftConst;
var ast = require('./ast');
var inherits = require('util').inherits;

var LengthResult = bufrw.LengthResult;

function ThriftEnum() {
    this.namesToValues = Object.create(null);
    this.valuesToNames = Object.create(null);
    // "Interned" names
    this.namesToNames = Object.create(null);
    this.namesToAnnotations = Object.create(null);
    this.surface = this.namesToNames;
    this.annotations = null;
    this.rw = new EnumRW(this);
    this.linked = false;
}

ThriftEnum.prototype.typeid = TYPE.I32;
ThriftEnum.prototype.models = 'type';

ThriftEnum.prototype.compile = function compile(def, model) {
    this.name = def.id.name;

    var value = 0;
    var enumDefs = def.definitions;
    for (var index = 0; index < enumDefs.length; index++) {
        var enumDef = enumDefs[index];
        var name = enumDef.id.name;
        var valueDef = enumDef.value;
        if (valueDef && valueDef.value !== undefined) {
            value = valueDef.value;
        }

        assert(this.namesToValues[name] === undefined,
            'duplicate name in enum ' + this.name +
            ' at ' + def.id.line + ':' + def.id.column);
        assert(value <= 0x7fffffff,
            'overflow in value in enum ' + this.name +
            ' at ' + def.id.line + ':' + def.id.column);

        var fullName = this.name + '.' + name;
        var constDef = new ast.Const(
            new ast.Identifier(name),
            null, // TODO infer type for default value validation
            new ast.Literal(name)
        );
        var constModel = new ThriftConst(constDef);
        model.consts[fullName] = constModel;
        model.define(fullName, enumDef.id, constModel);
        this.namesToValues[name] = value;
        this.namesToNames[name] = name;
        this.valuesToNames[value] = name;
        this.namesToAnnotations[name] = enumDef.annotations;
        value++;
    }

    this.annotations = def.annotations;
};

ThriftEnum.prototype.link = function link(model) {
    if (this.linked) {
        return this;
    }
    this.linked = true;

    model.enums[this.name] = this.namesToNames;

    // Alias if first character is not lower-case
    // istanbul ignore else
    if (!/^[a-z]/.test(this.name)) {
        model[this.name] = this.surface;
    }

    return this;
};

function EnumRW(model) {
    this.model = model;
    bufrw.Base.call(this);
}

inherits(EnumRW, bufrw.Base);

EnumRW.prototype.lengthResult = new LengthResult(null, bufrw.Int32BE.width);

EnumRW.prototype.poolByteLength = function poolByteLength(destResult) {
    return destResult.reset(null, bufrw.Int32BE.width);
};

EnumRW.prototype.poolWriteInto = function poolWriteInto(destResult, name, buffer, offset) {
    if (typeof name !== 'string') {
        return destResult.reset(errors.InvalidEnumerationTypeError({
            enumName: this.model.name,
            name: name,
            nameType: typeof name
        }), null);
    }
    var value = this.model.namesToValues[name];
    // istanbul ignore if
    if (value === undefined) {
        return destResult.reset(errors.InvalidEnumerationNameError({
            enumName: this.model.name,
            name: name
        }), null);
    }
    return bufrw.Int32BE.poolWriteInto(destResult, value, buffer, offset);
};

EnumRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    var result;
    result = bufrw.Int32BE.poolReadFrom(destResult, buffer, offset);
    // istanbul ignore if
    if (result.err) {
        return result;
    }
    offset = result.offset;
    var value = result.value;
    var name = this.model.valuesToNames[value];
    if (!name) {
        return destResult.reset(errors.InvalidEnumerationValueError({
            enumName: this.model.name,
            value: value
        }), offset, null);
    }
    return destResult.reset(null, offset, name);
};

module.exports.ThriftEnum = ThriftEnum;
