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
var testRW = require('bufrw/test_rw');
var Literal = require('../ast').Literal;
var ThriftStruct = require('../struct').ThriftStruct;
var ThriftBoolean = require('../boolean').ThriftBoolean;
var Thrift = require('../thrift').Thrift;

var thriftHealth = new ThriftStruct();

var undefinedDefault = new Literal(undefined);
var nullDefault = new Literal(null);

// Manually drive compile(idl) and link(thrift). This would be done by the Spec.

var thriftMock = {
    structs: {},
    resolve: function resolve() {
        // pretend all fields are boolean
        return new ThriftBoolean();
    },
    resolveValue: function resolveValue() {
    }
};

thriftHealth.compile({
    id: {name: 'Health'},
    fields: [
        {
            id: {value: 1},
            name: 'ok',
            valueType: {
                type: 'BaseType',
                baseType: 'boolean'
            },
            optional: false,
            required: true
        }
    ]
}, {});

thriftHealth.link(thriftMock);

var Health = thriftHealth.Constructor;

var cases = [

    // good
    [new Health({ok: true}), [
        0x02,                      // type:1 -- 2 -- BOOL
        0x00, 0x01,                // id:2   -- 1 -- ok
        0x01,                      // ok:1   -- 1 -- true
        0x00                       // type:1 -- 0 -- stop
    ]],

    // bad
    [new Health({ok: false}), [
        0x02,                      // type:1 -- 2 -- BOOL
        0x00, 0x01,                // id:2   -- 1 -- ok
        0x00,                      // ok:1   -- 0 -- false
        0x00                       // type:1 -- 0 -- stop
    ]]

];

test('HealthRW', testRW.cases(Health.rw, cases));

test('HealthRW to Buffer', function t(assert) {
    var res = Health.rw.toBuffer(cases[0][0]);
    assert.deepEqual(res.value, (Buffer.from || Buffer)(cases[0][1]), 'buffer matches');
    assert.end();
});

test('HealthRW from Buffer', function t(assert) {
    var res = Health.rw.fromBuffer((Buffer.from || Buffer)(cases[0][1]));
    assert.deepEqual(res.value, cases[0][0], 'object matches');
    assert.end();
});

test('complains of missing required field', function t(assert) {
    var res = Health.rw.readFrom((Buffer.from || Buffer)([
        0x00                      // typeid:1 -- 0 -- STOP
    ]), 0);
    assert.ok(res.err, 'required field error');
    if (!res.err) return;
    assert.equal(res.err.message, 'missing required field "ok" with id 1 on Health');
    assert.end();
});

test('struct skips unknown void', function t(assert) {
    var res = Health.rw.readFrom((Buffer.from || Buffer)([
        0x02,                     // type:1   -- 2 -- BOOL
        0x00, 0x02,               // id:2     -- 2 -- WHAT EVEN IS!?
        0x00,                     // bool:1

        0x02,                     // type:1   -- 2 -- BOOL
        0x00, 0x01,               // id:2     -- 1 -- ok
        0x01,                     // ok:1     -- 1 -- true

        0x00                      // typeid:1 -- 0 -- STOP
    ]), 0);
    if (res.err) {
        return assert.end(res.err);
    }
    assert.deepEqual(res.value, new Health({ok: true}));
    assert.end();
});

test('fails to read unexpected typeid for known field', function t(assert) {
    var buffer = (Buffer.from || Buffer)([
        0x01,       // typeid:1 -- 1 -- VOID
        0x00, 0x01, // fid:2    -- 1 -- ok
        0x00        // typeid:1 -- 0 -- STOP
    ]);
    var res = Health.rw.readFrom(buffer, 0);
    if (!res.err) {
        assert.fail('should be an error');
        return assert.end();
    }
    assert.equal(res.err.message, 'unexpected typeid 1 (VOID) for field "ok" ' +
        'with id 1 on Health; expected 2 (BOOL)');
    assert.end();
});

