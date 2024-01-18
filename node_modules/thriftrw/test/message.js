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

/* eslint max-len:[0, 120] */
'use strict';

var Buffer = require('buffer').Buffer;
var test = require('tape');
var path = require('path');
var fs = require('fs');
var Thrift = require('../thrift').Thrift;

var source = fs.readFileSync(path.join(__dirname, 'thrift.thrift'), 'utf-8');
var thrift = new Thrift({source: source});

test('round-trip a non-strict message', function t(assert) {

    var message = new thrift.Service.foo.ArgumentsMessage({
        id: 0,
        body: new thrift.Service.foo.Arguments({
            bar: new thrift.Struct({
                number: 10
            })
        })
    });

    var result = thrift.Service.foo.argumentsMessageRW.byteLength(message);
    var buffer = (Buffer.alloc || Buffer)(result.length);

    var result = thrift.Service.foo.argumentsMessageRW.writeInto(message, buffer, 0);

    var expectedBuffer = (Buffer.from || Buffer)([
        0x00, 0x00, 0x00, 0x03, // name.length:4
        0x66, 0x6f, 0x6f,       // name:name.length
        0x01,                   // type:1 = CALL
        0x00, 0x00, 0x00, 0x00, // id:4
                                // body
        0x0c,                   // struct
        0x00, 0x01,             // field 1
        0x08,                   // i32
        0x00, 0x01,             // field 1
        0x00, 0x00, 0x00, 0x0a, // number:4 = 10
        0x00,                   // end of foo
        0x00                    // end of result
    ]);
    assert.deepEqual(buffer, expectedBuffer, 'wrote correctly');

    var result = thrift.Service.foo.argumentsMessageRW.readFrom(buffer, 0);

    assert.deepEqual(result.value, message, 'read correctly');

    assert.end();
});

test('round-trip a non-strict message', function t(assert) {
    var message = new thrift.Service.foo.ArgumentsMessage({
        version: 1,
        id: 0,
        body: new thrift.Service.foo.Arguments({
            bar: new thrift.Struct({
                number: 10
            })
        })
    });

    var result = thrift.Service.foo.argumentsMessageRW.byteLength(message);
    var buffer = (Buffer.alloc || Buffer)(result.length);
    var result = thrift.Service.foo.argumentsMessageRW.writeInto(message, buffer, 0);

    var expectedBuffer = (Buffer.from || Buffer)([
        0x80,                   // strict
        0x01,                   // version = 1
        0x00,                   // shrug
        0x01,                   // type = CALL
        0x00, 0x00, 0x00, 0x03, // name.length:4 = 3
        0x66, 0x6f, 0x6f,       // name:name.length = 'foo'
        0x00, 0x00, 0x00, 0x00, // id:4 = 0
                                // body
        0x0c,                   // struct
        0x00, 0x01,             // field 1
        0x08,                   // i32
        0x00, 0x01,             // field 1
        0x00, 0x00, 0x00, 0x0a, // number:4 = 10
        0x00,                   // end of foo
        0x00                    // end of result
    ]);
    assert.deepEqual(buffer, expectedBuffer, 'wrote correctly');

    var result = thrift.Service.foo.argumentsMessageRW.readFrom(buffer, 0);

    assert.deepEqual(result.value, message, 'read correctly');

    assert.end();
});

test('round trip an exception (legacy)', function t(assert) {
    // TODO exercise version=1
    var message = new thrift.Service.foo.ResultMessage({
        id: 2,
        type: 'EXCEPTION',
        body: new thrift.exception.Constructor({
            message: 'Unknown method',
            type: 'UNKNOWN_METHOD'
        })
    });

    var expectedBuffer = (Buffer.from || Buffer)([
        0x00, 0x00, 0x00, 0x03, // name.length:4
        0x66, 0x6f, 0x6f,       // name:name.length -- "foo"
        0x03,                   // type:3 = EXCEPTION
        0x00, 0x00, 0x00, 0x02, // id:4 -- 2
                                // exception
        0x0b,                   // typeid:1 -- 11 -- STRING
        0x00, 0x01,             // fieldid:2 -- 1 -- message
        0x00, 0x00, 0x00, 0x0e, // length
        0x55, 0x6e, 0x6b, 0x6e,
        0x6f, 0x77, 0x6e, 0x20,
        0x6d, 0x65, 0x74, 0x68,
        0x6f, 0x64,
        0x08,                   // typeid:1 -- 8 -- i32
        0x00, 0x02,             // fieldid:2 -- 2 -- type
        0x00, 0x00, 0x00, 0x01, // type:4 -- 1 -- UNKNOWN_METHOD
        0x00                    // end of struct
    ]);

    var result = thrift.Service.foo.resultMessageRW.byteLength(message);
    assert.equal(result.length, expectedBuffer.length, 'measured correctly');

    var buffer = (Buffer.alloc || Buffer)(result.length);
    buffer.fill(0xCC);

    var result = thrift.Service.foo.resultMessageRW.writeInto(message, buffer, 0);
    if (result.err) return assert.end(result.err);

    assert.deepEqual(buffer, expectedBuffer, 'wrote correctly');

    var result = thrift.Service.foo.argumentsMessageRW.readFrom(buffer, 0);

    assert.deepEqual(result.err, message.body, 'produced proper error');
    assert.deepEqual(result.value, message, 'read correctly');

    assert.end();
});

