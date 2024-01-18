// Copyright (c) 2015 Uber Technologies, Inc.
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

module.exports = StructRW;

var inherits = require('util').inherits;

var ReadResult = require('./base').ReadResult;
var BufferRW = require('./base').BufferRW;
var errors = require('./errors');

function StructRW(cons, fields, opts) {
    if (!(this instanceof StructRW)) {
        return new StructRW(cons, fields);
    }
    if (typeof cons === 'object') {
        fields = cons;
        cons = null;
    }
    var i;
    opts = opts || {};
    this.cons = cons || Object;
    this.fields = [];
    // TODO: useful to have a StructRWField prototype?
    if (Array.isArray(fields)) {
        this.fields.push.apply(this.fields, fields);
    } else {
        var fieldNames = Object.keys(fields);
        for (i = 0; i < fieldNames.length; ++i) {
            var field = {};
            field.name = fieldNames[i];
            field.rw = fields[field.name];
            this.fields.push(field);
        }
    }
    this.namedFields = {};
    for (i = 0; i < this.fields.length; ++i) {
        if (this.fields[i].name) {
            this.namedFields[this.fields[i].name] = this.fields[i];
        }
    }
}
inherits(StructRW, BufferRW);

StructRW.prototype.poolByteLength = function poolByteLength(destResult, obj) {
    var length = 0;
    for (var i = 0; i < this.fields.length; i++) {
        var field = this.fields[i];

        if (field.name && !obj.hasOwnProperty(field.name)) {
            return destResult.reset(errors.MissingStructField({
                field: field.name,
                struct: this.cons.name
            }), null);
        }

        var value = field.name && obj && obj[field.name];
        if (field.call) {
            if (field.call.poolByteLength) {
                field.call.poolByteLength(destResult, obj);
            } else if (field.call.byteLength) {
                var res = field.call.byteLength(obj);
                destResult.copyFrom(res);
            } else {
                continue;
            }
        } else {
            field.rw.poolByteLength(destResult, value);
        }
        if (destResult.err) return destResult;
        length += destResult.length;
    }
    return destResult.reset(null, length);
};

StructRW.prototype.poolWriteInto = function poolWriteInto(destResult, obj, buffer, offset) {
    destResult.reset(null, offset);
    for (var i = 0; i < this.fields.length; i++) {
        var field = this.fields[i];

        if (field.name && !obj.hasOwnProperty(field.name)) {
            return destResult.reset(errors.MissingStructField({
                field: field.name,
                struct: this.cons.name
            }), null);
        }

        var value = field.name && obj[field.name];
        if (field.call) {
            if (field.call.poolWriteInto) {
                field.call.poolWriteInto(destResult, obj, buffer, offset);
            } else if (field.call.writeInto) {
                var res = field.call.writeInto(obj, buffer, offset);
                destResult.copyFrom(res);
            } else {
                continue;
            }
        } else {
            field.rw.poolWriteInto(destResult, value, buffer, offset);
        }
        if (destResult.err) return destResult;
        offset = destResult.offset;
    }
    return destResult;
};

var readRes = new ReadResult();
StructRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    if (typeof destResult.value === 'object' && destResult.value !== null) {
        if (destResult.value.constructor !== this.cons) {
            destResult.value = new this.cons();
        }
    } else {
        destResult.value = new this.cons();
    }
    for (var i = 0; i < this.fields.length; i++) {
        var field = this.fields[i];
        if (field.call) {
            if (field.call.poolReadFrom) {
                field.call.poolReadFrom(readRes, destResult.value, buffer, offset);
            } else if (field.call.readFrom) {
                var res = field.call.readFrom(destResult.value, buffer, offset);
                readRes.copyFrom(res);
            } else {
                continue;
            }
        } else {
            field.rw.poolReadFrom(readRes, buffer, offset);
        }
        if (readRes.err) return destResult.copyFrom(readRes);
        offset = readRes.offset;
        if (field.name) {
            destResult.value[field.name] = readRes.value;
        }
    }
    return destResult.reset(null, offset, destResult.value);
};