test('struct skips unknown string', function t(assert) {
    var res = Health.rw.readFrom((Buffer.from || Buffer)([
        0x02,                     // type:1   -- 2 -- BOOL
        0x00, 0x01,               // id:2     -- 1 -- ok
        0x01,                     // ok:1     -- 1 -- true

        11,                       // typeid:1 -- 11 -- STRING
        0x00, 0x02,               // id:2     -- 2  -- WHAT EVEN IS!?
        0x00, 0x00, 0x00, 0x02,   // len~4
        0x20, 0x20,               // '  '

        0x00                      // typeid:1 -- 0  -- STOP
    ]), 0);
    if (res.err) {
        return assert.end(res.err);
    }
    assert.deepEqual(res.value, new Health({ok: true}));
    assert.end();
});

test('struct skips unknown struct', function t(assert) {
    var res = Health.rw.readFrom((Buffer.from || Buffer)([
        0x02,                     // type:1   -- 2 -- BOOL
        0x00, 0x01,               // id:2     -- 1 -- ok
        0x01,                     // ok:1     -- 1 -- true

        0x0c,                     // typeid:1 -- 12 -- STRUCT
        0x00, 0x02,               // id:2     -- 2  -- WHAT EVEN IS!?

        0x01,                     // typeid:1 -- 1  -- VOID
        0x01,                     // typeid:1 -- 1  -- VOID
        0x0b,                     // typeid:1 -- 11 -- STRING
        0x00, 0x00, 0x00, 0x02,   // len~4
        0x20, 0x20,               // '  '
        0x01,                     // typeid:1 -- 1  -- VOID
        0x00,                     // typeid:1 -- 0  -- STOP

        0x00                      // typeid:1 -- 0  -- STOP
    ]), 0);
    if (res.err) {
        return assert.end(res.err);
    }
    assert.deepEqual(res.value, new Health({ok: true}));
    assert.end();
});

test('struct skips uknown map', function t(assert) {
    var res = Health.rw.readFrom((Buffer.from || Buffer)([
        0x02,                     // type:1   -- 2 BOOL
        0x00, 0x01,               // id:2     -- 1 ok
        0x01,                     // ok:1     -- 1 true

        0x0d,                     // typeid:1 -- 13, map
        0x00, 0x02,               // id:2     -- 2 UNKNOWN

        // Thus begins a large map
        0x0b,                   // key_type:1         -- string    @ 4
        0x0c,                   // val_type:1         -- struct
        0x00, 0x00, 0x00, 0x02, // length:4           -- 2
                                //                    --
        0x00, 0x00, 0x00, 0x04, // key[0] str_len:4   -- 4         @ 10
        0x6b, 0x65, 0x79, 0x30, // key[0] chars       -- "key0"    @ 14
        0x0c,                   // val[0] type:1      -- struct    @ 18
        0x00, 0x01,             // val[0] id:2        -- 1         @ 19
        0x08,                   // val[0] > type:1    -- i32       @ 21
        0x00, 0x01,             // val[0] > id:2      -- 1         @ 22
        0x00, 0x00, 0x00, 0x14, // val[0] > Int32BE   -- 20        @ 24
        0x00,                   // val[0] > type:1    -- stop      @ 25
        0x0c,                   // val[0] type:1      -- struct    @ 26
        0x00, 0x02,             // val[0] id:2        -- 2         @ 27
        0x0b,                   // val[0] > type:1    -- string    @ 29
        0x00, 0x01,             // val[0] > id:2      -- 1         @ 30
        0x00, 0x00, 0x00, 0x04, // val[0] > str_len:4 -- 4         @ 32
        0x73, 0x74, 0x72, 0x32, // val[0] > chars     -- "str2"    @ 36
        0x00,                   // val[0] > type:1    -- stop      @ 40
        0x00,                   // val[0] > type:1    -- stop
                                //                    --
        0x00, 0x00, 0x00, 0x04, // key[1] str_len:4   -- 4
        0x6b, 0x65, 0x79, 0x31, // key[1] chars       -- "key1"
        0x0c,                   // val[1] type:1      -- struct
        0x00, 0x01,             // val[1] id:2        -- 1
        0x08,                   // val[1] > type:1    -- i32
        0x00, 0x01,             // val[1] > id:2      -- 1
        0x00, 0x00, 0x00, 0x0a, // val[1] > Int32BE   -- 10
        0x00,                   // val[1] > type:1    -- stop
        0x0c,                   // val[1] type:1      -- struct
        0x00, 0x02,             // val[1] id:2        -- 2
        0x0b,                   // val[1] > type:1    -- string
        0x00, 0x01,             // val[1] > id:2      -- 1
        0x00, 0x00, 0x00, 0x04, // val[1] > str_len:4 -- 4
        0x73, 0x74, 0x72, 0x31, // val[1] > chars     -- "str1"
        0x00,                   // val[1] > type:1    -- stop
        0x00,                   // val[1] > type:1    -- stop
        // Thus ends the map

        0x00                      // typeid:1         -- 0 STOP
    ]), 0);
    if (res.err) {
        return assert.end(res.err);
    }
    assert.deepEqual(res.value, new Health({ok: true}));
    assert.end();
});

