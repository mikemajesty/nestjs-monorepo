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

var TYPE = require('./TYPE');
var bufrwErrors = require('bufrw/errors');
var bufrw = require('bufrw');
var errors = require('./errors');
var TMapHeaderRW = require('./tmap').TMapRW.prototype.headerRW;
var TListHeaderRW = require('./tlist').TListRW.prototype.headerRW;
var StringRW = require('./string').StringRW;
var BooleanRW = require('./boolean').BooleanRW;

var widths = Object.create(null);
widths[TYPE.VOID] = 0;

var readVar = Object.create(null);
readVar[TYPE.BOOL] = readBool;
readVar[TYPE.BYTE] = readI8;
readVar[TYPE.DOUBLE] = readDouble;
readVar[TYPE.I8] = readI8;
readVar[TYPE.I16] = readI16;
readVar[TYPE.I32] = readI32;
readVar[TYPE.I64] = readI64;
readVar[TYPE.STRING] = readString;
readVar[TYPE.STRUCT] = readStruct;
readVar[TYPE.MAP] = readMap;
readVar[TYPE.SET] = readList;
readVar[TYPE.LIST] = readList;

function readType(destResult, buffer, offset, typeid) {
    var result;

    // istanbul ignore else
    if (readVar[typeid] !== undefined) {
        result = readVar[typeid](destResult, buffer, offset);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;

    } else if (widths[typeid] !== undefined) {
        var length = widths[typeid];
        if (offset + length > buffer.length) {
            return destResult.reset(bufrwErrors.ShortBuffer({
                expected: offset + length,
                actual: buffer.length,
                buffer: buffer,
                offset: offset
            }), offset);
        }
        offset += length;

    } else {
        return destResult.reset(errors.InvalidTypeidError({
            typeid: typeid,
            what: 'field::type'
        }), offset);
    }

    return destResult.reset(null, offset, result && result.value);
}

function readBool(destResult, buffer, offset) {
    return BooleanRW.poolReadFrom(destResult, buffer, offset);
}

function readDouble(destResult, buffer, offset) {
    return bufrw.DoubleBE.poolReadFrom(destResult, buffer, offset);
}

function readI8(destResult, buffer, offset) {
    return bufrw.Int8.poolReadFrom(destResult, buffer, offset);
}

function readI16(destResult, buffer, offset) {
    return bufrw.Int16BE.poolReadFrom(destResult, buffer, offset);
}

function readI32(destResult, buffer, offset) {
    return bufrw.Int32BE.poolReadFrom(destResult, buffer, offset);
}

var fix8 = bufrw.FixedWidth(8);
function readI64(destResult, buffer, offset) {
    return fix8.poolReadFrom(destResult, buffer, offset);
}

function readString(destResult, buffer, offset) {
    return StringRW.poolReadFrom(destResult, buffer, offset);
}

function readStruct(destResult, buffer, offset) {
    var result;
    var struct = {};
    for (;;) {
        result = bufrw.Int8.poolReadFrom(destResult, buffer, offset);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;
        var typeid = result.value;

        if (typeid === TYPE.STOP) {
            return destResult.reset(null, offset, struct);
        }

        result = bufrw.Int16BE.poolReadFrom(destResult, buffer, offset);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;
        var id = result.value;

        result = readType(destResult, buffer, offset, typeid);
        struct[id] = result.value;
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;
    }
}

function readMap(destResult, buffer, offset) {
    var result;
    var map = {};
    var key;

    // map headers
    result = TMapHeaderRW.poolReadFrom(destResult, buffer, offset);
    // istanbul ignore if
    if (result.err) {
        return result;
    }
    offset = result.offset;

    var header = result.value;
    var ktypeid = header[0];
    var vtypeid = header[1];
    var length = header[2];

    // each entry
    for (var index = 0; index < length; index++) {
        result = readType(destResult, buffer, offset, ktypeid);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;
        key = result.value;

        result = readType(destResult, buffer, offset, vtypeid);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;
        map[key] = result.value;
    }

    return destResult.reset(null, offset, map);
}

function readList(destResult, buffer, offset) {
    var result;
    var list = [];
    // list/set headers
    result = TListHeaderRW.poolReadFrom(destResult, buffer, offset);
    // istanbul ignore if
    if (result.err) {
        return result;
    }
    offset = result.offset;

    var header = result.value;
    var vtypeid = header[0];
    var length = header[1];

    // each value
    for (var index = 0; index < length; index++) {
        result = readType(destResult, buffer, offset, vtypeid);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;
        list.push(result.value);
    }

    return destResult.reset(null, offset, list);
}

module.exports.readType = readType;
