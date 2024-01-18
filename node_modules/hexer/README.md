# CLI Usage

```shell
$ </bin/ls hexer
```

# API Usage

## Simple mode: buffer -> string

Got as buffer? We can render it:

```javascript
var hex = require('hexer');
console.log(hex(someBuffer));
```

## Simply steram spy mode: in -> hex.Spy (->sink) -> out

Want to see what's going through a stream?

```
var hex = require('hexer');

stream
    .pipe(hex.Spy(process.stdout)) // argument is where to dump to
    .pipe(somewhere);              // normal output flows through
```


## Simple streaming mode: in -> hex.Transform -> out

Got a stream? We can render it:

```javascript
var hex = require('hexer');
process.stdin
    .pipe(hex.Transform())
    .pipe(process.stdout);
```

## Chunked streaming mode: in -> hex.ChunkedTransform -> out

Got a stream? We can render each of its chunks:

```javascript
var hex = require('hexer');
process.stdin
    .pipe(hex.ChunkedTransform())
    .pipe(process.stdout);
```

## Advanced chunked streaming mode

Finally you can control the sessionization yourself if that makes sense:

```javascript
var hex = require('hexer');
var hexer = hex.Transform();
hexer.pipe(process.stdout);

process.stdin.on('data', function onData(chunk) {
    if (decideToReset(chunk)) {
        hexer.reset();
    }
    hexer.write(chunk);
});
```

However that example is a bit contrived, a more realistic example would be:

```javascript
var hex = require('hexer');
var hexer = hex.Transform();
hexer.pipe(process.stdout);

process.stdin.on('data', function onData(chunk) {
    var i = findBoundary(chunk);
    while (i > 0) {
        hexer.write(chunk.slice(0, i));
        hexer.reset();
        chunk = chunk.slice(i);
        i = findBoundary(chunk);
    }
    if (chunk.length) {
        hexer.write(chunk);
    }
});
```

## Options

- prefix: a string that will be printed at the beginning of every line.
  (default empty string, "")

- cols: the number of bytes to display on each line (default 16)

- group: the number of bytes to display adjacently (default 2)

- groupSeparator: a string that appears between byte groups (default one
  space " ")

- headSep: a string that appears between the offset column and the byte
  column (default colon space, ": ")

- divide: a string that appears between the byte value column and the
  character representation column (default two spaces, "  ")

- gutter: the minimum width of the gutter, the region on the left that
  contains the byte offset that each line starts with. (default 0)

- offsetWidth: the minimum number of digits to display in the byte offset
  column.

- decorateHexen(totalOffset, screenOffset, hexen):
  A function that has an opportunity to alter the numeric representation of a
  byte.
  Decoration is typically used to change the color of the byte based on its
  position in the stream or position in the line.

- decorateHuman(totalOffset, screenOffset, human, byte):
  A function that has an opportunity to alter the appearance of a given
  human-readable representation of a byte.
  Decoration is typically used to change the color of the byte based on its
  position in the stream, position on the line, its representation, or its
  value.

- renderHexen(byte):
  a function that accepts a byte value and returns a hexen readable, two
  character representation of that byte.
  By default, the hexen representation is lower-case zero-padded hex.

- renderHuman(byte):
  a function that accepts a byte value and returns a human readable, single
  character representation of that byte.
  By default, the human representation is the character itself for all
  printable ASCII characters, and a period "." for control characters and
  EASCII bytes.

- emptyHexen: a two character representation of a non-existant byte at a
  particular offset for the byte value representation. (default spaces, "  ")

- emptyHuman: the representation of a non-existant byte in the human readable
  characters column (default null string, "")

- nullHuman: if an entire buffer or stream is empty, the default behavior
  is to represent it as an empty string or stream.
  With this option, the empty line will be expressly rendered, with offset
  zero, empty byte columns, and this string in the human readable characters
  section.

- colored: if set true, enables ANSI coloring of output

## License and Copyright

Copyright (c) 2015 Joshua T Corbin and contributors.
All rights reserved.
MIT License.
