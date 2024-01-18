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
var errors = require('./errors');
var TMapHeaderRW = require('./tmap').TMapRW.prototype.headerRW;
var TListHeaderRW = require('./tlist').TListRW.prototype.headerRW;

var widths = Object.create(null);
widths[TYPE.VOID] = 0;
widths[TYPE.BOOL] = 1;
widths[TYPE.BYTE] = 1;
widths[TYPE.I8] = 1;
widths[TYPE.DOUBLE] = 8;
widths[TYPE.I16] = 2;
widths[TYPE.I32] = 4;
widths[TYPE.I64] = 8;

var skipVar = Object.create(null);
skipVar[TYPE.STRUCT] = skipStruct;
skipVar[TYPE.STRING] = skipString;
skipVar[TYPE.MAP] = skipMap;
skipVar[TYPE.SET] = skipList;
skipVar[TYPE.LIST] = skipList;

function skipField(destResult, buffer, offset) {
    if (offset + 1 > buffer.length) {
        return destResult.reset(bufrwErrors.ShortBuffer({
            expected: offset + 1,
            actual: buffer.length,
            buffer: buffer,
            offset: offset
        }), offset);
    }

    var typeid = buffer.readInt8(offset);
    offset += 1;

    return skipType(destResult, buffer, offset, typeid);
}

function skipType(destResult, buffer, offset, typeid) {
    var result;

    // istanbul ignore else
    if (skipVar[typeid] !== undefined) {
        result = skipVar[typeid](destResult, buffer, offset);
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

    return destResult.reset(null, offset);
}

function skipStruct(destResult, buffer, offset) {
    var result;
    for (;;) {
        // typeid
        // istanbul ignore if
        if (offset + 1 > buffer.length) {
            return destResult.reset(bufrwErrors.ShortBuffer({
                expected: offset + 1,
                actual: buffer.length,
                buffer: buffer,
                offset: offset
            }), offset);
        }
        var typeid = buffer.readInt8(offset);
        offset += 1;

        if (typeid === TYPE.STOP) {
            return destResult.reset(null, offset);
        }

        // id
        // istanbul ignore if
        if (offset + 2 > buffer.length) {
            return destResult.reset(bufrwErrors.ShortBuffer({
                expected: offset + 2,
                actual: buffer.length,
                buffer: buffer,
                offset: offset
            }), offset);
        }
        offset += 2;

        result = skipType(destResult, buffer, offset, typeid);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;
    }
}

function skipString(destResult, buffer, offset) {

    // istanbul ignore if
    if (offset + 4 > buffer.length) {
        return destResult.reset(bufrwErrors.ShortBuffer({
            expected: offset + 4,
            actual: buffer.length,
            buffer: buffer,
            offset: offset
        }), offset);
    }

    var length = buffer.readInt32BE(offset);
    offset += 4;

    // istanbul ignore if
    if (offset + length > buffer.length) {
        return destResult.reset(bufrwErrors.ShortBuffer({
            expected: offset + length,
            actual: buffer.length,
            buffer: buffer,
            offset: offset
        }), offset);
    }
    offset += length;

    return destResult.reset(null, offset);
}

function skipMap(destResult, buffer, offset) {
    var result;

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
        result = skipType(destResult, buffer, offset, ktypeid);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;

        result = skipType(destResult, buffer, offset, vtypeid);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;
    }

    return destResult.reset(null, offset);
}

function skipList(destResult, buffer, offset) {
    var result;

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
        result = skipType(destResult, buffer, offset, vtypeid);
        // istanbul ignore if
        if (result.err) {
            return result;
        }
        offset = result.offset;
    }

    return destResult.reset(null, offset);
}

module.exports.skipField = skipField;
module.exports.skipType = skipType;