test('read unexpected version error', function t(assert) {
    var buffer = (Buffer.from || Buffer)([
        0x80,                   // strict
        0x02,                   // version = 2 XXX BUT WHAT IS GOING ON WITH VERSION 2!?
        0x00,                   // shrug
        0x01,                   // type = CALL
        0x00, 0x00, 0x00, 0x03, // name.length:4 = 3
        0x66, 0x6f, 0x6f,       // name:name.length = 'foo'
        0x00, 0x00, 0x00, 0x00, // id:4 = 0
                                // body
        0x0c,                   // struct
        0x00, 0x01,             // field 1
        0x08,                   // i32
        0x00, 0x01,             // field 1
        0x00, 0x00, 0x00, 0x0a, // number:4 = 10
        0x00,                   // end of foo
        0x00                    // end of result
    ]);
    var result = thrift.Service.foo.argumentsMessageRW.readFrom(buffer, 0);
    assert.equal(result.err.message, 'unrecognized Thrift message envelope version: 2',
        'expected error message');
    assert.equal(result.err.type, 'thrift-unrecognized-message-envelope-version',
        'expected error typed');
    assert.end();
});

test('read unexpected version error for undefined bits of strict', function t(assert) {
    var buffer = (Buffer.from || Buffer)([
        0x81,                   // strict XXX BUT WHAT IS GOING ON WITH THIS LOW BIT!?
        0x01,                   // version = 1
        0x00,                   // shrug
        0x01,                   // type = CALL
        0x00, 0x00, 0x00, 0x03, // name.length:4 = 3
        0x66, 0x6f, 0x6f,       // name:name.length = 'foo'
        0x00, 0x00, 0x00, 0x00, // id:4 = 0
                                // body
        0x0c,                   // struct
        0x00, 0x01,             // field 1
        0x08,                   // i32
        0x00, 0x01,             // field 1
        0x00, 0x00, 0x00, 0x0a, // number:4 = 10
        0x00,                   // end of foo
        0x00                    // end of result
    ]);
    var result = thrift.Service.foo.argumentsMessageRW.readFrom(buffer, 0);
    assert.equal(result.err.message, 'unrecognized Thrift message envelope version: 257',
        'expected error message');
    assert.equal(result.err.type, 'thrift-unrecognized-message-envelope-version',
        'expected error typed');
    assert.end();
});

test('read unrecognized message type error (strict)', function t(assert) {
    var buffer = (Buffer.from || Buffer)([
        0x80,                   // strict
        0x01,                   // version = 1
        0x00,                   // shrug
        0xff,                   // type = XXX WAT!?
        0x00, 0x00, 0x00, 0x03, // name.length:4 = 3
        0x66, 0x6f, 0x6f,       // name:name.length = 'foo'
        0x00, 0x00, 0x00, 0x00, // id:4 = 0
                                // body
        0x0c,                   // struct
        0x00, 0x01,             // field 1
        0x08,                   // i32
        0x00, 0x01,             // field 1
        0x00, 0x00, 0x00, 0x0a, // number:4 = 10
        0x00,                   // end of foo
        0x00                    // end of result
    ]);
    var result = thrift.Service.foo.argumentsMessageRW.readFrom(buffer, 0);
    assert.equal(result.err.message, 'unrecognized Thrift message envelope type: 255',
        'expected error message');
    assert.equal(result.err.value, 255,
        'expected error value');
    assert.equal(result.err.type, 'thrift-unrecognized-message-envelope-type',
        'expected error type');
    assert.end();
});

test('read unrecognized message type error (legacy)', function t(assert) {
    var buffer = (Buffer.from || Buffer)([
        0x00, 0x00, 0x00, 0x03, // name.length:4
        0x66, 0x6f, 0x6f,       // name:name.length
        0xff,                   // type:1 = XXX WAT!?
        0x00, 0x00, 0x00, 0x00, // id:4
                                // body
        0x0c,                   // struct
        0x00, 0x01,             // field 1
        0x08,                   // i32
        0x00, 0x01,             // field 1
        0x00, 0x00, 0x00, 0x0a, // number:4 = 10
        0x00,                   // end of foo
        0x00                    // end of result
    ]);
    var result = thrift.Service.foo.argumentsMessageRW.readFrom(buffer, 0);
    assert.equal(result.err.message, 'unrecognized Thrift message envelope type: 255',
        'expected error message');
    assert.equal(result.err.value, 255,
        'expected error value');
    assert.equal(result.err.type, 'thrift-unrecognized-message-envelope-type',
        'expected error type');
    assert.end();
});

