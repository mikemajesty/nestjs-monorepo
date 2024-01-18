'use strict';

var color = require('ansi-color').set;
var extend = require('xtend');
var extendInto = require('xtend/mutable');

var render = require('./render');
var hex = require('./index');

module.exports = diff;

// TODO: provide a stream for this

function diff(a, b, opts) {
    var defaults = {
        emptyHuman: ' '
    };
    var aopts = extend(opts.hexOpts, defaults);
    var bopts = extend(opts.hexOpts, defaults);

    if (opts.colored) {
        extendInto(aopts, render.coloredOptions);
        extendInto(bopts, render.coloredOptions);
        opts.decorateDivide = coloredDivide;
        opts.decorateDiffA = coloredDiffA;
        opts.decorateDiffB = coloredDiffB;
    }

    if (opts.decorateDiffA) {
        aopts.decorateHexen = highlightA;
        aopts.decorateHuman = highlightA;
    }

    if (opts.decorateDiffB) {
        bopts.decorateHexen = highlightB;
        bopts.decorateHuman = highlightB;
    }

    var adump = hex(a, aopts).split('\n');
    var bdump = hex(b, bopts).split('\n');

    return adump.map(function each(aline, i) {
        var bline = bdump[i];
        var differs = aline !== bline;
        var sep = differs ? '|' : ' ';
        if (opts.decorateDivide) {
            sep = opts.decorateDivide(sep, differs);
        }
        return aline + ' ' + sep + ' ' + bline;
    }).join('\n');

    function highlightA(i, j, str) {
        if (a[i] !== b[i]) {
            str = opts.decorateDiffA(render.stripColor(str));
        }
        return str;
    }

    function highlightB(i, j, str) {
        if (a[i] !== b[i]) {
            str = opts.decorateDiffB(render.stripColor(str));
        }
        return str;
    }
}

function coloredDivide(str, differs) {
    if (differs) {
        str = color(str, 'blue+bold');
    }
    return str;
}

function coloredDiffA(str) {
    return color(str, 'red+bold');
}

function coloredDiffB(str) {
    return color(str, 'green+bold');
}
