// Copyright (c) 2020 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/* global console */
/* eslint-disable no-console */
'use strict';

var Stats = require('fast-stats').Stats;
var longtime = require('./longtime');
var humanize = require('./humanize');
var X100 = require('./x100');

function benchCasesSync(cases) {
    var names = Object.keys(cases);
    for (var index = 0; index < names.length; index++) {
        var name = names[index];
        var job = new X100(cases[name]);
        var stats = benchSync(job, 3e9);
        summarize(name, stats);
    }
}

function summarize(name, stats) {
    console.log(
        'p25 %s p50 %s p75 %s p90 %s stddev %s q3-q1/2 %s %s',
        humanize.ns(stats.percentile(25)),
        humanize.ns(stats.percentile(50)),
        humanize.ns(stats.percentile(75)),
        humanize.ns(stats.percentile(90)),
        humanize.ns((stats.percentile(50) - stats.percentile(25)) / 2),
        humanize.ns(stats.stddev()),
        name
    );
}

function benchSync(job, duration) {
    var stats = new Stats();
    var ops = 0;
    var now = longtime();
    var prior;
    var end;

    // warmup
    end = now.add(duration);
    do {
        prior = longtime();
        job.bench();
        now = longtime();
    } while (now.lessThan(end));

    // for real
    end = now.add(duration);
    do {
        prior = longtime();
        job.bench();
        now = longtime();
        stats.push(now.subtract(prior).divide(100).toNumber());
        ops += 100;
    } while (now.lessThan(end));
    return stats;
}

module.exports.benchCasesSync = benchCasesSync;
module.exports.benchSync = benchSync;