test('read invalid message body error', function t(assert) {
    var buffer = (Buffer.from || Buffer)([
        0x00, 0x00, 0x00, 0x03, // name.length:4
        0x66, 0x6f, 0x6f,       // name:name.length
        0x01,                   // type:1 = CALL
        0x00, 0x00, 0x00, 0x00, // id:4
                                // body
        0x00, 0x02,             // field 1 -- XXX there is no field 2
        0x08,                   // i32
        0x00, 0x01,             // field 1
        0x00, 0x00, 0x00, 0x0a, // number:4 = 10
        0x00,                   // end of foo
        0x00                    // end of result
    ]);
    var result = thrift.Service.foo.argumentsMessageRW.readFrom(buffer, 0);
    assert.equal(result.err.message, 'missing required field "bar" with id 1 on foo_args',
        'expected message');
    assert.end();
});

test('read exception', function t(assert) {
    var buffer = (Buffer.from || Buffer)([
        0x00, 0x00, 0x00, 0x03, // name.length:4
        0x66, 0x6f, 0x6f,       // name:name.length
        0x03,                   // type:3 = EXCEPTION
        0x00, 0x00, 0x00, 0x00, // id:4
                                // exception
        0x0b,                   // typeid:1 -- 11 -- STRING
        0x00, 0x01,             // fieldid:2 -- 1 -- message
        0x00, 0x00, 0x00, 0x10, // length
        0x55, 0x6e, 0x65, 0x78,
        0x70, 0x65, 0x63, 0x74,
        0x65, 0x64, 0x20, 0x65,
        0x72, 0x72, 0x6f, 0x72, // "Unexpected error"
        0x08,                   // typeid:1 -- 8 -- i32
        0x00, 0x02,             // fieldid:2 -- 2 -- type
        0x00, 0x00, 0x00, 0x00, // type:4 -- 0 -- UNKNOWN
        0x00,                   // end of struct
    ]);
    var result = thrift.Service.foo.argumentsMessageRW.readFrom(buffer, 0);
    assert.equal(result.err.message, 'Unexpected error',
        'expected message');
    assert.equal(result.err.type, 'UNKNOWN',
        'expected message');
    assert.end();
});

test('read invalid exception', function t(assert) {
    var buffer = (Buffer.from || Buffer)([
        0x00, 0x00, 0x00, 0x03, // name.length:4
        0x66, 0x6f, 0x6f,       // name:name.length
        0x03,                   // type:3 = EXCEPTION
        0x00, 0x00, 0x00, 0x00, // id:4
                                // exception
        0x08,                   // typeid:1 -- 8, i32 XXX invalid
        0x00, 0x01,             // fieldid:2 -- 1 -- message
        // ...
    ]);
    var result = thrift.Service.foo.argumentsMessageRW.readFrom(buffer, 0);
    assert.equal(result.err.message,
        'unexpected typeid 8 (I32) for field "message" with id 1 on ' +
        'ThriftMessageEnvelopeException; expected 11 (STRING)',
        'expected error'
    );
    assert.end();
});

test('write invalid message type (legacy)', function t(assert) {
    var buffer = (Buffer.alloc || Buffer)(255);
    var message = {
        name: 'foo',
        type: 'BORK',
        version: 0
    };
    var result = thrift.Service.foo.argumentsMessageRW.writeInto(message, buffer, 0);
    assert.equal(result.err.message, 'invalid Thrift message envelope type name: BORK',
        'expected message');
    assert.end();
});

test('write invalid message type (strict)', function t(assert) {
    var buffer = (Buffer.alloc || Buffer)(255);
    var message = {
        name: 'foo',
        type: 'BORK',
        version: 1
    };
    var result = thrift.Service.foo.argumentsMessageRW.writeInto(message, buffer, 0);
    assert.equal(result.err.message, 'invalid Thrift message envelope type name: BORK',
        'expected message');
    assert.end();
});

test('measure byte length for invalid body', function t(assert) {
    var buffer = (Buffer.alloc || Buffer)(255);
    var message = {
        name: 'foo',
        type: 'BORK',
        version: 1,
        body: {
            bar: {
                number: null
            }
        }
    };
    var result = thrift.Service.foo.argumentsMessageRW.byteLength(message);
    assert.equal(result.err.message, 'missing required field "number" with id 1 on Struct',
        'expected message');
    assert.end();
});

test('measure byte length for invalid exception', function t(assert) {
    var buffer = (Buffer.alloc || Buffer)(255);
    var message = {
        name: 'foo',
        type: 'EXCEPTION',
        body: {
            message: 10
        }
    };
    var result = thrift.Service.foo.argumentsMessageRW.byteLength(message);
    assert.equal(result.err.message, 'invalid argument, expected string, null, or undefined',
        'expected message');
    assert.end();
});
