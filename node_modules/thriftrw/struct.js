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

/* eslint max-len:[0, 120] */
/* eslint max-statements:[0, 99] */
/* eslint complexity:[0, 16] */
'use strict';

var assert = require('assert');
var bufrw = require('bufrw');
var RW = require('./rw');
var TYPE = require('./TYPE');
var NAMES = require('./names');
var errors = require('./errors');
var skipType = require('./skip').skipType;
var util = require('util');
var ThriftUnrecognizedException = require('./unrecognized-exception')
    .ThriftUnrecognizedException;

var readType = require('./read').readType;

function ThriftField(def, struct) {
    assert(def.isResult || def.id.value > 0,
        'field identifier must be greater than 0' +
        ' for ' + JSON.stringify(def.name) +
        ' on ' + JSON.stringify(struct.name) +
        ' at ' + def.id.line + ':' + def.id.column
    );
    this.id = def.id.value;
    this.name = def.name;
    this.required = def.required;
    this.optional = def.optional;
    this.valueDefinition = def.valueType;
    this.valueType = null;
    this.defaultValueDefinition = def.defaultValue || struct.defaultValueDefinition;
    this.defaultValue = null;
    this.annotations = def.annotations;
}

ThriftField.prototype.link = function link(model) {
    this.valueType = model.resolve(this.valueDefinition);
    assert(this.valueType, 'value type was defined, as returned by resolve');
};

ThriftField.prototype.linkValue = function linkValue(model) {
    this.defaultValue = model.resolveValue(this.defaultValueDefinition);
};

function ThriftStruct(options) {
    options = options || {};

    this.name = null;
    // Strict mode is on by default. Because we have strict opinions about Thrift.
    this.strict = options.strict !== undefined ? options.strict : true;
    this.defaultValueDefinition = options.defaultValueDefinition;
    // TODO bring in serviceName
    this.fields = [];
    this.fieldNames = [];
    this.fieldsById = {};
    this.fieldsByName = {};
    this.isArgument = null;
    this.isResult = null;
    this.isException = options.isException || false;
    this.Constructor = null;
    this.surface = null;
    this.rw = new this.RW(this);
    this.thrift = null;
    this.linked = false;
    this.annotations = null;
}

ThriftStruct.prototype.name = 'struct';
ThriftStruct.prototype.typeid = TYPE.STRUCT;
ThriftStruct.prototype.RW = StructRW;
ThriftStruct.prototype.isUnion = false;
ThriftStruct.prototype.models = 'type';

ThriftStruct.prototype.toBuffer = function toBuffer(struct) {
    return bufrw.toBuffer(this.rw, struct);
};

ThriftStruct.prototype.toBufferResult = function toBufferResult(struct) {
    return bufrw.toBufferResult(this.rw, struct);
};

ThriftStruct.prototype.fromBuffer = function fromBuffer(buffer, offset) {
    return bufrw.fromBuffer(this.rw, buffer, offset);
};

ThriftStruct.prototype.fromBufferResult = function fromBufferResult(buffer) {
    return bufrw.fromBufferResult(this.rw, buffer);
};

ThriftStruct.prototype.compile = function compile(def, thrift) {
    // Struct names must be valid JavaScript. If the Thrift name is not valid
    // in JavaScript, it can be overridden with the js.name annotation.
    this.name = def.annotations && def.annotations['js.name'] || def.id.name;
    this.fullName = def.id.as || this.name;
    this.isArgument = def.isArgument || false;
    this.isResult = def.isResult || false;
    this.thrift = thrift;
    var fields = def.fields;
    for (var index = 0; index < fields.length; index++) {
        var fieldDef = fields[index];
        var field = new ThriftField(fieldDef, this);

        // Field names must be valid JavaScript. If the Thrift name is not
        // valid in JavaScript, it can be overridden with the js.name
        // annotation.
        field.name = field.annotations && field.annotations['js.name'] || field.name;
        this.fieldsById[field.id] = field;
        this.fieldsByName[field.name] = field;
        this.fieldNames[index] = field.name;
        this.fields.push(field);
    }
    this.annotations = def.annotations;
};

