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

var color = require('ansi-color').set;
var stripColor = require('./lib/strip_color.js');
var extend = require('xtend');
var inspect = require('util').inspect;

function AnnotatedBuffer(buffer) {
    this.buffer = buffer;
    this.annotations = [];
}

Object.defineProperty(AnnotatedBuffer.prototype, 'length', {
    enumerable: true,
    get: function getLength() {
        return this.buffer.length;
    }
});

// -- strings

AnnotatedBuffer.prototype.toString = function toString(encoding, start, end) {
    var value = this.buffer.toString(encoding, start, end);
    this.annotations.push({
        kind: 'read',
        name: 'string',
        value: value,
        encoding: encoding,
        start: start,
        end: end
    });
    return value;
};

// -- bytes

// istanbul ignore next
AnnotatedBuffer.prototype.copy = function copy(targetBuffer, targetStart, sourceStart, sourceEnd) {
    var copied = this.buffer.copy(targetBuffer, targetStart, sourceStart, sourceEnd);
    // istanbul ignore next
    var start = sourceStart || 0;
    var end = sourceEnd || start + copied;
    this.annotations.push({
        kind: 'read',
        name: 'copy',
        value: this.buffer.slice(start, end),
        start: start,
        end: end
    });
    return copied;
};

// istanbul ignore next
AnnotatedBuffer.prototype.slice = function slice(start, end) {
    var value = this.buffer.slice(start, end);
    this.annotations.push({
        kind: 'read',
        name: 'slice',
        value: value,
        start: start,
        end: end
    });
    return value;
};

// -- atom readers

// istanbul ignore next
AnnotatedBuffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    var value = this.buffer.readInt8(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'Int8',
        value: value,
        start: offset,
        end: offset + 1
    });
    return value;
};

AnnotatedBuffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    var value = this.buffer.readUInt8(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'UInt8',
        value: value,
        start: offset,
        end: offset + 1
    });
    return value;
};

// istanbul ignore next
AnnotatedBuffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    var value = this.buffer.readUInt16LE(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'UInt16LE',
        value: value,
        start: offset,
        end: offset + 2
    });
    return value;
};

AnnotatedBuffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    var value = this.buffer.readUInt16BE(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'UInt16BE',
        value: value,
        start: offset,
        end: offset + 2
    });
    return value;
};

// istanbul ignore next
AnnotatedBuffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    var value = this.buffer.readUInt32LE(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'UInt32LE',
        value: value,
        start: offset,
        end: offset + 4
    });
    return value;
};

// istanbul ignore next
AnnotatedBuffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    var value = this.buffer.readUInt32BE(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'UInt32BE',
        value: value,
        start: offset,
        end: offset + 4
    });
    return value;
};

// istanbul ignore next
AnnotatedBuffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    var value = this.buffer.readInt16LE(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'Int16LE',
        value: value,
        start: offset,
        end: offset + 2
    });
    return value;
};

// istanbul ignore next
AnnotatedBuffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    var value = this.buffer.readInt16BE(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'Int16BE',
        value: value,
        start: offset,
        end: offset + 2
    });
    return value;
};

// istanbul ignore next
AnnotatedBuffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    var value = this.buffer.readInt32LE(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'Int32LE',
        value: value,
        start: offset,
        end: offset + 4
    });
    return value;
};

// istanbul ignore next
AnnotatedBuffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    var value = this.buffer.readInt32BE(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'Int32BE',
        value: value,
        start: offset,
        end: offset + 4
    });
    return value;
};

// istanbul ignore next
AnnotatedBuffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    var value = this.buffer.readFloatLE(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'FloatLE',
        value: value,
        start: offset,
        end: offset + 4
    });
    return value;
};

// istanbul ignore next
AnnotatedBuffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    var value = this.buffer.readFloatBE(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'FloatBE',
        value: value,
        start: offset,
        end: offset + 4
    });
    return value;
};

// istanbul ignore next
AnnotatedBuffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    var value = this.buffer.readDoubleLE(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'DoubleLE',
        value: value,
        start: offset,
        end: offset + 8
    });
    return value;
};

// istanbul ignore next
AnnotatedBuffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    var value = this.buffer.readDoubleBE(offset, noAssert);
    this.annotations.push({
        kind: 'read',
        name: 'DoubleBE',
        value: value,
        start: offset,
        end: offset + 8
    });
    return value;
};

// -- extras

// istanbul ignore next
AnnotatedBuffer.prototype.hexdump = function hexdump(options) {
    var self = this;

    options = extend(options, {
        emptyHuman: ' ',
        annotateLine: annotateLine
    });
    if (options.boldStart === undefined) options.boldStart = true;
    options.decorateHexen = colorRegions;
    options.decorateHuman = colorRegions;
    var colors = options.colors || ['magenta', 'cyan', 'yellow', 'green'];
    var colorI = 0;
    var annI = 0;
    var last = 0;
    return hex(this.buffer, options);

    function annotateLine(start, end) {
        var parts = [];
        for (var i = last; i <= annI; i++) {
            var ann = self.annotations[i];
            if (ann && ann.start >= start && ann.start < end) {
                if (options.colored) {
                    ann.color = colors[i % colors.length];
                }
                parts.push(ann);
                last = i + 1;
            }
        }
        return '  ' + parts.map(function(part) {
            var desc = part.name;
            if (typeof part.value !== 'string' &&
                !Buffer.isBuffer(part.value)) {
                desc += '(' + inspect(part.value) + ')';
            }
            if (part.color) {
                desc = color(desc, part.color);
            } else if (part.start === part.end) {
                desc += '@' + part.start.toString(16);
            } else {
                desc += '@[' + part.start.toString(16) + ',' +
                               part.end.toString(16) + ']';
            }
            if (options.highlight) {
                desc = options.highlight(part.start, 0, desc);
            }
            return desc;
        }).join(' ');
    }

    function colorRegions(i, j, str) {
        var ann = self.annotations[annI];
        while (ann && i >= ann.end) {
            ann = self.annotations[++annI];
            colorI = (colorI + 1) % colors.length;
        }

        if (ann && options.colored &&
            i >= ann.start &&
            i < ann.end) {
            str = stripColor(str);
            str = color(str, colors[colorI]);
            if (i === ann.start && options.boldStart) str = color(str, 'bold');
        }

        if (options.highlight) {
            str = options.highlight(i, j, str);
        }

        return str;
    }
};

module.exports = AnnotatedBuffer;
