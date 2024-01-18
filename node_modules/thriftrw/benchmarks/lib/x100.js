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

/* eslint-disable max-statements */

'use strict';

function X100(job) {
    this.job = job;
}

X100.prototype.bench = function bench() {
    // 1 block of 10
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    // 2
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    // 3
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    // 4
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    // 5
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    // 6
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    // 7
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    // 8
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    // 9
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    // 10
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
    this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench(); this.job.bench();
};

module.exports = X100;
