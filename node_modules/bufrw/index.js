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

module.exports.fromBuffer = require('./interface').fromBuffer;
module.exports.byteLength = require('./interface').byteLength;
module.exports.toBuffer = require('./interface').toBuffer;
module.exports.intoBuffer = require('./interface').intoBuffer;

module.exports.fromBufferTuple = require('./interface').fromBufferTuple;
module.exports.byteLengthTuple = require('./interface').byteLengthTuple;
module.exports.toBufferTuple = require('./interface').toBufferTuple;
module.exports.intoBufferTuple = require('./interface').intoBufferTuple;

module.exports.fromBufferResult = require('./interface').fromBufferResult;
module.exports.byteLengthResult = require('./interface').byteLengthResult;
module.exports.toBufferResult = require('./interface').toBufferResult;
module.exports.intoBufferResult = require('./interface').intoBufferResult;

module.exports.formatError = require('./interface').formatError;

module.exports.Base = require('./base').BufferRW; // TODO: align names
module.exports.LengthResult = require('./base').LengthResult;
module.exports.WriteResult = require('./base').WriteResult;
module.exports.ReadResult = require('./base').ReadResult;

var atoms = require('./atoms');

module.exports.AtomRW = atoms.AtomRW;
module.exports.Int8 = atoms.Int8;
module.exports.Int16BE = atoms.Int16BE;
module.exports.Int32BE = atoms.Int32BE;
module.exports.Int16LE = atoms.Int16LE;
module.exports.Int32LE = atoms.Int32LE;
module.exports.UInt8 = atoms.UInt8;
module.exports.UInt16BE = atoms.UInt16BE;
module.exports.UInt32BE = atoms.UInt32BE;
module.exports.UInt16LE = atoms.UInt16LE;
module.exports.UInt32LE = atoms.UInt32LE;
module.exports.FloatLE = atoms.FloatLE;
module.exports.FloatBE = atoms.FloatBE;
module.exports.DoubleLE = atoms.DoubleLE;
module.exports.DoubleBE = atoms.DoubleBE;

module.exports.Null = require('./null');
module.exports.FixedWidth = require('./fixed_width_rw');

var VariableBuffer = require('./variable_buffer_rw');
var buf1 = VariableBuffer(atoms.UInt8);
var buf2 = VariableBuffer(atoms.UInt16BE);
module.exports.buf1 = buf1;
module.exports.buf2 = buf2;
module.exports.VariableBuffer = VariableBuffer;

var StringRW = require('./string_rw');
var varint = require('./varint');
var str1 = StringRW(atoms.UInt8, 'utf8');
var str2 = StringRW(atoms.UInt16BE, 'utf8');
var strn = StringRW(varint.unsigned, 'utf8');

module.exports.str1 = str1;
module.exports.str2 = str2;
module.exports.strn = strn;
module.exports.String = StringRW;

module.exports.varint = varint;

module.exports.Series = require('./series');
module.exports.Struct = require('./struct');
module.exports.Switch = require('./switch');
module.exports.Repeat = require('./repeat');
module.exports.Skip = require('./skip');
