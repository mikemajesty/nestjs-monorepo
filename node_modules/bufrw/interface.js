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

var hex = require('hexer');

var util = require('util');
var Result = require('./result');
var errors = require('./errors');

var AnnotatedBuffer = require('./annotated_buffer');
var errorHighlighter = require('./error_highlighter');

function makeAnnotatedBuffer(buffer, start, clear) {
    // istanbul ignore if
    if (start > 0) buffer = buffer.slice(start);
    // istanbul ignore if
    if (clear) buffer.fill(0);
    return new AnnotatedBuffer(buffer);
}

function annotateError(res1, res2, start, annBuf) {
    // istanbul ignore if
    if (!res2.err ||
        res2.offset !== res1.offset - start ||
        res2.err.type !== res1.err.type ||
        res2.err.message !== res1.err.message) {
        res1.err = errors.UnstableRW(res1.err, {
            otherMessage: res2.err && res2.err.message
        });
    } else {
        res1.err.buffer = annBuf;
    }
}

var emptyBuffer = Buffer.alloc(0);

function fromBuffer(rw, buffer, offset) {
    return fromBufferResult(rw, buffer, offset).toValue();
}

function byteLength(rw, value) {
    return byteLengthResult(rw, value).toValue();
}

function toBuffer(rw, value) {
    return toBufferResult(rw, value).toValue();
}

function intoBuffer(rw, buffer, value) {
    return intoBufferResult(rw, buffer, value).toValue();
}

// The "Tuple" methods are deprecated

/* istanbul ignore next */
function fromBufferTuple(rw, buffer, offset) {
    return fromBufferResult(rw, buffer, offset).toTuple();
}

/* istanbul ignore next */
function byteLengthTuple(rw, value) {
    return byteLengthResult(rw, value).toTuple();
}

/* istanbul ignore next */
function toBufferTuple(rw, value) {
    return toBufferResult(rw, value).toTuple();
}

/* istanbul ignore next */
function intoBufferTuple(rw, buffer, value) {
    return intoBufferResult(rw, buffer, value).toTuple();
}

function checkAllReadFrom(res, buffer) {
    if (!res.err && res.offset !== buffer.length) {
        res.err = errors.ShortRead({
            remaining: buffer.length - res.offset,
            buffer: buffer,
            offset: res.offset
        });
    }
    return res;
}

function genericResult(err, value, buffer, offset) {
    if (err) {
        if (err.offset === undefined) err.offset = offset;
        if (err.buffer === undefined) err.buffer = buffer;
    }
    return new Result(err, value);
}

function fromBufferResult(rw, buffer, offset) {
    var start = offset || 0;
    var res = rw.readFrom(buffer, start);
    res = checkAllReadFrom(res, buffer);
    if (res.err) {
        var annBuf = makeAnnotatedBuffer(buffer, start, false);
        var res2 = rw.readFrom(annBuf, 0);
        res2 = checkAllReadFrom(res2, buffer);
        annotateError(res, res2, start, annBuf);
    }
    return genericResult(res.err, res.value, buffer, res.offset);
}

function byteLengthResult(rw, value) {
    var lenRes = rw.byteLength(value);
    if (lenRes.err) return new Result(lenRes.err, 0);
    else return new Result(null, lenRes.length);
}

function toBufferResult(rw, value) {
    var lenRes = rw.byteLength(value);
    if (lenRes.err) return new Result(lenRes.err, emptyBuffer);
    var length = lenRes.length;
    var buffer = Buffer.alloc(length);
    return intoBufferResult(rw, buffer, value);
}

function checkAllWroteOver(res, buffer) {
    if (!res.err && res.offset !== buffer.length) {
        res.err = errors.ShortWrite({
            remaining: buffer.length - res.offset,
            buffer: buffer,
            offset: res.offset
        });
    }
    return res;
}

