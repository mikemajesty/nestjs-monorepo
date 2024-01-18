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
var MapObjectRW = require('./map-object').MapObjectRW;
var MapEntriesRW = require('./map-entries').MapEntriesRW;
var errors = require('./errors');

function ThriftMap(keyType, valueType, annotations) {
    this.rw = null;
    this.surface = null;

    var type = annotations['js.type'] || 'object';

    if (type === 'object') {
        this.rw = new MapObjectRW(keyType, valueType);
        this.surface = Object;
    } else if (type === 'entries') {
        this.rw = new MapEntriesRW(keyType, valueType);
        this.surface = Array;
    } else {
        throw errors.UnexpectedMapTypeAnnotation({
            mapType: type
        });
    }

    this.annotations = annotations;
}

ThriftMap.prototype.name = 'map';
ThriftMap.prototype.typeid = TYPE.MAP;
ThriftMap.prototype.models = 'type';

module.exports.ThriftMap = ThriftMap;
