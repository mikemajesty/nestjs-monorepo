var PassThrough = require('stream').PassThrough;
var test = require('tape');
var expectReadableStream = require('./lib/expect_readable_stream');

var HexSpy = require('../hex_spy');

testSpyStream('hello world', [
    'hello', 'world'
], [
    '-- chunk[1] length: 5 (0x5)\n',
    '00000000: 6865 6c6c 6f                             hello\n',
    '-- chunk[2] length: 5 (0x5)\n',
    '00000000: 776f 726c 64                             world\n'
]);

// var much = [
//     'much data ddaattaa dadatata',
//     'many bytes bbby-yie-yie-tuh-suh'
// ];
// var muchOut = [
//     '00000000: 6d75 6368 2064 6174 6120 6464 6161 7474  much data ddaatt\n',
//     '00000010: 6161 2064 6164 6174 6174 61              aa dadatata\n',
//     '00000000: 6d61 6e79 2062 7974 6573 2062 6262 792d  many bytes bbby-\n',
//     '00000010: 7969 652d 7969 652d 7475 682d 7375 68    yie-yie-tuh-suh\n'
// ];

// testSpyStream('much bytes', much, [
//     '-- chunk[1] length: 27 (0x1b)\n',
//     muchOut[0], muchOut[1],
//     '-- chunk[2] length: 31 (0x1f)\n',
//     muchOut[2], muchOut[3]
// ]);

// testSpyStream('much bytes w/ header label', {
//     header: 'much'
// }, much, [
//     '-- much chunk[1] length: 27 (0x1b)\n',
//     muchOut[0], muchOut[1],
//     '-- much chunk[2] length: 31 (0x1f)\n',
//     muchOut[2], muchOut[3]
// ]);

// testSpyStream('much bytes w/ header opts', {
//     header: {
//         label: 'much'
//     }
// }, much, [
//     '-- much chunk[1] length: 27 (0x1b)\n',
//     muchOut[0], muchOut[1],
//     '-- much chunk[2] length: 31 (0x1f)\n',
//     muchOut[2], muchOut[3]
// ]);

// testSpyStream('much bytes w/ header func', {
//     header: function(chunkNum) {
//         return (chunkNum === 1 ? 'much' : 'many') + '\n';
//     }
// }, much, [
//     'much\n',
//     muchOut[0], muchOut[1],
//     'many\n',
//     muchOut[2], muchOut[3]
// ]);

// testSpyStream('much bytes w/ no header', {
//     header: function() {return '';}
// }, much, [
//     muchOut[0], muchOut[1],
//     muchOut[2], muchOut[3]
// ]);

function testSpyStream(name, options, parts, expectedLines) {
    if (arguments.length === 3) {
        expectedLines = parts;
        parts = options;
        options = {};
    }
    test('HexSpy: ' + name, function t(assert) {
        var stream = PassThrough();
        var sink = PassThrough({
            encoding: 'utf8'
        });
        var spy = HexSpy(sink, options);

        stream.pipe(spy);
        parts.forEach(function eachPart(part) {
            stream.write(part);
        });
        stream.end();

        var expected = expectedLines.map(function expectSinkLine(expectedLine, i) {
            return function gotData(gotLine) {
                assert.equal(gotLine, expectedLine, 'expected sink line[' + i + ']');
            };
        });

        var expectedPass = parts.map(function expectedPassChunk(part, i) {
            var expectedChunk = Buffer(part);
            return function gotData(gotChunk) {
                assert.deepEqual(gotChunk, expectedChunk, 'expected pass chunk[' + i + ']');
            };
        });

        var done = 0;
        expectReadableStream(spy, expectedPass, function expectDone(err) {
            assert.ifError(err, 'no error from spy stream expectations');
            if (++done >= 2) assert.end();
        });
        expectReadableStream(sink, expected, function expectDone(err) {
            assert.ifError(err, 'no error from sink stream expectations');
            if (++done >= 2) assert.end();
        });
    });
}