test('struct skips unknown list', function t(assert) {
    var res = Health.rw.readFrom((Buffer.from || Buffer)([
        0x02,                     // type:1   -- 2 BOOL
        0x00, 0x01,               // id:2     -- 1 ok
        0x00,                     // ok:1     -- 0 false

        0x0f,                     // typeid:1    -- 15, list
        0x00, 0x02,               // id:2        -- 2 UNKNOWN

        // Thus begins a list
        0x0c,                   // el_type:1     -- struct
        0x00, 0x00, 0x00, 0x03, // length:4      -- 3
        0x08,                   // el[0] type:1  -- i32
        0x00, 0x01,             // el[0] id:2    -- 2
        0x00, 0x00, 0x00, 0x1e, // el[0] Int32BE -- 30
        0x00,                   // el[0] type:1  -- stop
        0x08,                   // el[1] type:1  -- i32
        0x00, 0x01,             // el[1] id:2    -- 2
        0x00, 0x00, 0x00, 0x64, // el[1] Int32BE -- 100
        0x00,                   // el[1] type:1  -- stop
        0x08,                   // el[2] type:1  -- i32
        0x00, 0x01,             // el[2] id:2    -- 2
        0x00, 0x00, 0x00, 0xc8, // el[2] Int32BE -- 200
        0x00,                   // el[2] type:1  -- stop
        // Thus ends the map

        0x00                      // typeid:1    -- 0 STOP
    ]), 0);
    if (res.err) {
        return assert.end(res.err);
    }
    assert.deepEqual(res.value, new Health({ok: false}));
    assert.end();
});

test('every field must be marked in strict mode', function t(assert) {
    var thrift = new ThriftStruct();
    try {
        thrift.compile({
            id: {name: 'Health'},
            fields: [
                {
                    id: {value: 1},
                    name: 'ok',
                    valueType: {
                        type: 'BaseType',
                        baseType: 'boolean'
                    },
                    optional: false,
                    required: false
                }
            ]
        });
        thrift.link(thriftMock);
        assert.fail('should throw');
    } catch (err) {
        assert.equal(err.message, 'every field must be marked optional, ' +
            'required, or have a default value on Health including "ok" in strict mode');
    }
    assert.end();
});

test('structs and fields must be possible to rename with a js.name annotation', function t(assert) {
    var thrift = new ThriftStruct({strict: false});
    thrift.compile({
        id: {name: 'given'},
        annotations: {'js.name': 'alt'},
        fields: [
            {
                id: {value: 1},
                name: 'given',
                annotations: {'js.name': 'alt'},
                valueType: {
                    type: 'BaseType',
                    baseType: 'i32'
                }
            }
        ]
    });
    assert.equal(thrift.name, 'alt', 'struct must have alternate js.name');
    assert.equal(thrift.fieldsById[1].name, 'alt', 'field must have alternate js.name');
    assert.end();
});

