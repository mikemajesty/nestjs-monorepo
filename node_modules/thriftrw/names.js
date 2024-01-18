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

var tnames = Object.create(null);
tnames[TYPE.BOOL] = 'BOOL';
tnames[TYPE.VOID] = 'VOID';
tnames[TYPE.BYTE] = 'BYTE';
tnames[TYPE.DOUBLE] = 'DOUBLE';
tnames[TYPE.I16] = 'I16';
tnames[TYPE.I32] = 'I32';
tnames[TYPE.I64] = 'I64';
tnames[TYPE.STRING] = 'STRING';
tnames[TYPE.MAP] = 'MAP';
tnames[TYPE.LIST] = 'LIST';
tnames[TYPE.SET] = 'SET';
tnames[TYPE.STRUCT] = 'STRUCT';

module.exports = tnames;
