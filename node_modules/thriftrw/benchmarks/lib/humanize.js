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

//          400ms
//         1.76ms
var pad = '      ';

function humanizeNs(time) {
    var unit = 'ns';
    if (time > 1000) {
        time /= 1000;
        unit = 'µs';
    }
    if (time > 1000) {
        time /= 1000;
        unit = 'ms';
    }
    if (time > 1000) {
        time /= 1000;
        unit = 's ';
    }
    var precision;
    if (time < 10) {
        precision = 2;
    } else if (time < 100) {
        precision = 1;
    } else {
        precision = 0;
    }
    var human = time.toFixed(precision) + unit;
    return pad.slice(0, pad.length - human.length) + human;
}

module.exports.ns = humanizeNs;
