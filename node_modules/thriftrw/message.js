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

// reverse engineered TBinaryProtocol message envelope spec
// http://slackhappy.github.io/thriftfiddle/tbinaryspec.html

var RW = require('./rw');
var util = require('util');
var Struct = require('./struct').Struct;
var errors = require('./errors');

var EMPTY_OBJECT = {};

var types = {
    CALL: 1,
    REPLY: 2,
    EXCEPTION: 3,
    ONEWAY: 4
};
// <-> inverse
var typeNames = {
    1: 'CALL',
    2: 'REPLY',
    3: 'EXCEPTION',
    4: 'ONEWAY'
};

// These are elided syntax trees, to avoid IDL parsing at start time.

var exceptionTypesDef = {
    type: 'Enum',
    id: {name: 'ThriftMessageEnvelopeExceptionType'},
    definitions: [
        {id: {name: 'UNKNOWN'},                 value: {value: 0}},
        {id: {name: 'UNKNOWN_METHOD'},          value: {value: 1}},
        {id: {name: 'INVALID_MESSAGE_TYPE'},    value: {value: 2}},
        {id: {name: 'WRONG_METHOD_NAME'},       value: {value: 3}},
        {id: {name: 'BAD_SEQUENCE_ID'},         value: {value: 4}},
        {id: {name: 'MISSING_RESULT'},          value: {value: 5}},
        {id: {name: 'INTERNAL_ERROR'},          value: {value: 6}},
        {id: {name: 'PROTOCOL_ERROR'},          value: {value: 7}},
        {id: {name: 'INVALID_TRANSFORM'},       value: {value: 8}},
        {id: {name: 'INVALID_PROTOCOL'},        value: {value: 9}},
        {id: {name: 'UNSUPPORTED_CLIENT_TYPE'}, value: {value: 10}}
    ]
};

// AST for the implicit exception struct
var exceptionDef = {
    type: 'Struct',
    id: {name: 'ThriftMessageEnvelopeException'},
    fields: [
        {
            id: {value: 1},
            name: 'message',
            valueType: {
                type: 'BaseType',
                baseType: 'string'
            },
            optional: true,
            required: false
        },
        {
            id: {value: 2},
            name: 'type',
            valueType: {
                type: 'Identifier',
                name: 'ThriftMessageEnvelopeExceptionType'
            },
            optional: true,
            required: false
        }
    ]
};

function Message(message) {
    message = message || EMPTY_OBJECT;
    this.id = message.id;
    this.name = message.name;
    this.body = message.body;
    this.type = message.type;
    this.version = message.version || 0; // >0 implies strict
}

function MessageRW(body, exception) {
    this.body = body;
    this.exception = exception;
    RW.call(this);
}
util.inherits(MessageRW, RW);

MessageRW.prototype.poolByteLength = function poolByteLength(result, message) {
    // header
    var length = message.name.length;
    // names must be half-ascii, so ucs2 length === byte length
    if (message.version > 0) { // strict
        // version:2 type:2 name~4 id:4
        length += 12;
    } else { // legacy non-strict message header
        // name~4 type:1 id:4
        length += 9;
    }

    if (message.type === 'EXCEPTION') {
        result = this.exception.poolByteLength(result, message.body);
        if (result.err) {
            return result;
        }
        length += result.length;
        return result.reset(null, length);
    }

    // body
    result = this.body.poolByteLength(result, message.body);
    if (result.err) {
        return result;
    }
    length += result.length;

    return result.reset(null, length);
};

MessageRW.prototype.poolWriteInto = function poolWriteInto(result, message, buffer, offset) {
    if (message.version > 0) {
        result = this.poolStrictWriteInto(result, message, buffer, offset);
    } else {
        result = this.poolLegacyWriteInto(result, message, buffer, offset);
    }
    if (result.err) {
        return result;
    }
    offset = result.offset;

    if (message.type === 'EXCEPTION') {
        return this.exception.poolWriteInto(result, message.body, buffer, offset);
    }

    // write body
    return this.body.poolWriteInto(result, message.body, buffer, offset);
};

