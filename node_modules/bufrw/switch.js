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

module.exports = SwitchRW;

var inherits = require('util').inherits;

var BufferRW = require('./base').BufferRW;
var errors = require('./errors');

// TODO: cases should be an es6 map

function SwitchRW(valrw, cases, opts) {
    if (!(this instanceof SwitchRW)) {
        return new SwitchRW(valrw, cases, opts);
    }
    opts = opts || {};
    this.valrw = valrw;
    this.cases = cases;
    this.cons = opts.cons || Pair;
    this.valKey = opts.valKey || '0';
    this.dataKey = opts.dataKey || '1';
    // istanbul ignore if TODO
    if (opts.structMode) {
        this.poolReadFrom = this.structReadFrom;
    }

    BufferRW.call(this);
}
inherits(SwitchRW, BufferRW);

SwitchRW.prototype.poolByteLength = function poolByteLength(destResult, obj) {
    var val = obj[this.valKey];
    var data = obj[this.dataKey];
    var datarw = this.cases[val];
    if (datarw === undefined) {
        return destResult.reset(errors.WriteInvalidSwitchValue({
            value: val
        }));
    }
    this.valrw.poolByteLength(destResult, val);
    if (destResult.err) return destResult;
    var vallen = destResult.length;

    datarw.poolByteLength(destResult, data);
    if (destResult.err) return destResult;
    var caselen = destResult.length;

    return destResult.reset(null, caselen + vallen);
};

SwitchRW.prototype.poolWriteInto = function poolWriteInto(destResult, obj, buffer, offset) {
    var val = obj[this.valKey];
    var data = obj[this.dataKey];
    var datarw = this.cases[val];
    if (datarw === undefined) {
        return destResult.reset(errors.WriteInvalidSwitchValue({
            value: val
        }), offset);
    }
    var res = this.valrw.poolWriteInto(destResult, val, buffer, offset);
    if (res.err) return res;
    res = datarw.poolWriteInto(destResult, data, buffer, res.offset);
    return res;
};

SwitchRW.prototype.poolReadFrom = function poolReadFrom(destResult, buffer, offset) {
    var res = this.valrw.poolReadFrom(destResult, buffer, offset);
    if (res.err) return res;
    offset = res.offset;
    var val = res.value;
    var datarw = this.cases[val];
    if (datarw === undefined) {
        return destResult.reset(errors.ReadInvalidSwitchValue({
            value: val
        }), offset);
    }
    res = datarw.poolReadFrom(destResult, buffer, offset);
    if (res.err) return res;
    offset = res.offset;
    var data = res.value;
    var obj = new this.cons(val, data);
    return destResult.reset(null, offset, obj);
};

// istanbul ignore next TODO
SwitchRW.prototype.poolStructReadFrom = 
function poolStructReadFrom(destResult, obj, buffer, offset) {
    var res = this.valrw.poolReadFrom(destResult, buffer, offset);
    if (res.err) return res;
    offset = res.offset;
    var val = res.value;
    var datarw = this.cases[val];
    if (datarw === undefined) {
        return destResult.reset(errors.ReadInvalidSwitchValue({
            value: val
        }), offset);
    }
    obj[this.valKey] = val;
    res = datarw.poolReadFrom(destResult, buffer, offset);
    if (!res.err) {
        obj[this.dataKey] = res.value;
    }
    return res;
};

function Pair(a, b) {
    Array.call(this);
    this[0] = a;
    this[1] = b;
}
inherits(Pair, Array);

SwitchRW.Pair = Pair;
