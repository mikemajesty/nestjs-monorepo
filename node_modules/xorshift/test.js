
var test = require('tap').test;
var xorshift = require('./xorshift.js');

var reference = require('./reference.json');

function hexview(arr) {
  var a = arr[0].toString(16);
  var b = arr[1].toString(16);

  a = (new Array(9 - a.length)).join(0) + a;
  b = (new Array(9 - b.length)).join(0) + b;

  return (a + b).toUpperCase();
}

function floatview(d) {
  // Makes sure that the exponent has two digets like in C-printf
  var s = d.toExponential(20);
  var m = s.match(/^([0-9.]+)e(\+|-)([0-9]+)$/);
  var e = (m[3].length === 1) ? '0' + m[3] : m[3];
  return m[1] + 'e' + m[2] + e;
}

test('random double', function (t) {
  t.test('with seed = [1, 2]', function (t) {
    var ref = reference.double['1-2'];
    var rng = xorshift.constructor([0, 1, 0, 2]);
    for (var i = 0; i < ref.length; i++) {
      t.equal(floatview(rng.random()), ref[i]);
    }

    t.end();
  });

  t.test('with seed = [3, 4]', function (t) {
    var ref = reference.double['3-4'];
    var rng = xorshift.constructor([0, 3, 0, 4]);
    for (var i = 0; i < ref.length; i++) {
      t.equal(floatview(rng.random()), ref[i]);
    }

    t.end();
  });

  t.end();
});

test('random int array', function (t) {
  t.test('with seed = [1, 2]', function (t) {
    var ref = reference.integer['1-2'];
    var rng = xorshift.constructor([0, 1, 0, 2]);
    for (var i = 0; i < ref.length; i++) {
      t.strictEqual(hexview(rng.randomint()), ref[i]);
    }

    t.end();
  });

  t.test('with seed = [3, 4]', function (t) {
    var ref = reference.integer['3-4'];
    var rng = xorshift.constructor([0, 3, 0, 4]);
    for (var i = 0; i < ref.length; i++) {
      t.strictEqual(hexview(rng.randomint()), ref[i]);
    }

    t.end();
  });

  t.end();
});

test('default instance', function (t) {
  t.test('random int', function (t) {
    // demand that the 100 first outputs are different
    var obj = Object.create(null);
    for (var i = 0; i< 100; i++) {
      obj[hexview(xorshift.randomint())] = 1;
    }
    t.equal(Object.keys(obj).length, 100);
    t.end();
  });

  t.test('random double', function (t) {
    // demand that the 100 first outputs are different
    var obj = Object.create(null);
    for (var i = 0; i< 100; i++) {
      var rand = xorshift.random();
      obj[rand.toExponential(20)] = 1;
      t.ok(rand >= 0 && rand < 1, 'random double is [0, 1)');
    }
    t.equal(Object.keys(obj).length, 100);
    t.end();
  });
  t.end();
});

test('bad initialization', function (t) {
  t.test('wrong input type', function (t) {
    var error = null;
    try {
      xorshift.constructor("0102");
    } catch (e) { error = e; }

    t.equal(error.name, 'TypeError');
    t.equal(error.message, 'seed must be an array with 4 numbers');
    t.end();
  });

  t.test('wrong array length', function (t) {
    var error = null;
    try {
      xorshift.constructor([1, 2, 0]);
    } catch (e) { error = e; }

    t.equal(error.name, 'TypeError');
    t.equal(error.message, 'seed must be an array with 4 numbers');
    t.end();
  });

  t.end();
});

test('constructor export', function (t) {
  t.equal(xorshift.constructor, xorshift.XorShift);
  t.end();
});
