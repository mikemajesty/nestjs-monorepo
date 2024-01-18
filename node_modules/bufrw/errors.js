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

var TypedError = require('error/typed');
var WrappedError = require('error/wrapped');

module.exports.expected = function expected(got, descr) {
    return module.exports.InvalidArgument({
        expected: descr,
        argType: typeof got,
        argConstructor: got && got.constructor.name
    });
};

module.exports.BrokenReaderState = TypedError({
    type: 'bufrw.broken-reader-state',
    message: 'reader in invalid state {state} expecting {expecting} avail {aval}',
    state: null,
    expecting: null,
    avail: null
});

module.exports.FixedLengthMismatch = TypedError({
    type: 'bufrw.fixed-length-mismatch',
    message: 'supplied length {got} mismatches fixed length {expected}',
    expected: null,
    got: null
});

module.exports.RangeError = TypedError({
    type: 'bufrw.range-error',
    message: 'value {value} out of range, min: {min} max: {max}',
    value: null,
    min: null,
    max: null
});

module.exports.InvalidArgument = TypedError({
    type: 'bufrw.invalid-argument',
    message: 'invalid argument, expected {expected}',
    expected: null,
    argType: null,
    argConstructor: null
});

module.exports.ReadInvalidSwitchValue = TypedError({
    type: 'bufrw.read.invalid-switch-value',
    message: 'read invalid switch value {value}',
    value: null
});

module.exports.WriteInvalidSwitchValue = TypedError({
    type: 'bufrw.write.invalid-switch-value',
    message: 'write invalid switch value {value}',
    value: null
});

module.exports.MissingStructField = TypedError({
    type: 'bufrw.missing.struct-field',
    message: 'missing field {field} on {struct}',
    field: null,
    struct: null
});

module.exports.ShortBuffer = TypedError({
    type: 'bufrw.short-buffer',
    message: 'expected at least {expected} bytes, only have {actual} @{offset}',
    expected: null,
    actual: null,
    buffer: null,
    offset: null
});

module.exports.ShortBufferRanged = TypedError({
    type: 'bufrw.short-buffer',
    message: 'expected at least {expected} bytes, only have {actual} @[{offset}:{endOffset}]',
    expected: null,
    actual: null,
    offset: null,
    endOffset: null
});

module.exports.ShortRead = TypedError({
    type: 'bufrw.short-read',
    message: 'short read, {remaining} byte left over after consuming {offset}',
    remaining: null,
    buffer: null,
    offset: null
});

module.exports.ShortWrite = TypedError({
    type: 'bufrw.short-write',
    message: 'short write, {remaining} byte left over after writing {offset}',
    remaining: null,
    buffer: null,
    offset: null
});

module.exports.TruncatedRead = TypedError({
    type: 'bufrw.truncated-read',
    message: 'read truncated by end of stream with {length} bytes in buffer',
    length: null,
    buffer: null,
    state: null,
    expecting: null
});

module.exports.UnstableRW = WrappedError({
    type: 'bufrw.unstable-rw',
    message: 'Unstable RW error: {origMessage} (other: {otherMessage})',
    otherMessage: null
});

module.exports.ZeroLengthChunk = TypedError({
    type: 'bufrw.zero-length-chunk',
    message: 'zero length chunk encountered'
});

module.exports.classify = classify;

function classify(err) {
    switch (err.type) {
        case 'bufrw.broken-reader-state':
        case 'bufrw.unstable-rw':
            return 'Internal';

        case 'bufrw.invalid-argument':
        case 'bufrw.read.invalid-switch-value':
        case 'bufrw.short-buffer':
        case 'bufrw.short-read':
        case 'bufrw.truncated-read':
        case 'bufrw.zero-length-chunk':
            return 'Read';

        case 'bufrw.fixed-length-mismatch':
        case 'bufrw.missing.struct-field':
        case 'bufrw.range-error':
        case 'bufrw.short-write':
        case 'bufrw.write.invalid-switch-value':
            return 'Write';

        // istanbul ignore next
        default:
            return null;
    }
}
