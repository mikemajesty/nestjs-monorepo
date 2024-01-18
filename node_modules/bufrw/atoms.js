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

var inherits = require('util').inherits;

var WriteResult = require('./base').WriteResult;
var ReadResult = require('./base').ReadResult;
var BufferRW = require('./base').BufferRW;
var errors = require('./errors');

function AtomRW(width, readAtomFrom, writeAtomInto) {
    if (!(this instanceof AtomRW)) {
        return new AtomRW(width, readAtomFrom, writeAtomInto);
    }
    this.width = width;
    this.readAtomFrom = readAtomFrom;
    this.writeAtomInto = writeAtomInto;
    BufferRW.call(this);
}
inherits(AtomRW, BufferRW);

AtomRW.prototype.poolByteLength = function byteLength(destResult) {
    return destResult.reset(null, this.width);
};

AtomRW.prototype.poolReadFrom = function readFrom(destResult, buffer, offset) {
    var remain = buffer.length - offset;
    if (remain < this.width) {
        return ReadResult.poolShortError(destResult, this.width, remain, offset);
    }
    return this.readAtomFrom(destResult, buffer, offset);
};

AtomRW.prototype.poolWriteInto = function writeInto(destResult, value, buffer, offset) {
    var remain = buffer.length - offset;
    // istanbul ignore next
    if (remain < this.width) {
        WriteResult.poolShortError(destResult, this.width, remain, offset);
    }
    return this.writeAtomInto(destResult, value, buffer, offset);
};

// jshint maxparams:5
function IntegerRW(width, min, max, readAtomFrom, writeAtomInto) {
    if (!(this instanceof IntegerRW)) {
        return new IntegerRW(width, min, max, readAtomFrom, writeAtomInto);
    }
    AtomRW.call(this, width, readAtomFrom, writeAtomInto);
    this.min = min;
    this.max = max;
}
inherits(IntegerRW, AtomRW);

IntegerRW.prototype.poolWriteInto = function poolWriteInto(destResult, value, buffer, offset) {
    if (typeof value !== 'number') {
        return destResult.reset(errors.expected(value, 'a number'));
    }
    if (value < this.min || value > this.max) {
        return destResult.reset(errors.RangeError({
            value: value,
            min: this.min,
            max: this.max
        }), offset);
    }
    var remain = buffer.length - offset;
    if (remain < this.width) {
        return WriteResult.poolShortError(destResult, this.width, remain, offset);
    }
    return this.writeAtomInto(destResult, value, buffer, offset);
};

var Int8 = IntegerRW(1, -0x80, 0x7f,
    function readInt8From(destResult, buffer, offset) {
        var value = buffer.readInt8(offset, true);
        return destResult.reset(null, offset + 1, value);
    },
    function writeInt8Into(destResult, value, buffer, offset) {
        buffer.writeInt8(value, offset, true);
        return destResult.reset(null, offset + 1);
    });

var Int16BE = IntegerRW(2, -0x8000, 0x7fff,
    function readInt16BEFrom(destResult, buffer, offset) {
        var value = buffer.readInt16BE(offset, true);
        return destResult.reset(null, offset + 2, value);
    },
    function writeInt16BEInto(destResult, value, buffer, offset) {
        buffer.writeInt16BE(value, offset, true);
        return destResult.reset(null, offset + 2);
    });

var Int32BE = IntegerRW(4, -0x80000000, 0x7fffffff,
    function readInt32BEFrom(destResult, buffer, offset) {
        var value = buffer.readInt32BE(offset, true);
        return destResult.reset(null, offset + 4, value);
    },
    function writeInt32BEInto(destResult, value, buffer, offset) {
        buffer.writeInt32BE(value, offset, true);
        return destResult.reset(null, offset + 4);
    });

var Int16LE = IntegerRW(2, -0x8000, 0x7fff,
    function readInt16LEFrom(destResult, buffer, offset) {
        var value = buffer.readInt16LE(offset, true);
        return destResult.reset(null, offset + 2, value);
    },
    function writeInt16LEInto(destResult, value, buffer, offset) {
        buffer.writeInt16LE(value, offset, true);
        return destResult.reset(null, offset + 2);
    });

var Int32LE = IntegerRW(4, -0x80000000, 0x7fffffff,
    function readInt32LEFrom(destResult, buffer, offset) {
        var value = buffer.readInt32LE(offset, true);
        return destResult.reset(null, offset + 4, value);
    },
    function writeInt32LEInto(destResult, value, buffer, offset) {
        buffer.writeInt32LE(value, offset, true);
        return destResult.reset(null, offset + 4);
    });

