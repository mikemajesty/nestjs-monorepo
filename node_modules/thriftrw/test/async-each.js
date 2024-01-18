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

var test = require('tape');
var asyncEach = require('../lib/async-each.js');

test('ensure handle parameter not called after error', function t(assert) {
     var nbTimesCalled = 0;
     function errorHandle(elt, cb) {
         nbTimesCalled++;
         cb('error')
     }

     asyncEach([1, 2, 3], errorHandle, function (err) {
         assert.ok(err, 'Expected an error')
     });

     assert.equal(nbTimesCalled, 1, 'errorHandle should have been called once');
     assert.end();
 })

function mockHandle(elt, cb) {
    cb();
}

function conditionalErrorHandle(elt, cb) {
    if (elt === 'error') {
        return cb('failure');
    }
    cb();
}

function doubleCallbackCallHandle(elt, cb) {
    cb();
    cb();
}

function asyncConditionalErrorHandle(elt, cb) {
    setTimeout(function () {
        if (elt === 'error') {
            return cb('failure');
        }
        cb();
    }, 10);
}

var asyncEachTests = [
    {expectError: false, iterator: [], handle: mockHandle},
    {expectError: false, iterator: [''], handle: mockHandle},

    {expectError: false, iterator: ['no-error', 'no-error'], handle: conditionalErrorHandle},
    {expectError: true, iterator: ['no-error', 'error'], handle: conditionalErrorHandle},
    {expectError: true, iterator: ['error', 'no-error'], handle: conditionalErrorHandle},
    {expectError: true, iterator: ['error', 'error'], handle: conditionalErrorHandle},

    {expectError: false, iterator: ['no-error', 'no-error'], handle: asyncConditionalErrorHandle},
    {expectError: true, iterator: ['no-error', 'error'], handle: asyncConditionalErrorHandle},
    {expectError: true, iterator: ['error', 'no-error'], handle: asyncConditionalErrorHandle},
    {expectError: true, iterator: ['error', 'error'], handle: asyncConditionalErrorHandle},

    {expectError: true, iterator: ['', ''], handle: doubleCallbackCallHandle},
    {expectError: false, iterator: [''], handle: doubleCallbackCallHandle}
];

for (var i = 0; i < asyncEachTests.length; i++) {
    test('asyncEach test number ' + i, function () {
        var index = i;
        return function t(assert) {
            assert.plan(1);
            var asyncEachTest = asyncEachTests[index];
            var nbCalled = 0;
            asyncEach(asyncEachTest.iterator, asyncEachTest.handle, function (err) {
                nbCalled++;
                if (nbCalled > 1) {
                    assert.fail('Callback should only be called once');
                }
                if (asyncEachTest.expectError) {
                    assert.ok(err, 'Expected an error');
                } else {
                    assert.notOk(err, 'Expected no error');
                }
            });
        }
    }());
}
