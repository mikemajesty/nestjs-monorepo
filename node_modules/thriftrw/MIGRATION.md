# Migration

Below you will find documentation on how to migrate from older
versions of this module to newer versions.

This document only describes what breaks and how to update your
code.

# Migrating from v2 to v3

If you have only ever used ThriftRW through the TChannelAsThrift interface,
or if you have only ever used ThriftRW using the getType and getTypeResult
interface, no changes are necessary.

If you have used ThriftRW directly, the way you index types and values has
changed. The thrift object proper now contains aliases to constructors,
enumerations, constants, and other surfaces if they are in PascalCase.
If you were accessing a constant before like `thrift.pi`, you will need to
access it via the index, `thrift.consts.pi`, however `thrift.PI` will still
work.

The `types` index has been removed.
All models including types are index on `thrift.models`.
Each model has a property `models` which is one of the strings "service",
"type", "module", or "value".

The indexes on the Thrift object for "services", "structs", "exceptions",
"unions", etc previously exposed the Thrift Spec/Model object for each class.
They now expose the surface, so constructors for structs, the function index
for services, etc.
The models can only be accessed on the "models" index.


# Upgrading from thriftify to thriftrw

Loading a spec and using it to read and write types.

```js
var source = fs.readFileSync('my.thrift', 'utf-8');

// Before:
var thriftify = require('thriftify');
var thrift = thriftify.parseSpec(source);

// After:
var Thrift = require('thriftrw').Thrift;
var thrift = new Thrift({source: source});

var args = thrift.getType('MyService::myFunction_args');
var struct = args.fromBuffer(buffer);
var buffer = args.toBuffer(struct)
```

Reading and writing a type

```js
// Before:
var buffer = thriftify.toBuffer(struct, spec, 'MyStruct')
var struct = thriftify.fromBuffer(buffer, spec, 'MyStruct')

// After:
var MyStruct = spec.getType('MyStruct');
var buffer = MyStruct.toBuffer(struct);
var struct = MyStruct.fromBuffer(buffer);
```
