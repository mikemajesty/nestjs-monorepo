# thriftrw

<!--
    [![build status][build-png]][build]
    [![Coverage Status][cover-png]][cover]
    [![Davis Dependency status][dep-png]][dep]
-->

<!-- [![NPM][npm-png]][npm] -->

Encodes and decodes Thrift binary protocol and JavaScript object models
declared in a Thrift IDL.
This is an alternative approach to using code generated from Thrift IDL source
files with the `thrift` compiler.

ThriftRW supports encoding and decoding the protocol with or without Thrift IDL
sources.
Without sources, it is still possible to read and write the Thrift binary
protocol in all of its structure using numbered fields for structs and not
discerning the nuanced differences between binary and string, list and set, or
number and enum.

With a Thrift IDL, ThriftRW is able to perform certain optimizations.
ThriftRW constructs model instances directly from the contents of a buffer
instead of creating an intermediate anonymous structural model.
As a consequence, it is able to quickly skip any unrecognized fields.
ThriftRW can also use the same struct constructor for every instance of a
struct, which should yield run-time performance benefits for V8 due to hidden
classes (not yet verified).

The scope of this project may eventually cover alternate Thrift binary
encodings including the compact binary protocol.

This project makes extensive use of [bufrw][] for reading and writing binary
protocols, a component shared by [tchannel-node][], with which this library
works in concert.

