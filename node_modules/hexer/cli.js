#!/usr/bin/env node

'use strict';

var process = require('process');
var parseArgs = require('minimist');

var HexTransform = require('./hex_transform');
var ChunkedHexTransform = require('./chunked_hex_transform');

var argv = process.argv.slice(2);
var args = parseArgs(argv, {
    boolean: {
        chunked: true,
        colored: true
    },
    alias: {
        C: 'colored',
        c: 'cols',
        g: 'group'
    }
});

var options = {
    cols: parseInt(args.cols, 10),
    group: parseInt(args.group, 10),
    colored: args.colored
};

var trans;
if (args.chunked) {
    trans = new ChunkedHexTransform(options);
} else {
    trans = new HexTransform(options);
}

process.stdin
    .pipe(trans)
    .pipe(process.stdout);