test('required fields are required on measuring byte length', function t(assert) {
    var health = new Health();
    var res = Health.rw.byteLength(health);
    if (!res.err) {
        assert.fail('should fail to assess byte length');
        return assert.end();
    }
    assert.equal(res.err.message, 'missing required field "ok" with id 1 on Health', 'message checks out');
    assert.deepEqual(res.err.what, health, 'err.what should be the input struct');
    assert.end();
});

test('required fields are required on writing into buffer', function t(assert) {
    var health = new Health();
    var res = Health.rw.writeInto(health, (Buffer.alloc || Buffer)(100), 0);
    if (!res.err) {
        assert.fail('should fail to write');
        return assert.end();
    }
    assert.equal(res.err.message, 'missing required field "ok" with id 1 on Health', 'message checks out');
    assert.deepEqual(res.err.what, health, 'err.what should be the input struct');
    assert.end();
});

test('arguments must not be marked optional', function t(assert) {
    var argStruct = new ThriftStruct({strict: false});
    try {
        argStruct.compile({
            id: {name: 'foo_args'},
            isArgument: true,
            fields: [
                {
                    id: {value: 1},
                    name: 'name',
                    valueType: {
                        type: 'BaseType',
                        baseType: 'i64'
                    },
                    required: false,
                    optional: true
                }
            ]
        }, {});
        argStruct.link(thriftMock);
        assert.fail('should fail to write');
    } catch (err) {
        assert.equal(err.message, 'no field of an argument struct may be ' +
            'marked optional including name of foo_args; ' +
            'consider new Thrift({allowOptionalArguments: true}).');
    }
    assert.end();
});

test('arguments may now be marked optional', function t(assert) {
    var argStruct = new ThriftStruct({strict: false});
    argStruct.compile({
        id: {name: 'foo_args'},
        isArgument: true,
        fields: [
            {
                id: {value: 1},
                name: 'name',
                valueType: {
                    type: 'BaseType',
                    baseType: 'i64'
                },
                required: false,
                optional: true
            }
        ]
    }, {allowOptionalArguments: true});
    argStruct.link(thriftMock);
    assert.end();
});

test('arguments are now optional by default', function t(assert) {
    var argStruct = new ThriftStruct({strict: false});
    argStruct.compile({
        id: {name: 'foo_args'},
        isArgument: true,
        fields: [
            {
                id: {value: 1},
                name: 'name',
                valueType: {
                    type: 'BaseType',
                    baseType: 'i64'
                },
                required: false,
                optional: false
            }
        ]
    }, {allowOptionalArguments: true});
    argStruct.link(thriftMock);
    assert.ok(argStruct.fieldsByName.name.optional, 'argument field defaults to optional');
    assert.end();
});

test('skips optional elided arguments', function t(assert) {
    var thrift = new ThriftStruct();
    thrift.compile({
        id: {name: 'Health'},
        fields: [
            {
                id: {value: 1},
                name: 'ok',
                valueType: {
                    type: 'BaseType',
                    baseType: 'boolean'
                },
                optional: true,
                required: false
            }
        ]
    }, {});
    thrift.link(thriftMock);
    var health = new thrift.Constructor();

    var byteLengthRes = thrift.rw.byteLength(health);
    if (byteLengthRes.err) return assert.end(byteLengthRes.err);
    assert.equal(byteLengthRes.length, 1, 'only needs one byte');

    var buffer = (Buffer.alloc || Buffer)(byteLengthRes.length);
    var writeRes = thrift.rw.writeInto(health, buffer, 0);
    if (writeRes.err) return assert.end(writeRes.err);
    assert.equal(writeRes.offset, 1, 'writes to end of buffer');
    assert.deepEqual(buffer, (Buffer.from || Buffer)([0x00]), 'writes stop byte only');

    assert.end();
});

