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

function ThriftConst(def) {
    this.name = def.id.name;
    this.valueDefinition = def.value;
    this.defined = false;
    this.value = null;
    this.surface = null;
}

ThriftConst.prototype.models = 'value';

ThriftConst.prototype.link = function link(model) {
    if (!this.defined) {
        this.defined = true;
        this.value = model.resolveValue(this.valueDefinition);
        this.surface = this.value;
        model.consts[this.name] = this.value;

        // Alias if first character is not lower-case
        if (!/^[a-z]/.test(this.name)) {
            model[this.name] = this.value;
        }
    }
    return this;
};

module.exports.ThriftConst = ThriftConst;
