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

var util = require('util');
var ThriftStruct = require('./struct').ThriftStruct;

function ThriftUnion(options) {
    ThriftStruct.call(this, options);
}

util.inherits(ThriftUnion, ThriftStruct);

ThriftUnion.prototype.isUnion = true;
ThriftUnion.prototype.models = 'type';

ThriftUnion.prototype.createConstructor = function createConstructor(name, fields) {
    function Union(options) {
        this.type = null;
        if (typeof options !== 'object') {
            return;
        }
        for (var type in options) {
            // istanbul ignore else
            if (
                hasOwnProperty.call(options, type) &&
                options[type] !== null
            ) {
                this.type = type;
                this[type] = options[type];
            }
            // TODO assert no further names
        }
    }

    return Union;
};

ThriftUnion.prototype.set = function set(union, key, value) {
    // TODO return error if multiple values
    union.type = key;
    union[key] = value;
};

module.exports.ThriftUnion = ThriftUnion;
