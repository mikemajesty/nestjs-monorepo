var test = require('tape');

var hex = require('../index');

test('colored options', function t(assert) {
    var buf = Buffer('abc');

    assert.deepEqual(hex(buf, {
        colored: true
    }).split(/\n/), [
        '00\x1b[36m:\x1b[0m 6162 63                                  abc'
    ], 'expected basic output');

    assert.deepEqual(hex(buf, {
        colored: true,
        headSep: '> '
    }).split(/\n/), [
        '00> 6162 63                                  abc'
    ], 'expected custom headSep');

    buf = Buffer([0]);
    assert.deepEqual(hex(buf, {
        colored: true
    }).split(/\n/), [
        '00\x1b[36m:\x1b[0m 00                                       \x1b[30m\x1b[1m.\x1b[0m'
    ], 'expected human rendering');

    buf = Buffer([0]);
    assert.deepEqual(hex(buf, {
        colored: true,
        renderHuman: function renderColoredHuman(c) {
            return (c > 0x1f && c < 0x7f) ? String.fromCharCode(c) : '.';
        }
    }).split(/\n/), [
        '00\x1b[36m:\x1b[0m 00                                       .'
    ], 'expected ability to override renderHuman');

    assert.end();
});