function intoBufferResult(rw, buffer, value) {
    var res = rw.writeInto(value, buffer, 0);
    res = checkAllWroteOver(res, buffer);
    return genericResult(res.err, buffer, buffer, res.offset);
}

// istanbul ignore next TODO
function formatError(err, options) {
    options = options || {};
    var name = err.name || err.constructor.name;
    var str = util.format('%s: %s\n', name, err.message);
    if (err.buffer && err.buffer.hexdump) {
        str += err.buffer.hexdump({
            colored: options.color,
            boldStart: false,
            highlight: options.color ? errorHighlighter(err, options) : null
        });
    } else if (Buffer.isBuffer(err.buffer)) {
        if (options.color) {
            str += formatBufferColored(err, options);
        } else {
            str += formatBufferUncolored(err, options);
        }
    }
    return str;
}

// istanbul ignore next TODO
function formatBufferColored(err, options) {
    // istanbul ignore else
    if (!hex) {
        return err.buffer.toString('hex');
    }

    options = options || {};
    var opts = options.hexerOptions ? Object.create(options.hexerOptions) : {};
    if (opts.colored === undefined) {
        opts.colored = true;
    }
    var highlight = errorHighlighter(err, options);
    opts.decorateHexen = highlight;
    opts.decorateHuman = highlight;
    return hex(err.buffer, opts);
}

// istanbul ignore next TODO
function formatBufferUncolored(err, options) {
    // istanbul ignore else
    if (!hex) {
        return err.buffer.toString('hex');
    }

    options = options || {};

    var hasOffset = !(err.offset === undefined || err.offset === null);
    var hasEnd = !(err.endOffset === undefined || err.endOffset === null);
    var markStart = options.markStart || '>';
    var markEnd = options.markEnd || '<';
    var accum = 0;

    var opts = options.hexerOptions ? Object.create(options.hexerOptions) : {};
    if (hasOffset) {
        opts.groupSeparator = '';
        if (hasEnd) {
            opts.decorateHexen = decorateRangedError;
        } else {
            opts.decorateHexen = decorateError;
        }
    }
    return hex(err.buffer, opts);

    // TODO: suspected broken across lines, should either test and complete or
    // use some sort of alternate notation such as interstitial lines
    function decorateRangedError(totalOffset, screenOffset, hexen) {
        var s;
        if (totalOffset === err.offset) {
            accum = 1;
            s = markStart + hexen;
            if (totalOffset === err.endOffset-1) {
                s += markEnd;
                accum = 0;
            } else {
                s = ' ' + s;
            }
            return s;
        } else if (totalOffset === err.endOffset-1) {
            s = hexen + markEnd;
            while (accum-- > 0) s += ' ';
            accum = 0;
            return s;
        } else if (accum) {
            accum += 2;
            return hexen;
        } else {
            return ' ' + hexen + ' ';
        }
    }

    function decorateError(totalOffset, screenOffset, hexen) {
        if (totalOffset === err.offset) {
            return markStart + hexen + markEnd;
        } else {
            return ' ' + hexen + ' ';
        }
    }
}

module.exports.fromBuffer = fromBuffer;
module.exports.byteLength = byteLength;
module.exports.toBuffer = toBuffer;
module.exports.intoBuffer = intoBuffer;
module.exports.formatError = formatError;

module.exports.fromBufferTuple = fromBufferTuple;
module.exports.byteLengthTuple = byteLengthTuple;
module.exports.toBufferTuple = toBufferTuple;
module.exports.intoBufferTuple = intoBufferTuple;

module.exports.fromBufferResult = fromBufferResult;
module.exports.byteLengthResult = byteLengthResult;
module.exports.toBufferResult = toBufferResult;
module.exports.intoBufferResult = intoBufferResult;

module.exports.makeAnnotatedBuffer = makeAnnotatedBuffer;
module.exports.checkAllReadFrom = checkAllReadFrom;
module.exports.annotateError = annotateError;
