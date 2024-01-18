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

'use strict';

// Inspired by the eachOf function of the async package.
// Calls the callback 'cb' once all elements in the iterator have been processed
// by the 'handle' function. An error will be passed as agument in case 'handle'
// fails for some element of the iterator.

function handleCb(sharedData, cb) {
    var handleCbCalled = false;
    return function (err) {
        if (sharedData.done) {
            return;
        }
        if (err) {
            sharedData.done = true;
            return cb(err);
        }

        if (handleCbCalled) {
            sharedData.done = true;
            return cb(Error('Called asyncEach handle argument twice'));
        }
        handleCbCalled = true;

        sharedData.count--;
        if (sharedData.count === 0) {
            sharedData.done = true;
            cb(undefined);
        }
    };
}

function asyncEach(iterator, handle, cb) {
    if (iterator.length === 0) {
        return cb(undefined);
    }
    var sharedData = {done: false, count: iterator.length};
    for (var index = 0; index < iterator.length; index++) {
        if (sharedData.done) {
            return;
        }
        handle(iterator[index], handleCb(sharedData, cb));
    }
}

module.exports = asyncEach;