ThriftStruct.prototype.link = function link(model) {
    if (this.linked) {
        return this;
    }
    this.linked = true;

    var index;

    // Link default values first since they're used by the constructor
    for (index = 0; index < this.fields.length; index++) {
        var field = this.fields[index];
        field.linkValue(model);

        // Evidently with Apache Thrift, arguments are always optional,
        // regardless of how they are marked.
        // They are optional in Go by virtue of defaulting to the zero value
        // for their type, and it is not possible to distinguish a missing
        // field from the zero value.
        if (this.isArgument) {
            if (this.thrift.allowOptionalArguments) {
                // Once this flag is enabled, all ThriftRW language
                // implementations agree that fields are optional unless marked
                // required.  If they are marked required, that contract is
                // respected for both inbound and outbound messages.
                if (!field.required && !field.optional && field.defaultValue === undefined) {
                    field.optional = true;
                }
            } else if (field.optional) {
                // Until version 3.4.3, when we introduced the
                // allowOptionalArguments opt-in, all arguments were always
                // required.  RPC handlers were written to depend on all
                // argument fields being implicitly required.
                assert.ok(false, 'no field of an argument struct may be marked ' +
                    'optional including ' + field.name + ' of ' + this.name + '; ' +
                    'consider new Thrift({allowOptionalArguments: true}).');
            } else {
                field.required = true;
            }
        }

        // Validate field
        if (this.strict) {
            assert(
                field.required || field.optional ||
                field.defaultValue !== null && field.defaultValue !== undefined ||
                this.isArgument || this.isResult || this.isUnion,
                'every field must be marked optional, required, or have a default value on ' +
                    this.name + ' including "' + field.name + '" in strict mode'
            );
        }
    }

    this.Constructor = this.createConstructor(this.name, this.fields);
    this.Constructor.rw = this.rw;

    this.Constructor.fromBuffer = this.fromBuffer;
    this.Constructor.fromBufferResult = this.fromBufferResult;

    this.Constructor.toBuffer = this.toBuffer;
    this.Constructor.toBufferResult = this.toBufferResult;

    this.surface = this.Constructor;

    // Link field types later since they may depend on the constructor existing
    // first.
    for (index = 0; index < this.fields.length; index++) {
        this.fields[index].link(model);
    }

    if (this.isUnion) {
        model.unions[this.name] = this.Constructor;
    } else if (this.isException) {
        model.exceptions[this.name] = this.Constructor;
    } else {
        model.structs[this.name] = this.Constructor;
    }

    // Alias if first character is not lower-case
    if (!/^[a-z]/.test(this.name)) {
        model[this.name] = this.Constructor;
    }

    return this;
};

ThriftStruct.prototype.validateStruct = function validateStruct(struct) {
    // Validate required fields
    for (var index = 0; index < this.fields.length; index++) {
        var field = this.fields[index];
        if (!field.required || field.defaultValue != null) {
            continue;
        }
        var value = struct && struct[field.name];
        var available = value !== null && value !== undefined;
        if (!available) {
            return errors.FieldRequiredError({
                name: field.name,
                id: field.id,
                structName: this.name
            });
        }
    }

    return null;
};

// The following methods have alternate implementations for Exception and Union.

ThriftStruct.prototype.createConstructor = function createConstructor(name, fields) {
    var source;
    source = '(function thriftrw_' + name + '(options) {\n';
    for (var index = 0; index < fields.length; index++) {
        var field = fields[index];
        source += '    if (options && typeof options.' + field.name + ' !== "undefined") ' +
            '{ this.' + field.name + ' = options.' + field.name + '; }\n';
        source += '    else { this.' + field.name +
            ' = ' + JSON.stringify(field.defaultValue) + '; }\n';
    }
    source += '})\n';
    // eval is an operator that captures the lexical scope of the calling
    // function and deoptimizes the lexical scope.
    // By using eval in an expression context, it loses this second-class
    // capability and becomes a first-class function.
    // (0, eval) is one way to use eval in an expression context.
    return (0, eval)(source);
};

ThriftStruct.prototype.create = function create() {
    return new this.Constructor();
};

ThriftStruct.prototype.set = function set(struct, key, value) {
    struct[key] = value;
};

ThriftStruct.prototype.finalize = function finalize(struct) {
    return struct;
};

function StructRW(model) {
    assert(model, 'model required');
    this.model = model;

    RW.call(this);
}

