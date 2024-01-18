var test = require('tape');

var hex = require('../index');

test('hex(0 bytes)', function t(assert) {
    var buf = Buffer(0);
    assert.equal(hex(buf), '');
    assert.equal(hex(buf, {
        nullHuman: 'DNE'
    }),
        '00:                                          DNE',
        'empty with null accordance');
    assert.end();
});

test('hex(8 bytes)', function t(assert) {
    assert.equal(hex(Buffer([
        0x01, 0x02,
        0x03, 0x04,
        0x05, 0x06,
        0x07, 0x08
    ])),
        '00: 0102 0304 0506 0708                      ........');
    assert.end();
});

test('hex(16 bytes w/ cat)', function t(assert) {
    assert.equal(hex(Buffer([
        0x00, 0x01,
        0x02, 0x03,
        0x04, 0x05,
        0x06, 0x63,
        0x61, 0x74,
        0x0a, 0x0b,
        0x0c, 0x0d,
        0x0e, 0x0f
    ])),
        '00: 0001 0203 0405 0663 6174 0a0b 0c0d 0e0f  .......cat......');
    assert.end();
});

test('hex(24 bytes w/ dog & cat)', function t(assert) {
    assert.equal(hex(Buffer([
        0x00, 0x01,
        0x02, 0x03,
        0x04, 0x05,
        0x06, 0x63,
        0x61, 0x74,
        0x0a, 0x0b,
        0x0c, 0x0d,
        0x0e, 0x0f,
        0x10, 0x11,
        0x12, 0x64,
        0x6f, 0x67,
        0x16, 0x17,
    ])),
        '00: 0001 0203 0405 0663 6174 0a0b 0c0d 0e0f  .......cat......\n' +
        '10: 1011 1264 6f67 1617                      ...dog..');
    assert.end();
});

test('nullHuman works', function t(assert) {
    assert.equal(hex(Buffer(0), {
        nullHuman: 'empty'
    }), '00:                                          empty');
    assert.end();
});

test('hex(24 bytes w/ dog & cat + nullHuman option)', function t(assert) {
    assert.equal(hex(Buffer([
        0x00, 0x01,
        0x02, 0x03,
        0x04, 0x05,
        0x06, 0x63,
        0x61, 0x74,
        0x0a, 0x0b,
        0x0c, 0x0d,
        0x0e, 0x0f,
        0x10, 0x11,
        0x12, 0x64,
        0x6f, 0x67,
        0x16, 0x17,
    ]), {
        nullHuman: 'empty'
    }),
        '00: 0001 0203 0405 0663 6174 0a0b 0c0d 0e0f  .......cat......\n' +
        '10: 1011 1264 6f67 1617                      ...dog..');
    assert.end();
});

test('hex(24 bytes w/ dog & cat + offsetWidth option)', function t(assert) {
    assert.equal(hex(Buffer([
        0x00, 0x01,
        0x02, 0x03,
        0x04, 0x05,
        0x06, 0x63,
        0x61, 0x74,
        0x0a, 0x0b,
        0x0c, 0x0d,
        0x0e, 0x0f,
        0x10, 0x11,
        0x12, 0x64,
        0x6f, 0x67,
        0x16, 0x17,
    ]), {
        offsetWidth: 4
    }),
        '0000: 0001 0203 0405 0663 6174 0a0b 0c0d 0e0f  .......cat......\n' +
        '0010: 1011 1264 6f67 1617                      ...dog..');
    assert.end();
});

test('hex(string)', function t(assert) {
    assert.equal(hex('what even is a buffer?'),
        '00: 7768 6174 2065 7665 6e20 6973 2061 2062  what even is a b\n' +
        '10: 7566 6665 723f                           uffer?');
    assert.end();
});

test('hex(invalid)', function t(assert) {
    assert.throws(function() {
        hex(undefined);
    }, 'no hex(undefined)');
    assert.throws(function() {
        hex(null);
    }, 'no hex(null)');
    assert.throws(function() {
        hex(123);
    }, 'no hex(number)');
    assert.throws(function() {
        hex([]);
    }, 'no hex(Array)');
    assert.throws(function() {
        hex({});
    }, 'no hex(Object)');
    assert.end();
});
