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
'use strict';

var bufrw = require('bufrw');
var inherits = require('util').inherits;
var errors = require('./errors');

function TPair(key, val) {
    if (!(this instanceof TPair)) {
        return new TPair(key, val);
    }
    this.key = key;
    this.val = val;
}

function TMap(ktypeid, vtypeid, pairs) {
    if (!(this instanceof TMap)) {
        return new TMap(ktypeid, vtypeid, pairs);
    }
    this.ktypeid = ktypeid;
    this.vtypeid = vtypeid;
    this.pairs = pairs || [];
}

function TMapRW(opts) {
    if (!(this instanceof TMapRW)) {
        return new TMapRW(opts);
    }
    this.ttypes = opts.ttypes;

    bufrw.Base.call(this);
}
inherits(TMapRW, bufrw.Base);

TMapRW.prototype.headerRW = bufrw.Series([bufrw.Int8, bufrw.Int8, bufrw.Int32BE]);

TMapRW.prototype.poolByteLength = function poolByteLength(destResult, map) {
    var ktype = this.ttypes[map.ktypeid];
    if (!ktype) {
        return destResult.reset(errors.InvalidTypeidError({
            what: 'map::ktype',
            typeid: map.ktypeid
        }));
    }
    var vtype = this.ttypes[map.vtypeid];
    if (!vtype) {
        return destResult.reset(errors.InvalidTypeidError({
            what: 'map::vtype',
            typeid: map.vtypeid
        }));
    }

    var length = 6; // header length
    var t;
    for (var i = 0; i < map.pairs.length; i++) {
        var pair = map.pairs[i];

        t = ktype.poolByteLength(destResult, pair.key);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        length += t.length;

        t = vtype.poolByteLength(destResult, pair.val);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        length += t.length;
    }
    return destResult.reset(null, length);
};

TMapRW.prototype.poolWriteInto = function poolWriteInto(destResult, map, buffer, offset) {
    var ktype = this.ttypes[map.ktypeid];
    if (!ktype) {
        return destResult.reset(errors.InvalidTypeidError({
            what: 'map::ktype',
            typeid: map.ktypeid
        }));
    }
    var vtype = this.ttypes[map.vtypeid];
    if (!vtype) {
        return destResult.reset(errors.InvalidTypeidError({
            what: 'map::vtype',
            typeid: map.vtypeid
        }));
    }

    var t = this.headerRW.poolWriteInto(destResult,
        [map.ktypeid, map.vtypeid, map.pairs.length], buffer, offset);
    // istanbul ignore if
    if (t.err) {
        return t;
    }
    offset = t.offset;

    for (var i = 0; i < map.pairs.length; i++) {
        var pair = map.pairs[i];

        t = ktype.poolWriteInto(destResult, pair.key, buffer, offset);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        offset = t.offset;

        t = vtype.poolWriteInto(destResult, pair.val, buffer, offset);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        offset = t.offset;
    }
    return destResult.reset(null, offset);
};

TMapRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    var t = this.headerRW.poolReadFrom(destResult, buffer, offset);
    // istanbul ignore if
    if (t.err) {
        return t;
    }
    offset = t.offset;
    var ktypeid = t.value[0];
    var vtypeid = t.value[1];
    var size = t.value[2];
    if (size < 0) {
        return destResult.reset(errors.InvalidSizeError({
            size: size,
            what: 'map::size'
        }), offset);
    }

    var map = new TMap(ktypeid, vtypeid);
    var ktype = this.ttypes[map.ktypeid];
    if (!ktype) {
        return destResult.reset(errors.InvalidTypeidError({
            what: 'map::ktype',
            typeid: map.ktypeid
        }), offset);
    }
    var vtype = this.ttypes[map.vtypeid];
    if (!vtype) {
        return destResult.reset(errors.InvalidTypeidError({
            what: 'map::vtype',
            typeid: map.vtypeid
        }), offset);
    }

    for (var i = 0; i < size; i++) {
        t = ktype.poolReadFrom(destResult, buffer, offset);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        offset = t.offset;
        var key = t.value;

        t = vtype.poolReadFrom(destResult, buffer, offset);
        // istanbul ignore if
        if (t.err) {
            return t;
        }
        offset = t.offset;
        var val = t.value;

        map.pairs.push(TPair(key, val));
    }
    return destResult.reset(null, offset, map);
};

module.exports.TPair = TPair;
module.exports.TMap = TMap;
module.exports.TMapRW = TMapRW;
