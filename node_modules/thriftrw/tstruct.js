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

/* eslint max-statements:[0, 99] */
'use strict';

var bufrw = require('bufrw');
var TYPE = require('./TYPE');
var inherits = require('util').inherits;
var errors = require('./errors');

function TField(typeid, id, val) {
    if (!(this instanceof TField)) {
        return new TField(typeid, id, val);
    }
    this.typeid = typeid;
    this.id = id;
    this.val = val;
}

function TStruct(fields) {
    if (!(this instanceof TStruct)) {
        return new TStruct(fields);
    }
    this.fields = fields || [];
}

function TStructRW(opts) {
    if (!(this instanceof TStructRW)) {
        return new TStructRW(opts);
    }
    this.ttypes = opts.ttypes;
}
inherits(TStructRW, bufrw.Base);

TStructRW.prototype.poolByteLength = function poolByteLength(destResult, struct) {
    var length = 1; // STOP byte
    var t;
    for (var i = 0; i < struct.fields.length; i++) {
        var field = struct.fields[i];
        var type = this.ttypes[field.typeid];
        if (!type) {
            return destResult.reset(errors.InvalidTypeidError({
                typeid: field.typeid, what: 'field::type'
            }));
        }

        length += 3; // field header length

        t = type.poolByteLength(destResult, field.val);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        length += t.length;
    }
    return destResult.reset(null, length);
};

TStructRW.prototype.poolWriteInto = function poolWriteInto(destResult, struct, buffer, offset) {
    var t;
    for (var i = 0; i < struct.fields.length; i++) {
        var field = struct.fields[i];
        var type = this.ttypes[field.typeid];
        if (!type) {
            return destResult.reset(errors.InvalidTypeidError({
                typeid: field.typeid, what: 'field::type'
            }));
        }

        t = bufrw.Int8.poolWriteInto(destResult, field.typeid, buffer, offset);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        offset = t.offset;

        t = bufrw.Int16BE.poolWriteInto(destResult, field.id, buffer, offset);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        offset = t.offset;

        t = type.poolWriteInto(destResult, field.val, buffer, offset);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        offset = t.offset;
    }
    t = bufrw.Int8.poolWriteInto(destResult, TYPE.STOP, buffer, offset);
    // istanbul ignore if
    if (t.err) {
        return t;
    }
    offset = t.offset;
    return destResult.reset(null, offset);
};

TStructRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    /* eslint no-constant-condition:[0] */
    var struct = new TStruct();
    var t;
    while (true) {
        t = bufrw.Int8.poolReadFrom(destResult, buffer, offset);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        offset = t.offset;
        var typeid = t.value;
        if (typeid === TYPE.STOP) {
            break;
        }
        var type = this.ttypes[typeid];
        if (!type) {
            return destResult.reset(errors.InvalidTypeidError({
                typeid: typeid,
                what: 'field::type'
            }), offset);
        }

        t = bufrw.Int16BE.readFrom(buffer, offset);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        offset = t.offset;
        var id = t.value;

        t = type.poolReadFrom(destResult, buffer, offset);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        offset = t.offset;
        var val = t.value;
        struct.fields.push(TField(typeid, id, val));
    }
    return destResult.reset(null, offset, struct);
};

module.exports.TStruct = TStruct;
module.exports.TField = TField;
module.exports.TStructRW = TStructRW;
