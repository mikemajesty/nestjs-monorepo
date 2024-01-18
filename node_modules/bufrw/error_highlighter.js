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

'use strict';

var color = require('ansi-color').set;
var stripColor = require('./lib/strip_color.js');

module.exports = errorHighlighter;

// istanbul ignore next
function errorHighlighter(err, options) {
    options = options || {};
    var errColor = colorer(options.errorColor || 'red+bold');

    var hasOffset = !(err.offset === undefined || err.offset === null);
    var hasEnd = !(err.endOffset === undefined || err.endOffset === null);
    var within = false;

    if (!hasOffset) return null;
    if (hasEnd) {
        return decorateRangedError;
    } else {
        return decorateError;
    }

    function decorateRangedError(totalOffset, screenOffset, str) {
        if (totalOffset === err.offset) {
            within = totalOffset !== err.endOffset-1;
            return errColor(stripColor(str));
        } else if (totalOffset === err.endOffset-1) {
            within = false;
            return errColor(stripColor(str));
        } else if (within) {
            return errColor(stripColor(str));
        } else {
            return str;
        }
    }

    function decorateError(totalOffset, screenOffset, str) {
        if (totalOffset === err.offset) {
            return errColor(stripColor(str));
        } else {
            return str;
        }
    }
}

// istanbul ignore next
function colorer(col) {
    if (typeof col === 'function') return col;
    return function colorIt(str) {
        return color(str, col);
    };
}