Browser compatible, see [Browser compatibility](#browser-compatibility).

[bufrw]: https://github.com/uber/bufrw
[tchannel-node]: https://github.com/uber/tchannel-node


## Example

ThriftRW provides a Thrift constructor that models all of the services,
functions, and types expressed in a ThriftIDL source file.

```js
var fs = require('fs');
var path = require('path');
var Thrift = require('thriftrw').Thrift;
var source = fs.readFileSync(path.join(__dirname, 'meta.thrift'), 'utf-8');
var thrift = new Thrift({
    source: source,
    strict: true,
    allowOptionalArguments: true,
    defaultAsUndefined: false
});
```

Consider `meta.thrift`

```thrift
struct HealthStatus {
    1: required bool ok
    2: optional string message
}

service Meta {
    HealthStatus health()
    string thriftIDL()
}
```

The most common usage of a Thrift instance is to get the argument and result
types of a function and use those types to read to or write from a buffer.
The `getType` and `getTypeResult` functions retrieve such models based on their name.
For example, the arguments struct for the health endpoint would be ``Meta::health_args``
and its result struct would be ``Meta::health_result``.

```js
var MetaHealthArgs = thrift.getType('Meta::health_args');
var MetaHealthResult = thrift.getType('Meta::health_result');
```

The `getType` method will return the struct or throw an exception if one does not exist.
This is the appropriate method if `getType` should throw an error due to a
programmer's mistake, where the Thrift source in question is checked into the same project
and the method name is a literal.

However, exceptions being an undesirable outcome for bad data from a user,
`getTypeResult` returns a result object with either `err` or `value` properties set.

```js
var res = thrift.getTypeResult(methodName + '_args');
if (res.err) {
    return callback(res.err);
}
var ArgsStruct = res.value;
```

The struct can be written or read to or from a buffer using the struct's `rw` instance.
A RW (reader/writer) implements `byteLength(value)`, `writeInto(value, buffer,
offset)`, `readFrom(buffer, offset)`, each of which return a result object as
specified by [bufrw][].
The value may be JSON, a POJO (plain old JavaScript object), or any instances
of the Thrift model, like `new thrift.Health({ok: true})`.

A struct can also be encoded or decoded using the ThriftStruct's own
`toBuffer(value)`, `fromBuffer(buffer)`, `toBufferResult(value)`, and
`fromBufferResult(buffer)` methods.
Those with `Result` in their name return `Result` instances instead of throwing
or returning the buffer or value.

[TChannelASThrift][] employs this interface on your behalf, leaving the
application author to take arguments and call back with a result when using
the Thrift argument scheme and a given Thrift IDL.

[TChannelAsThrift]: https://github.com/uber/tchannel-node/blob/master/as/thrift.js


### Regarding Fields of Argument Structs

To avoid hazards, every Thrift method should accept a single required argument,
numbered 1.

```thrift
service Service {
    void method(1: required MethodArgument arg)
}

struct MethodArgument {
    // ...
}
```

Protobuf gets arguments right.
A method receives a single, required message struct.
This has very clear semantics in every language.

Thrift methods receive an arguments struct.
This struct is special and treated uniquely in each language.
Unlike other structs, the field numbers must be consecutive and map to
positional arguments in some languages including Go and JavaScript.
The argument struct may not even be a named struct.

With the code generated for various languages by Apache Thrift, fields of an
argument struct are always optional.
The code generator will warn you that marking a field as optional is
redundant.
If you mark an argument as required, that mark will be silently ignored.

Each language has its own treatment on how to deal with a missing, optional
field.
In Go, a missing value will be represented as the zero value for its type,
effectively having an implicit default value.
There is no way to distinguish missing from the zero value.
In other languages, it's necessary to check for a missing value (null or None)
to avoid exceptions.

The initial version of ThriftRW Node sought to avoid this problem by making
all argument fields required, with no recourse for making them optional.
In this world, it is not possible to add an argument to an existing method.
It is necessary to create a new method.
This would be acceptable, except that none of the other ThriftRW
implementations were on board with enforcing this.

Consequently, the ThriftRW-node Thrift model constructor accepts an option,
`allowOptionalArguments`, which brings Node.js into alignment with ThriftRW for
Python and Go.
All arguments are optional by default, but can be marked required.
This flag is recommended for all future work.

To enable this flag, it is necessary to review all existing methods.
For methods that were only previously implemented in Node.js, it is sufficient
to mark the arguments as required.
This is backward compatible only because they were previously implicitly
required.
ThriftRW will continue denying requests with the missing arguments.
You can then add additional, optional arguments to existing methods, with logic
branching on whether the arguments are provided.

For methods that were handled in other languages as well, it is necessary to
add run-time checks for null arguments since changing a field from optional to
required would be backward incompatible.


### Regarding Default Values

Default values are inferred when reading a struct with a missing field,
typically by inbound request handlers in servers.

If a client uses the provided constructor for the struct, the constructor will
populate the default value as well, so in that sense clients also infer the
default value. The default value used is the null object unless the `defaultAsUndefined`
flag is set in the user-defined options. In such a case, undefined will be used, instead.

However, callers are not obliged to use the constructor for the struct. In that
case, if the value is missing, ThriftRW does not write it to the wire and
instead depends on the server to infer the default.

ThriftRW libraries would be within their rights to detect that a given value matches
the default and leave it off the byte buffer when writing.
ThriftRW does not yet attempt this because there is no demonstrated need, it
could be slow for compound objects, and it could lead to strange behavior if
the client and server disagree about the default.


### Without Thrift IDL

ThriftRW provides `T` prefixed types for encoding and decoding the wire
protocol without Thrift IDL.
This is useful for applications like [TCap] that do not necessarily have a
Thrift IDL file on hand to make sense of structs by field numbers alone.

The following example illustrates reading and writing a struct.
ThriftRW exports `TStruct`, `TList`, and `TMap`.
TStructs serve for arguments, results, and exceptions.
TLists also serve for sets.

```js
var thriftrw = require("thriftrw");
var bufrw = require('bufrw');

var struct = new thriftrw.TStruct();
struct.fields.push(
    new thriftrw.TField(thriftrw.TYPE.STRING, 1, new Buffer('hello')
);

var buf = bufrw.toBuffer(thriftrw.TStructRW, struct);
console.log('created a binary buffer of thrift encoded struct', buf);

var struct2 = bufrw.fromBuffer(thriftrw.TStructRW, buf);
console.log('created a TStruct from a binary buffer', struct2);
```

## Readers and Writers

Readers and Writers, or RWs, are objects that capture the methods necessary to
read and write a particular value to and from a buffer.
RW objects implement:

- `toBuffer(value):Result{err, buffer}`
- `fromBuffer(buffer, offset=0):Result{err, value}`

- `readFrom(buffer, offset):ReadResult{err, offset, value}`
- `writeInto(value, buffer, offset):WriteResult{err, offset, value}`
- `byteLength(value):LengthResult{err, length}`

- `poolReadFrom(result, buffer, offset):ReadResult{err, offset, value}`
- `poolWriteInto(result, value, buffer, offset):WriteResult{err, offset, value}`
- `poolByteLength(result, value):LengthResult{err, length}`

All of these methods return result objects, which will either have their `err`
populated with an error, or other properties for the success value.
The pool* methods also accept a result object for reuse.
That result object must implement `reset(err, ...properties)`.

The RW is the both the building block and the public interface of ThriftRW.


## Thrift Model

Thrift has internal models for modules, services, types, and values.
These models are indexed by name on each Thrift module in the `models` object.
Each of these models has a "surface", which is a constructor for types, values
for constants, an index of functions for services, and the model itself for
modules.
Modules expose their names on their own object only if they start with a
non-lower-case character, to avoid name collisions with other properties and
methods, but are always also available through the index for their type class,
like `thrift.consts.PI`.

The Meta service is simply `thrift.Meta`.
The object is an object mapping functions by name, so `thrift.Meta.health` is
the interface for accessing the `args` and `result` structs for the
`Meta::health` function.

```js
var args = new thrift.Meta.health.Arguments({ok: true});
var result = new thrift.Meta.health.Result({success: null});
```

The Thrift instance also has a `services` property containing the actual
ThriftService instance indexed by service name.
ThriftService instances are not expected to be useful outside the process of
compiling and linking the Thrift IDL, but you can use the services object to
check for the existence of a service by its name.

### Messages

Apache Thrift over HTTP envelopes arguments and result structs with a message
that contains a sequence number, the function name, a message type, and
followed by the message body.

Thrift over TChannel does not use Thrift envelopes.
TChannel does not need or use the Thrift sequence number, since it abstracts
multiplexing with its own transport frame identifiers.
The function name is expressed as Service::function in TChannel's arg1.
The message type corresponds to the TChannel frame type.
The message body corresponds to TChannel's arg3.

Since HTTP/1.1 only allows one outstanding request and response on the wire at
any time, and HTTP/1.1 with the ill-fated "pipeline" mode allows requests and
responses to be sent FIFO but forbids out-of-order responses, the sequence
number is useless.
HTTP/2.0 does support multiplexing, but does not require sequence identifiers
in the request or response body to do so.
Despite this folly, HTTP request handlers are obliged to use envelopes and
match the number of a response to the number of a request, but callers are not
obliged to choose sensible sequence numbers.

By default, services dispatch on the given function name. Services that
implement multiple Thrift services have the option of requiring the Thrift
service name and function name in the message envelope, with an arbitrary
delimiter, typically a single colon, e.g., "Service:function".
Over TChannel, this corresponds to the frame's arg1 and is always
"Service::function", the service name and function name delimited by two
colons.

The message type is an enumeration of one of 'CALL', 'ONEWAY', 'RESULT', or
'EXCEPTION'.
'CALL' and 'ONEWAY' are appropriate for requests, where 'ONEWAY' is for
functions with the `oneway` Thrift IDL modifier keyword, implying they expect
no response.
'RESULT' is for both Thrift success and exception cases.
For exceptions that cannot be captured by the Thrift result struct, the
'EXCEPTION' message type implies that the body is a Thrift exception struct of
the following shape instead of the result struct from the IDL.

```thrift
enum ExceptionType {
  UNKNOWN = 0
  UNKNOWN_METHOD = 1
  INVALID_MESSAGE_TYPE = 2
  WRONG_METHOD_NAME = 3
  BAD_SEQUENCE_ID = 4
  MISSING_RESULT = 5
  INTERNAL_ERROR = 6
  PROTOCOL_ERROR = 7
  INVALID_TRANSFORM = 8
  INVALID_PROTOCOL = 9
  UNSUPPORTED_CLIENT_TYPE = 10
}

struct TApplicationException {
  1: optional string message
  2: optional ExceptionType type
}
```

These cases are expressed in TChannel instead with an Error frame with the
corresponding TChannel transport error code and an arbitrary message.

The base message envelope constructor is available as the `thrift.Message`,
that is also a copy constructor.
Messages have the following properties:

- `version` defaults to 0. Version 1 has a more elaborate message header that
  expresses the message envelope version number and provides no additional
  value. There may or may never be another message envelope version.
- `type` is one of 'CALL', 'ONEWAY', 'RESULT', or 'EXCEPTION'
- `id` is a sequence number. Really, it is any number. If you are a client, you
  can pick. If you are a server, you must respect the client's choice and send
  back the same id in the response message.
- `body` is either your result object, or a `TApplicationException`.

ThriftRW provides reader/writer objects for the arguments and result message
envelopes on the function model.
The function model is addressable as `thrift.{Service}.{function}`.

- `argumentsMessageRW`
- `resultMessageRW`

### Structs

ThriftStruct models can be constructed with an optional object of specified
properties.
ThriftRW exposes the constructor for a struct declaration by name on the thrift
instance, as in `thrift.Health` for the meta.thrift example.

```js
var HealthStruct = thrift.Health;
var result = new ResultStruct({
    success: new HealthStruct({ok: true })
})
```

Unspecified properties will default to null (undefined if defaultAsUndefined flag was set)
or an instance of the default value specified in the Thrift IDL.
Nested structs can be expressed with JSON or POJO equivalents.
The constructors perform no validation.
Invalid objects are revealed only in the attempt to write one to a buffer.

```js
var result = new ResultStruct({success: {ok: true}});
```

Each constructor has a `rw` property that reveals the reader/writer instance.
Each constructor also hosts `toBuffer(value)`, `fromBuffer(buffer)`,
`toBufferResult(value)`, and `fromBufferResult(buffer)`.

Structs are indexed by name on the `thrift.structs` object and aliased on the
thrift object if their name does not start with a lower-case letter.

### Exceptions

ThriftException extends ThriftStruct.
Exceptions are modeled as structs on the wire, and are modeled as JavaScript
exceptions instead of regular objects.
As such they have a stack trace.
ThriftRW exposes the exception constructor by name on the thrift instance.

```thrift
exception Pebcak {
    1: required string message
    2: required string keyboardName
    3: required string chairName
}
```

```js
var error = new thrift.Pebcak({
    message: 'Problem exists between chair and keyboard',
    chairName: 'Hengroen',
    keyboardName: 'Excalibur'
});
```

Exceptions are indexed by name on the `thrift.exceptions` object and aliased on
the thrift object if their name does not start with a lower-case letter.

### Including other Thrift IDL files

Types, services, and constants defined in different Thrift files may be referenced by using include statements with paths relative to the current .thrift file. The paths must be in the form ./foo.thrift, ./foo/bar.thrift, ../baz.thrift, and so on.

Included modules will automatically be interpreted along with the module that included them, and they will be made available in the generated module with the base name of the included file.

For example, given:

```
// shared/types.thrift

struct UUID {
    1: required i64 high
    2: required i64 low
}
```

And:

```
// services/user.thrift

include "../shared/types.thrift"

struct User {
    1: required types.UUID uuid
}
```

You can do the following

```js
var path = require('path');
var Thrift = require('thriftrw').Thrift;
var service = new Thrift({
  entryPoint: path.resolve(__dirname, 'services/user.thrift'),
  allowFilesystemAccess: true
});

var userUuid = service.modules.types.UUID({
  high: ...,
  low: ...
});

var user = service.User({
  uuid: userUuid
});
```

### Aliasing/Renaming Includes

thriftrw-node contains experimental include-as support. This lets you include a file aliasing it to a different name than that of the file. This feature is hidden behind a flag and should not be used until support for include-as aliasing is supported by other language implementations of thriftrw.

Unaliased include:
```
include "../shared/Types.thrift"
```

Aliased include:
```
include Types "../shared/types.thrift"
```

To enable this you need to create a `Thrift` with the `allowIncludeAlias` option set to true. e.g.

```js
var thrift = new Thrift({
  thriftFile: /* path to main thrift file */,
  allowIncludeAlias: true,
  allowFilesystemAccess: true
});
```

### Definitions with PascalCase Identifiers are Exposed

The surface of any Thrift object will expose definitions as top level properties on an object if the identifier for that definition is PascalCased. In the include example above this can be seen. The filename for the `types.thrift` file is not PascalCase so it needed to be reached via the modules property. If the filename had instead been PascalCased, like `Types.thrift` or imported as `Types`, that module could have been accessed directly via `service.Types.UUID`;`

### Unions

ThriftUnion also extends ThriftStruct.
Unions are alike to structs except that fields must not be marked as `optional`
or `required`, cannot have a default value, and exactly one must be defined on
an instance.
As with other types, validation of a union only occurs when it is read or
written.

```thrift
union CoinToss {
    1: Obverse heads
    2: Reverse tails
}

struct Obverse {
    1: required string portrait;
    2: required i32 year;
}

struct Reverse {
    1: required string structure;
    2: optional string motto;
}
```

```js
var coinToss = new thrift.CoinToss({
    head: thrift.Obverse({
        portrait: 'TK',
        year: 2010
    })
})
```

Unions are indexed by name on the `thrift.unions` object and aliased on the
thrift object if their name does not start with a lower-case letter.

### Enums

Thrift enumerations are surfaced as an object mapping names to strings on
the thrift instance.

```thrift
enum CoinToss {
    tails = 0
    heads = 1
}
```

```js
var result = Math.random() < 0.5 ?
    thrift.CoinToss.heads :
    thrift.CoinToss.tails;
// result will be either "tails" or "heads"
```

ThriftRW hides the detail of which numeric value an enumeration will have on
the wire and allows an enumeration to be represented in JSON by name.
This is a deliberate departure from the norms for Thrift in other languages
to take advantage of the dynamic nature of JavaScript, permit duck typing,
enforce loose coupling between application code and wire protocol, and make
Thrift expressible as JSON on the command line with [TCurl][]

[TCurl]: https://github.com/uber/tcurl

Enums are indexed by name on the `thrift.unions` object and aliased on the
thrift object if their name does not start with a lower-case letter.

### Consts

Thrift constants are surfaced as properties of the thrift instance.

```thrift
const PI = 3
const TAU = 6
```

```js
var PI = thrift.PI;
var TAU = thrift.TAU;
```

Consts are indexed by name on the `thrift.consts` object and aliased on the
thrift object if their name does not start with a lower-case letter.


## Enhancements and Departures from Thrift proper

ThriftRW operates in a "strict" mode by default that imposes additional
constraints on Thrift to ensure cross language interoperability between
JavaScript, Python, Go, and Java, the four Thrift bindings favored at Uber.

In strict mode, structs must explicitly declare every field to be either
required, optional, or have a default value.

ThriftRW supports forward references and self-referential types (like trees)
without special demarcation.
ThriftRW also supports forward references in default values and constants.

## Types and Annotations

ThriftRW respects certain annotations specific to the treatment of various
types in JavaScript.

### set

There is an emerging standard for the representation of sets in JavaScript.
Until that standard becomes pervasive, sets are traditionally represented
either as an array with externally enforced constraints, or as long as the values
are scalar like numbers and strings, as an Object with values for keys.

By default, ThriftRW encodes and decodes sets as arrays.
ThriftRW does nothing to enforce uniqueness.

Additionally, the `js.type` annotation can be set to "object" if the value type
is a string, i16, or i32.
ThriftRW will ensure that the keys are coerced to and from Number for numeric
value types.

```thrift
typedef set<string> (js.type = 'object') StringSet
typedef set<i32> (js.type = 'object') I32Set
```

### map

There is also an emerging standard for the representation of maps in JavaScript.
However, until support is more pervasive, ThriftRW supports representing maps
as either an object with scalar key types or an entries array for all others.

Maps are represented as objects by default. With the `js.type` annotation set
to "entries", the map will be encoded and decoded with an array of [key, value]
duples.

```thrift
typedef map<string, string> Dictionary
typedef map<Struct, Struct> (js.type = 'entries') StructsByStructs
```

### i64

JavaScript numbers lack sufficient precision to represent all possible 64 bit
integers.
ThriftRW decodes 64 bit integers into a Buffer by default, and can coerce
various types down to i64 for purposes of expressing them as JSON or plain
JavaScript objects.

- A number up to the maximum integer precision available in JavaScript.
- A `{hi, lo}` or `{high, low}` pair of 32 bit precision integers.
- A 16 digit hexadecimal string, like `0102030405060708`.
- An array of 8 byte values. Ranges are not checked, but coerced.
- An 8 byte buffer.

ThriftRW supports a type annotation for i64 that reifies i64 as an instance of
[Long][], an object that models a 64 bit number as a `{high, low}` pair of 32
bit numbers and implements methods for common mathematical operators.

```thrift
typedef i64 (js.type = 'Long') long
```

Please use the [Long][] package for operating with such numbers.
A backward-incompatible release may make this form the default for reading.

With the Long type annotation, ThriftRW performs the following conversions on
your behalf.

```js
var Long = require('long');

// From a buffer to a long
var buf = new Buffer("0102030405060708", "hex");
var num = Long.fromBits(buf.readInt32BE(4, true), buf.readInt32BE(0, true));

// From a long to a buffer
var buf = new Buffer(8);
buf.writeUInt32BE(num.high, 0, 4, true);
buf.writeUInt32BE(num.low, 4, 4, true);
```

[Long]: https://www.npmjs.com/package/long

### Timestamps

The convention for expressing timestamps at Uber is to use an i64 for
UTC milliseconds since the UNIX epoch.
Previously, some services were found spending an unreasonable amount of time
parsing timestamp strings.
ThriftRW supports a `(js.type = 'Date')` annotation on i64.

```thrift
typedef i64 (js.type = 'Date') timestamp
```

This will reify timestamps as a JavaScript Date and ThriftRW will accept an
ISO-8601 timestamp or milliseconds since the epoch (as returned by
`Date.now()`) in place of a Date, as well as the equivalent in buffers or
arrays of bytes.

For [TCurl][], this means that you can both read and write ISO-8601 for
timestamps.

[TCurl]: https://github.com/uber/tcurl

## Non filesystem and asynchronous source loading

You can use the alternative asynchronous constructor `Thrift.load()` to load sources from a custom asynchronous function. The function provided will be passed file names and must call the callback function with the source associated with the file name. The callback function provided as second argument to `Thrift.load` will be called when the model is fully loaded or an error occured. This way, you can fetch thrift sources from a server for example. Here is an example:

```javascript
var request = require('request');
var Thrift = require('thriftrw').Thrift;

function fetchSource(filename, cb) {
  request('https://mysite.com/thrift/' + filename, function (err, res, body) {
    cb(err, body);
  });
}

// You can pass the `fs` Node.js module like so {fs: require('fs')}
var options = {fs: {readFile: fetchSource}};
Thrift.load(options, function (err, thrift) {
  console.log(err, thrift);
});
```

## Browser compatibility

The `browser/dist/bundle.js` file is a browserify bundle of thriftrw compatible with browsers. If you `require('thriftrw')`
in the context of a browser build, your build tool will likely use the `browser` field in `package.json` and use
the bundle instead of the node library (e.g. browserify, webpack). If it doesn't, you can probably make it do so.

The only thing that won't work in a browser is file system access. To go around this limitation, you have several aternatives:

- Load sources using a custom function, which can be asynchronous. See [Non filesystem and asynchronous source loading](#non-filesystem-and-asynchronous-source-loading).
- Use the `source` option as argument to `new Thrift()`
- Set all required files in the `idls` option as argument to `new Thrift()`, requires `entryPoint` to be specified, and the `source` not to be specified
- Pass an object with a custom `readFileSync` function as the `fs` argument to `new Thrift()`, requires `allowFilesystemAccess` to be falsy, and `source` or `entryPoint` to be specified

## Related

[thriftrw-python] is the sister library for Python.

[thriftrw-python]: https://github.com/thriftrw/thriftrw-python

## Installation

`npm install thriftrw`

## Tests

`npm test`

## NPM scripts

 - `npm run add-licence` This will add the licence headers.
 - `npm run build-browser` This will build the test and release browserify bundles.
 - `npm run cover` This runs the tests with code coverage
 - `npm run lint` This will run the linter on your code
 - `npm test` This will run the tests.
 - `npm run test-browser` This will run the tests using the browserify bundle in Headless Chrome.
 - `npm run trace` This will run your tests in tracing mode.
 - `npm run travis` This is run by travis.CI to run your tests
 - `npm run view-cover` This will show code coverage in a browser

## Contributors

 - Lei Zhao @leizha
 - Kris Kowal @kriskowal
 - Andrew de Andrade @malandrew

## MIT Licenced

  [build-png]: https://secure.travis-ci.com/uber/thriftrw.png
  [build]: https://travis-ci.com/uber/thriftrw
  [cover-png]: https://coveralls.io/repos/uber/thriftrw/badge.png
  [cover]: https://coveralls.io/r/uber/thriftrw
  [dep-png]: https://david-dm.org/thriftrw/thriftrw-node.png
  [dep]: https://david-dm.org/thriftrw/thriftrw-node
  [test-png]: https://ci.testling.com/uber/thriftrw.png
  [tes]: https://ci.testling.com/uber/thriftrw
  [npm-png]: https://nodei.co/npm/thriftrw.png?stars&downloads
  [npm]: https://nodei.co/npm/thriftrw
