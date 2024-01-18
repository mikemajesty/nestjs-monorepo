var util = require('util');
var Transform = require('stream').Transform;
var ChunkedHexTransform = require('./chunked_hex_transform');

module.exports = HexSpy;

function HexSpy(sink, options) {
    if (!(this instanceof HexSpy)) {
        return new HexSpy(sink, options);
    }
    // istanbul ignore next
    if (!options) options = {};
    // istanbul ignore else
    if (options.highWaterMark === undefined) {
        options.highWaterMark = 1;
    }
    var self = this;
    Transform.call(self, options);
    self.hex = ChunkedHexTransform(options);
    self.hex.pipe(sink);
}
util.inherits(HexSpy, Transform);

HexSpy.prototype._transform = function _transform(chunk, encoding, callback) {
    var self = this;
    self.hex.write(chunk, encoding, function writeDone() {
        self.push(chunk);
        callback();
    });
};

HexSpy.prototype._flush = function _flush(callback) {
    var self = this;
    self.hex.end(null, null, callback);
};
