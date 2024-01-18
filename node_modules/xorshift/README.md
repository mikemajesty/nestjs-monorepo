# xorshift [![Build Status](https://travis-ci.org/AndreasMadsen/xorshift.svg?branch=master)](https://travis-ci.org/AndreasMadsen/xorshift)

> Pseudorandom number generator using [xorshift128+](http://xorshift.di.unimi.it/)

## Installation

```bash
npm install xorshift
```

## Example

```javascript
var xorshift = require('xorshift');

for (var i = 0; i < 10; i++) {
  console.log(xorshift.random()); // number in range [0, 1)
}
```

## Documentation

This module exports a default pseudo random generator. This generators seed have
already been set (using `Date.now()`). If this is not suitable a custom
generator can be initialized using the constructor function
`xorshift.constructor`. In both cases random numbers can be generated using
the two methods `.random` and `.randomint`.

```javascript
var xorshift = require('xorshift');
```

### xorshift.random()

This method returns a random 64-bit double, with its value in the range [0, 1).
That means 0 is inclusive and 1 is exclusive. This is equivalent to
`Math.random()`.

```javascript
console.log(xorshift.random()); // number between 0 and 1
```

This method will serve most purposes, for instance to randomly select between
2, 3 and 4, this function can be used:

```javascript
function uniformint(a, b) {
  return Math.floor(a + xorshift().random() * (b - a));
}

console.log(uniformint(2, 4));
```

### xorshift.randomint()

This method returns a random 64-bit integer. Since JavaScript doesn't support
64-bit integers, the number is represented as an array with two elements in
big-endian order.

This method is useful if high precision is required, the `xorshift.random()`
method won't allow you to get this precision since a 64-bit IEEE754 double
only contains the 52 most significant bits.

```javascript
var bview = require('binary-view');
console.log(bview( new Uint32Array(xorshift.randomint()) ));
```

### xorshift.constructor

This method is used to construct a new random generator, with a specific seed.
This is useful when testing software where random numbers are involved and
getting consistent results is important.

```javascript
var XorShift = require('xorshift').constructor;
var rng1 = new XorShift([1, 0, 2, 0]);
var rng2 = new XorShift([1, 0, 2, 0]);

assert(rng1.random() === rng2.random());
```

A `XorShift` instance have both methods `random` and `randomint`. In fact the
`xorshift` module is an instance of the `XorShift` constructor.

The constructor can also be accessed as `require('xorshift').XorShift`, which
is useful when using the `import` syntax.

```javascript
import { XorShift } from 'xorshift'
```

## Reference

This module implements the xorshift128+ pseudo random number generator.

> This is the fastest generator passing BigCrush without systematic
> errors, but due to the relatively short period it is acceptable only
> for applications with a very mild amount of parallelism; otherwise, use
> a xorshift1024* generator.
> – <cite> http://xorshift.di.unimi.it </cite>

This source also has a
[reference implementation](http://xorshift.di.unimi.it/xorshift128plus.c)
for the xorshift128+ generator. A wrapper around this implementation has been
created and is used for testing this module. To compile and run it:

```shell
gcc -O2 reference.c -o reference
./reference <numbers> <seed0> <seed1>
```

* `<numbers>` can be any number greater than zero, and it will be the number
of random numbers written to `stdout`. The default value is `10`.
* `<seed0>` and `<seed1>` forms the 128bit seed that the algorithm uses. Default
is `[1, 2]`.

## License

**This software is licensed under "MIT"**

> Copyright (c) 2014 Andreas Madsen & Emil Bay
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
