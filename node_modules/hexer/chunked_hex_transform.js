'use strict';

var util = require('util');
var HexTransform = require('./hex_transform');

function ChunkedHexTransform(options) {
    if (!(this instanceof ChunkedHexTransform)) {
        return new ChunkedHexTransform(options);
    }
    // istanbul ignore next
    if (!options) options = {};
    HexTransform.call(this, options);
    var self = this;
    if (typeof options.header === 'function') {
        self.header = options.header;
    } else if (typeof options.header === 'object') {
        self.header = simpleHeader(options.header);
    } else if (typeof options.header === 'string') {
        self.header = simpleHeader({
            label: options.header
        });
    } else {
        self.header = simpleHeader();
    }
    self.chunkNum = 0;
}
util.inherits(ChunkedHexTransform, HexTransform);

ChunkedHexTransform.prototype._transform = function transform(chunk, encoding, done) {
    var self = this;
    // istanbul ignore next
    if (self.totalOffset) {
        self.reset();
    }

    ++self.chunkNum;
    var header = self.header(self.chunkNum, chunk);
    if (header.length) {
        self.push(header);
    }

    HexTransform.prototype._transform.call(self, chunk, encoding, function subDone(err) {
        self.reset();
        done(err);
    });
};

function simpleHeader(opts) {
    opts = opts || {};
    var fmt = '-- ';
    if (opts.label) fmt += opts.label + ' ';
    fmt += 'chunk[%s] length: %s (0x%s)\n';
    return function header(chunkNum, chunk) {
        var len = chunk.length;
        var hexlen = len.toString(16);
        return util.format(fmt, chunkNum, len, hexlen);
    };
}

module.exports = ChunkedHexTransform;
