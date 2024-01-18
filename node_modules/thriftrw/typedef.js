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

function ThriftTypedef() {
    this.name = null;
    this.valueDefinition = null;
    this.to = null;
    this.rw = null;
    this.annotations = null;
}

ThriftTypedef.prototype.models = 'type';

ThriftTypedef.prototype.compile = function compile(def, model) {
    this.name = def.id.name;
    this.valueDefinition = def.valueType;
    this.annotations = def.annotations;
};

ThriftTypedef.prototype.link = function link(model) {
    if (!this.to) {
        this.to = model.resolve(this.valueDefinition);
    }
    this.rw = this.to.rw;
    model.typedefs[this.name] = this.to.surface;
    return this.to;
};

module.exports.ThriftTypedef = ThriftTypedef;
