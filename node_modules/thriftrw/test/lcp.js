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
var lcp = require('../lib/lcp');

var prefixTests = [
    {strings: [], length: Infinity},
    {strings: [''], length: 0},
    {strings: ['a', 'b'], length: 0},
    {strings: ['ac', 'ab'], length: 1},
    {strings: ['aac', 'aab'], length: 2},
    {strings: ['aac', 'aab', 'aab'], length: 2},
    {strings: ['aaaa', 'aaa', 'aa', 'a'], length: 1}
];

test('lengths of common prefixes', function t(assert) {
    for (var i = 0; i < prefixTests.length; i++) {
        var prefixTest = prefixTests[i];
        assert.equal(
            lcp.lengthOfCommonPrefix(prefixTest.strings),
            prefixTest.length,
            'length of common prefix among ' +
            JSON.stringify(prefixTest.strings)
        );
    }
    assert.end();
});

var pathTests = [
    {paths: [
        '/home/luser/app/idl/alice/alice.thrift',
        '/home/luser/app/idl/bob/bob.thrift',
        '/home/luser/app/idl/charlie/charlie.thrift',
        '/home/luser/app/idl/common.thrift'
    ], path: '/home/luser/app/idl/'},
    {paths: [
        '/home/luser/app/idl/alice/alice.thrift',
        '/home/luser/app/idl/alice.thrift'
    ], path: '/home/luser/app/idl/'},
    {paths: [
        '/home/luser/app/idl/alice',
        '/home/luser/app/idl/bob'
    ], path: '/home/luser/app/idl/'},
    {paths: [
        '/home/luser/app/idl/',
        '/home/luser/app/idl/'
    ], path: '/home/luser/app/idl/'},
    {paths: [
        'service.thrift'
    ], path: ''},
    {paths: [
        '/home/luser/app/idl/service.thrift'
    ], path: '/home/luser/app/idl/'}
];

test('common parent directory', function t(assert) {
    for (var i = 0; i < pathTests.length; i++) {
        var pathTest = pathTests[i];
        assert.equal(
            lcp.longestCommonPath(pathTest.paths),
            pathTest.path,
            'length of common parent directory among ' +
            JSON.stringify(pathTest.paths)
        );
    }
    assert.end();
});