MessageRW.prototype.poolStrictWriteInto = function poolStrictWriteInto(result, message, buffer, offset) {
    // version:2 type:2 name~4 id:4

    // version:2 (with MSB set)
    buffer.writeUInt16BE(message.version | 0x8000, offset);
    offset += 2;

    // type:2
    var type = types[message.type];
    if (type == null) {
        return result.reset(new errors.InvalidMessageEnvelopeTypeName({
            name: message.type
        }));
    }
    buffer.writeUInt16BE(type, offset);
    offset += 2;

    // name.length:4
    buffer.writeUInt32BE(message.name.length, offset);
    offset += 4;

    // name:name.length
    buffer.write(message.name, offset, 'ascii');
    offset += message.name.length;

    // id:4
    buffer.writeUInt32BE(message.id, offset);
    offset += 4;

    return result.reset(null, offset);
};

MessageRW.prototype.poolLegacyWriteInto = function poolLegacyWriteInto(result, message, buffer, offset) {
    // name~4 type:1 id:4

    // name.length:4
    buffer.writeUInt32BE(message.name.length, offset);
    offset += 4;

    // name:name.length
    buffer.write(message.name, offset, 'ascii');
    offset += message.name.length;

    // type:1
    var type = types[message.type];
    if (type == null) {
        return result.reset(new errors.InvalidMessageEnvelopeTypeName({
            name: message.type
        }));
    }
    buffer.writeUInt8(type, offset);
    offset += 1;

    // id:4
    buffer.writeUInt32BE(message.id, offset);
    offset += 4;

    return result.reset(null, offset);
};

MessageRW.prototype.poolReadFrom = function poolReadFrom(result, buffer, offset) {
    var msb = buffer.readInt8(offset);
    if (msb < 0) {
        result = this.poolStrictReadFrom(result, buffer, offset);
    } else {
        result = this.poolLegacyReadFrom(result, buffer, offset);
    }
    if (result.err) {
        return result;
    }
    var message = result.value;
    offset = result.offset;

    if (message.type === 'EXCEPTION') {
        result = this.exception.poolReadFrom(result, buffer, offset);
        if (result.err) {
            return result;
        }
        message.body = result.value;
        // Decode the enumeration
        offset += result.offset;
        return result.reset(message.body, offset, message);
    }

    // body
    result = this.body.poolReadFrom(result, buffer, offset);
    if (result.err) {
        return result;
    }
    message.body = result.value;
    offset = result.offset;

    return result.reset(null, offset, message);
};

MessageRW.prototype.poolStrictReadFrom = function poolStrictReadFrom(result, buffer, offset) {
    // the first two bytes might be "flag" and "version", or just "version"
    // with the MSB flipped to make strict distinguishable.
    // The type only needs the lesser byte of the available two.
    // version:2 type:2 name~4 id:4

    var message = new Message();
    message.version = buffer.readUInt16BE(offset) & ~0x8000; // mask out MSB
    offset += 2;

    if (message.version !== 1) {
        return result.reset(new errors.UnrecognizedMessageEnvelopeVersion({
            version: message.version
        }));
    }

    // type:2
    var type = buffer.readUInt16BE(offset) & 0xFF;
    offset += 2;

    message.type = typeNames[type];
    if (message.type == null) {
        return result.reset(new errors.UnrecognizedMessageEnvelopeType({
            value: type
        }));
    }

    // name.length:4
    var length = buffer.readUInt32BE(offset);
    offset += 4;

    // name:name.length
    message.name = buffer.toString('ascii', offset, offset + length, true);
    offset += length;

    // id:4
    message.id = buffer.readUInt32BE(offset);
    offset += 4;

    return result.reset(null, offset, message);
};

MessageRW.prototype.poolLegacyReadFrom = function poolLegacyReadFrom(result, buffer, offset) {
    // name~4 type:1 id:4
    var message = new Message();

    // name.length
    var length = buffer.readUInt32BE(offset);
    offset += 4;

    // name:name.length
    message.name = buffer.toString('ascii', offset, offset + length, true);
    offset += length;

    // type:2
    var type = buffer.readUInt8(offset);
    offset += 1;

    // id:4
    message.id = buffer.readUInt32BE(offset);
    offset += 4;

    message.type = typeNames[type];
    if (message.type == null) {
        return result.reset(new errors.UnrecognizedMessageEnvelopeType({
            value: type
        }));
    }

    return result.reset(null, offset, message);
};

module.exports.Message = Message;
module.exports.MessageRW = MessageRW;
module.exports.types = types;
module.exports.typeNames = typeNames;
module.exports.exceptionDef = exceptionDef;
module.exports.exceptionTypesDef = exceptionTypesDef;
