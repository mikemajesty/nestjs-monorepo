var xorshift = require('./xorshift');

var n = process.argv[2] || 5e7;

var tick = process.hrtime();
while(n--) {
   xorshift.random();
}
var tock = process.hrtime(tick);

console.log(tock[0] * 1e3 + tock[1] * 1e-6 + "ms");