test('skips optional elided struct (all fields optional)', function t(assert) {
    var thrift = new ThriftStruct();
    thrift.compile({
        id: {name: 'Health'},
        fields: [
            {
                id: {value: 1},
                name: 'ok',
                valueType: {
                    type: 'BaseType',
                    baseType: 'boolean'
                },
                optional: true,
                required: false
            }
        ]
    }, {});
    thrift.link(thriftMock);

    var byteLengthRes = thrift.rw.byteLength(null);
    if (byteLengthRes.err) return assert.end(byteLengthRes.err);
    assert.equal(byteLengthRes.length, 1, 'only needs one byte');

    var buffer = (Buffer.alloc || Buffer)(byteLengthRes.length);
    var writeRes = thrift.rw.writeInto(null, buffer, 0);
    if (writeRes.err) return assert.end(writeRes.err);
    assert.equal(writeRes.offset, 1, 'writes to end of buffer');
    assert.deepEqual(buffer, (Buffer.from || Buffer)([0x00]), 'writes stop byte only');

    assert.end();
});

test('enforces ordinal identifiers', function t(assert) {
    var thrift = new ThriftStruct();
    try {
        thrift.compile({
            id: {name: 'Health'},
            fields: [
                {
                    id: {value: 0, line: 1, column: 4},
                    name: 'ok',
                    valueType: {
                        type: 'BaseType',
                        baseType: 'boolean'
                    },
                    optional: true,
                    required: false
                }
            ]
        }, {});
        assert.fail('should throw');
    } catch (err) {
        assert.equal(err.message, 'field identifier must be greater than 0 for "ok" on "Health" at 1:4');
    }
    assert.end();
});

test('allows undefined as default', function t(assert) {
    var defaultStruct = new ThriftStruct({strict: false, defaultValueDefinition: undefinedDefault});
    var tMock = {
        structs: {},
        resolve: function resolve() {
            return new ThriftBoolean();
        },
        resolveValue: function resolveValue(valueDef) {
            assert.equal(valueDef.type, 'Literal', 'Value definition is a literal');
            assert.true(valueDef.hasOwnProperty('value'), 'Has defined value property');
            assert.true(valueDef.value === undefined, 'Value is undefined');
            return Thrift.prototype.resolveValue(valueDef);
        }
    };
    defaultStruct.compile({
        id: {name: 'NewDefault'},
        fields: [
            {
                id: {value: 1},
                name: 'testDefault',
                valueType: {
                    type: 'BaseType',
                    baseType: 'boolean'
                },
                required: false,
                optional: false
            }
        ]
    }, {allowOptionalArguments: true});
    defaultStruct.link(tMock);
    assert.true(defaultStruct.fieldsByName.testDefault.defaultValue === undefined, 'Default value is undefined');
    assert.end();
});

test('defaults to null as default value', function t(assert) {
    var defaultStruct = new ThriftStruct({strict: false, defaultValueDefinition: nullDefault});
    var tMock = {
        structs: {},
        resolve: function resolve() {
            return new ThriftBoolean();
        },
        resolveValue: function resolveValue(valueDef) {
            assert.equal(valueDef.type, 'Literal', 'Value definition is a literal');
            assert.true(valueDef.hasOwnProperty('value'), 'Has defined value property');
            assert.true(valueDef.value === null, 'Value is null');
            return Thrift.prototype.resolveValue(valueDef);
        }
    };
    defaultStruct.compile({
        id: {name: 'NewDefault'},
        fields: [
            {
                id: {value: 1},
                name: 'testDefault',
                valueType: {
                    type: 'BaseType',
                    baseType: 'boolean'
                },
                required: false,
                optional: false
            }
        ]
    }, {allowOptionalArguments: true});
    defaultStruct.link(tMock);
    assert.true(defaultStruct.fieldsByName.testDefault.defaultValue === null, 'Default value value is null');
    assert.end();
});