util.inherits(StructRW, RW);

StructRW.prototype.poolByteLength = function poolByteLength(destResult, struct) {
    var length = 1; // stop:1
    var result;
    for (var index = 0; index < this.model.fields.length; index++) {
        var field = this.model.fields[index];
        var value = struct && struct[field.name];

        var available = value !== null && value !== undefined;

        if (!available && field.required) {
            return destResult.reset(errors.FieldRequiredError({
                name: field.name,
                id: field.id,
                structName: this.model.name,
                what: struct
            }));
        }
        if (!available) {
            continue;
        }

        // TODO maybe suppress defaultValue on the wire

        // typeid:1
        // field.id:2
        length += 3;

        result = field.valueType.rw.poolByteLength(destResult, value);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        length += result.length;
    }
    return destResult.reset(null, length);
};

StructRW.prototype.poolWriteInto = function poolWriteInto(destResult, struct, buffer, offset) {
    var result;
    for (var index = 0; index < this.model.fields.length; index++) {
        var field = this.model.fields[index];
        var value = struct && struct[field.name];
        var available = value !== null && value !== undefined;

        if (!available && field.required) {
            return destResult.reset(errors.FieldRequiredError({
                name: field.name,
                id: field.id,
                structName: this.model.name,
                what: struct
            }));
        }
        if (!available) {
            continue;
        }

        // TODO maybe suppress defaultValue on the wire

        result = bufrw.Int8.poolWriteInto(destResult, field.valueType.typeid, buffer, offset);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;

        result = bufrw.Int16BE.poolWriteInto(destResult, field.id, buffer, offset);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;

        result = field.valueType.rw.poolWriteInto(destResult, value, buffer, offset);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;
    }

    result = bufrw.Int8.poolWriteInto(destResult, TYPE.STOP, buffer, offset);
    // istanbul ignore if
    if (result.err) {
        return result;
    }
    offset = result.offset;
    return destResult.reset(null, offset);
};

StructRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    var struct = this.model.create();
    var result;

    for (;;) {
        result = bufrw.Int8.poolReadFrom(destResult, buffer, offset);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;
        var typeid = result.value;

        if (typeid === TYPE.STOP) {
            break;
        }

        result = bufrw.Int16BE.poolReadFrom(destResult, buffer, offset);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;
        var id = result.value;

        // keep unrecognized files from the future if it could be an
        // unrecognized exception.
        if (!this.model.fieldsById[id] && this.model.isResult) {
            result = readType(destResult, buffer, offset, typeid);
            // result = skipType(buffer, offset, typeid);
            // istanbul ignore if
            if (result.err) {
                return result;
            }
            offset = result.offset;
            this.model.set(
                struct,
                'failure',
                new ThriftUnrecognizedException(result.value)
            );
            continue;
        }

        // skip unrecognized fields from THE FUTURE
        if (!this.model.fieldsById[id]) {
            result = skipType(destResult, buffer, offset, typeid);
            // istanbul ignore if
            if (result.err) {
                return result;
            }
            offset = result.offset;
            continue;
        }

        var field = this.model.fieldsById[id];
        if (
            field.valueType.typeid !== typeid &&
            field.valueType.altTypeid !== typeid // deprecated, see set.js
        ) {
            return destResult.reset(errors.UnexpectedFieldValueTypeidError({
                fieldId: id,
                fieldName: field.name,
                structName: this.model.name,
                typeid: typeid,
                typeName: NAMES[typeid],
                expectedTypeid: field.valueType.typeid,
                expectedTypeName: NAMES[field.valueType.typeid]
            }), offset);
        }

        result = field.valueType.rw.poolReadFrom(destResult, buffer, offset);
        // istanbul ignore if
        if (result.err) {
            return destResult.reset(result.err, offset);
        }
        offset = result.offset;
        // TODO promote return error of set to a ReadResult error
        this.model.set(struct, field.name, result.value);
    }

    // Validate required fields
    var err = this.model.validateStruct(struct);
    if (err) {
        return destResult.reset(err, offset);
    }

    return destResult.reset(null, offset, this.model.finalize(struct));
};

module.exports.ThriftField = ThriftField;
module.exports.ThriftStruct = ThriftStruct;
module.exports.StructRW = StructRW;
