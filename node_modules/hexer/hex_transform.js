"use strict";

var extend = require('xtend');
var util = require('util');
var Transform = require('stream').Transform;
var render = require('./render');

function HexTransform(options) {
    if (!(this instanceof HexTransform)) {
        return new HexTransform(options);
    }
    // istanbul ignore next
    if (!options) options = {};
    if (options.colored) options = extend(render.coloredOptions, options);
    Transform.call(this, options);
    var self = this;
    self.options = options;
    self.prefix = self.options.prefix || '';
    self.cols = self.options.cols || 16;
    self.group = self.options.group || 2;
    self.gutter = self.options.gutter || 0;
    // istanbul ignore if
    self.annotateLine = options.annotateLine || null;
    self.decorateHexen = self.options.decorateHexen || noopDecorate;
    self.decorateHuman = self.options.decorateHuman || noopDecorate;
    self.renderHexen = self.options.renderHexen || render.byte2hex;
    self.renderHuman = self.options.renderHuman || render.byte2char;
    // istanbul ignore next
    self.groupSeparator = self.options.groupSeparator === undefined ? ' ' : self.options.groupSeparator;
    self.headSep = self.options.headSep === undefined ? ': ' : self.options.headSep;
    // istanbul ignore next
    self.divide = self.options.divide === undefined ? '  ' : self.options.divide;
    // istanbul ignore next
    self.emptyHexen = self.options.emptyHexen === undefined ? '  ' : self.options.emptyHexen;
    self.emptyHuman = self.options.emptyHuman || '';
    self.nullHuman = self.options.nullHuman || '';
    self.offsetWidth = self.options.offsetWidth || 8;
    self.gutter = Math.max(self.offsetWidth, self.gutter);
    self.line = '';
    self.hexen = '';
    self.human = '';
    self.reset();
}
util.inherits(HexTransform, Transform);

HexTransform.prototype.reset = function reset() {
    var self = this;
    self._finishLine();
    self.screenOffset = 0;
    self.totalOffset = 0;
};

HexTransform.prototype._transform = function transform(chunk, encoding, done) {
    var self = this;
    for (var offset=0; offset<chunk.length; offset++) {
        if (self.screenOffset % self.cols === 0) {
            self._finishLine();
            self._startLine();
        }
        self._addByte(chunk[offset]);
    }
    done(null);
};

HexTransform.prototype._flush = function flush(done) {
    var self = this;
    if (self.totalOffset === 0 && self.nullHuman) {
        self._startLine();
        self.human += self.nullHuman;
    }
    self._finishLine();
    done(null);
};

HexTransform.prototype._startLine = function startLine() {
    var self = this;
    var head = render.pad('0', self.totalOffset.toString(16), self.offsetWidth);
    self.line = self.prefix + render.pad(' ', head, self.gutter) + self.headSep;
};

HexTransform.prototype._finishLine = function finishLine() {
    var self = this;
    if (self.line.length) {
        var rem = self.screenOffset % self.cols;
        if (rem !== 0 || (self.totalOffset === 0 && self.nullHuman)) {
            rem = self.cols - rem;
            for (var i=0; i<rem; i++) {
                self._addEmpty();
            }
        }
        self.line += self.hexen + self.divide + self.human;
        // istanbul ignore if
        if (self.annotateLine) {
            self.line += self.annotateLine(self.totalOffset - self.cols, self.totalOffset);
        }
        self.line += '\n';
        self.push(self.line);
        self.line = '';
        self.hexen = '';
        self.human = '';
    }
};

HexTransform.prototype._addEmpty = function addEmpty() {
    var self = this;
    self._addPart(self.emptyHexen, self.emptyHuman);
};

HexTransform.prototype._addByte = function addByte(b) {
    var self = this;
    var hexen = self.renderHexen(b);
    var human = self.renderHuman(b);
    self._addPart(hexen, human, b);
};

HexTransform.prototype._addPart = function addByte(hexen, human, b) {
    var self = this;
    hexen = self.decorateHexen(self.totalOffset, self.screenOffset, hexen, b);
    human = self.decorateHuman(self.totalOffset, self.screenOffset, human, b);
    var isStartOfRow = self.screenOffset % self.cols === 0;
    var isStartOfGroup = self.screenOffset % self.group === 0;
    if (!isStartOfRow && isStartOfGroup) {
        self.hexen += self.groupSeparator;
    }
    self.hexen += hexen;
    self.human += human;
    self.totalOffset++;
    self.screenOffset++;
};

function noopDecorate(offset, screenOffset, s) {
    return s;
}

module.exports = HexTransform;