var UInt8 = IntegerRW(1, 0, 0xff,
    function readUInt8From(destResult, buffer, offset) {
        var value = buffer.readUInt8(offset, true);
        return destResult.reset(null, offset + 1, value);
    },
    function writeUInt8Into(destResult, value, buffer, offset) {
        buffer.writeUInt8(value, offset, true);
        return destResult.reset(null, offset + 1);
    });

var UInt16BE = IntegerRW(2, 0, 0xffff,
    function readUInt16BEFrom(destResult, buffer, offset) {
        var value = buffer.readUInt16BE(offset, true);
        return destResult.reset(null, offset + 2, value);
    },
    function writeUInt16BEInto(destResult, value, buffer, offset) {
        buffer.writeUInt16BE(value, offset, true);
        return destResult.reset(null, offset + 2);
    });

var UInt32BE = IntegerRW(4, 0, 0xffffffff,
    function readUInt32BEFrom(destResult, buffer, offset) {
        var value = buffer.readUInt32BE(offset, true);
        return destResult.reset(null, offset + 4, value);
    },
    function writeUInt32BEInto(destResult, value, buffer, offset) {
        buffer.writeUInt32BE(value, offset, true);
        return destResult.reset(null, offset + 4);
    });

var UInt16LE = IntegerRW(2, 0, 0xffff,
    function readUInt16LEFrom(destResult, buffer, offset) {
        var value = buffer.readUInt16LE(offset, true);
        return destResult.reset(null, offset + 2, value);
    },
    function writeUInt16LEInto(destResult, value, buffer, offset) {
        buffer.writeUInt16LE(value, offset, true);
        return destResult.reset(null, offset + 2);
    });

var UInt32LE = IntegerRW(4, 0, 0xffffffff,
    function readUInt32LEFrom(destResult, buffer, offset) {
        var value = buffer.readUInt32LE(offset, true);
        return destResult.reset(null, offset + 4, value);
    },
    function writeUInt32LEInto(destResult, value, buffer, offset) {
        buffer.writeUInt32LE(value, offset, true);
        return destResult.reset(null, offset + 4);
    });

var FloatLE = AtomRW(4,
    function readFloatLEFrom(destResult, buffer, offset) {
        var value = buffer.readFloatLE(offset, true);
        return destResult.reset(null, offset + 4, value);
    },
    function writeFloatLEInto(destResult, value, buffer, offset) {
        // istanbul ignore if
        if (typeof value !== 'number') {
            return destResult.reset(errors.expected(value, 'a number'), null);
        } else {
            buffer.writeFloatLE(value, offset);
            return destResult.reset(null, offset + 4);
        }
    });

var FloatBE = AtomRW(4,
    function readFloatBEFrom(destResult, buffer, offset) {
        var value = buffer.readFloatBE(offset, true);
        return destResult.reset(null, offset + 4, value);
    },
    function writeFloatBEInto(destResult, value, buffer, offset) {
        // istanbul ignore if
        if (typeof value !== 'number') {
            return destResult.reset(errors.expected(value, 'a number'), null);
        } else {
            buffer.writeFloatBE(value, offset);
            return destResult.reset(null, offset + 4);
        }
    });

var DoubleLE = AtomRW(8,
    function readDoubleLEFrom(destResult, buffer, offset) {
        var value = buffer.readDoubleLE(offset, true);
        return destResult.reset(null, offset + 8, value);
    },
    function writeDoubleLEInto(destResult, value, buffer, offset) {
        // istanbul ignore if
        if (typeof value !== 'number') {
            return destResult.reset(errors.expected(value, 'a number'), null);
        } else {
            buffer.writeDoubleLE(value, offset);
            return destResult.reset(null, offset + 8);
        }
    });

var DoubleBE = AtomRW(8,
    function readDoubleBEFrom(destResult, buffer, offset) {
        var value = buffer.readDoubleBE(offset, true);
        return destResult.reset(null, offset + 8, value);
    },
    function writeDoubleBEInto(destResult, value, buffer, offset) {
        // istanbul ignore if
        if (typeof value !== 'number') {
            return destResult.reset(errors.expected(value, 'a number'), null);
        } else {
            buffer.writeDoubleBE(value, offset);
            return destResult.reset(null, offset + 8);
        }
    });

module.exports.AtomRW = AtomRW;
module.exports.Int8 = Int8;
module.exports.Int16BE = Int16BE;
module.exports.Int32BE = Int32BE;
module.exports.Int16LE = Int16LE;
module.exports.Int32LE = Int32LE;
module.exports.UInt8 = UInt8;
module.exports.UInt16BE = UInt16BE;
module.exports.UInt32BE = UInt32BE;
module.exports.UInt16LE = UInt16LE;
module.exports.UInt32LE = UInt32LE;
module.exports.FloatLE = FloatLE;
module.exports.FloatBE = FloatBE;
module.exports.DoubleLE = DoubleLE;
module.exports.DoubleBE = DoubleBE;
