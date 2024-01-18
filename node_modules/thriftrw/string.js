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

var bufrw = require('bufrw');
var TYPE = require('./TYPE');

var StringRW = new bufrw.String(bufrw.Int32BE, 'utf-8');

function ThriftString(annotations) {
    // This is where we would decide which RW to use if there is an annotation
    // for an alternative to utf-8.
    this.annotations = annotations;
}

ThriftString.prototype.rw = StringRW;
ThriftString.prototype.name = 'string';
ThriftString.prototype.typeid = TYPE.STRING;
ThriftString.prototype.surface = String;
ThriftString.prototype.models = 'type';

module.exports.StringRW = StringRW;
module.exports.ThriftString = ThriftString;
