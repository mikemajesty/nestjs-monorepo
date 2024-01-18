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

var TYPE = require('./TYPE');
var bufrw = require('bufrw');
var tmap = require('./tmap');
var tlist = require('./tlist');
var tstruct = require('./tstruct');

module.exports.TYPE = TYPE;

var ttypes = Object.create(null);
ttypes[TYPE.BOOL] = bufrw.Int8;
ttypes[TYPE.BYTE] = bufrw.Int8;
ttypes[TYPE.DOUBLE] = bufrw.DoubleBE;
ttypes[TYPE.I16] = bufrw.Int16BE;
ttypes[TYPE.I32] = bufrw.Int32BE;
ttypes[TYPE.I64] = bufrw.FixedWidth(8);
ttypes[TYPE.STRING] = bufrw.VariableBuffer(bufrw.Int32BE);
ttypes[TYPE.MAP] = tmap.TMapRW({ttypes: ttypes});
ttypes[TYPE.LIST] = tlist.TListRW({ttypes: ttypes});
ttypes[TYPE.SET] = tlist.TListRW({ttypes: ttypes});
ttypes[TYPE.STRUCT] = tstruct.TStructRW({ttypes: ttypes});

module.exports.TPair = tmap.TPair;
module.exports.TMap = tmap.TMap;
module.exports.TMapRW = ttypes[TYPE.MAP];

module.exports.TList = tlist.TList;
module.exports.TListRW = ttypes[TYPE.LIST];

module.exports.TField = tstruct.TField;
module.exports.TStruct = tstruct.TStruct;
module.exports.TStructRW = ttypes[TYPE.STRUCT];

module.exports.BinaryRW = require('./binary').BinaryRW;
module.exports.ThriftBinary = require('./binary').ThriftBinary;

module.exports.BooleanRW = require('./boolean').BooleanRW;
module.exports.ThriftBoolean = require('./boolean').ThriftBoolean;

module.exports.ByteRW = require('./byte').ByteRW;
module.exports.ThriftByte = require('./byte').ThriftByte;

module.exports.DoubleRW = require('./double').DoubleRW;
module.exports.ThriftDouble = require('./double').ThriftDouble;

module.exports.I8RW = require('./i8').I8RW;
module.exports.ThriftI8 = require('./i8').ThriftI8;

module.exports.I16RW = require('./i16').I16RW;
module.exports.ThriftI16 = require('./i16').ThriftI16;

module.exports.I32RW = require('./i32').I32RW;
module.exports.ThriftI32 = require('./i32').ThriftI32;

module.exports.I64RW = require('./i64').I64RW;
module.exports.ThriftI64 = require('./i64').ThriftI64;

module.exports.ListRW = require('./list').ListRW;
module.exports.ThriftList = require('./list').ThriftList;
module.exports.ThriftSet = require('./set').ThriftSet;

module.exports.MapObjectRW = require('./map-object').MapObjectRW;
module.exports.MapEntriesRW = require('./map-entries').MapEntriesRW;

module.exports.StringRW = require('./string').StringRW;
module.exports.ThriftString = require('./string').ThriftString;

module.exports.VoidRW = require('./void').VoidRW;
module.exports.ThriftVoid = require('./void').ThriftVoid;

module.exports.Thrift = require('./thrift').Thrift;
