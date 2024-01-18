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
var fs = require('fs');
var path = require('path');
var Buffer = require('buffer').Buffer;

var Thrift = require('../thrift').Thrift;
var ThriftUnrecognizedException = require('../unrecognized-exception')
    .ThriftUnrecognizedException;

var sourceV1 = fs.readFileSync(path.join(__dirname, 'unrecognized-exception-v1.thrift'), 'utf-8');
var sourceV2 = fs.readFileSync(path.join(__dirname, 'unrecognized-exception-v2.thrift'), 'utf-8');
var thriftV1 = new Thrift({source: sourceV1});
var thriftV2 = new Thrift({source: sourceV2});

test('Exception RW', function t(assert) {

    var err = new Error('Bogus Error: Voldemort');
    err.string = 'ThriftException';
    err.bool = true;
    err.byte = 0x00;
    err.i16 = 0x1234;
    err.i32 = 0x12345678;
    err.i64 = (Buffer.from || Buffer)([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]);
    err.double = 1;
    err.binary = (Buffer.from || Buffer)('binary');
    err.struct = {
        edges: {
            'abc': 1,
            'def': 2,
            'ghi': 3
        },
        stringset: ['a', 'b', 'c'],
        boollist: [true, true, false]
    };

    var v2Result = new thriftV2.BogusService.bogus.result.Constructor({
        bogusErr: err
    });

    var v2Buf = thriftV2.BogusService.bogus.result.toBuffer(v2Result);

    var v1Result = thriftV1.BogusService.bogus.result.fromBuffer(v2Buf);

    assert.deepEqual(v1Result, {
        success: null,
        failure: new ThriftUnrecognizedException({
            1: err.string,
            2: err.bool,
            3: err.byte,
            4: err.i16,
            5: err.i32,
            6: err.i64,
            7: err.double,
            8: 'binary',
            9: {
                1: err.struct.edges,
                2: err.struct.stringset,
                3: err.struct.boollist
            }
        })
    }, 'Expected ThriftUnrecognizedException on result failure property');
    assert.end();
});
