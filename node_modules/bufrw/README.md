# bufrw

Buffer Reading and Writing

## Example

Simple length-prefixed string:

```js
var bufrw = require("bufrw");

var buf = bufrw.toBuffer(bufrw.str1, "hello world");
// <Buffer 0b 68 65 6c 6c 6f 20 77 6f 72 6c 64>
var str = bufrw.fromBuffer(bufrw.str1, buf)
// "hello world"
```

// TODO more examples

## Concept and Motivation

A combinatoric library for synchronous binary buffer reading and writing.

The design is to combine:
- needed byte length calculation
- writing into a pre-allocated buffer
- reading from a buffer

Into a single re-combinable data type, eventually supporting code generation
for efficiency.

Any of those three steps may result in an error, so rather than rely on error
throw/catching we use an error-able result type.

## API Documentation

See docs.jsig

## Installation

`npm install bufrw`

## Tests

`npm test`

## NPM scripts

 - `npm run add-licence` This will add the licence headers.
 - `npm run cover` This runs the tests with code coverage
 - `npm run lint` This will run the linter on your code
 - `npm test` This will run the tests.
 - `npm run trace` This will run your tests in tracing mode.
 - `npm run travis` This is run by travis.CI to run your tests
 - `npm run view-cover` This will show code coverage in a browser

## Contributors

 - Joshua T Corbin

## MIT Licenced

  [build-png]: https://secure.travis-ci.org/uber/bufrw.png
  [build]: https://travis-ci.org/uber/bufrw
  [cover-png]: https://coveralls.io/repos/uber/bufrw/badge.png
  [cover]: https://coveralls.io/r/uber/bufrw
  [dep-png]: https://david-dm.org/uber/bufrw.png
  [dep]: https://david-dm.org/uber/bufrw
  [test-png]: https://ci.testling.com/uber/bufrw.png
  [tes]: https://ci.testling.com/uber/bufrw
  [npm-png]: https://nodei.co/npm/bufrw.png?stars&downloads
  [npm]: https://nodei.co/npm/bufrw
