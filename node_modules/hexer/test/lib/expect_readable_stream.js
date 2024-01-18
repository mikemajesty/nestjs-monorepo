var TypedError = require('error/typed');

var MoreDataThanExpectedError = TypedError({
    type: 'more-data-than-expected',
    message: 'got more data than expected',
    numGot: null,
    numExpected: null,
    data: null
});

var LessDataThanExpectedError = TypedError({
    type: 'less-data-than-expected',
    message: 'got less data than expected',
    numGot: null,
    numExpected: null
});

function expectReadableStream(stream, expectedData, done) {
    var finished = false;
    var expectedI = 0;
    var numGot = 0;
    var unexpected = [];
    stream.on('data', onData);
    stream.on('error', finish);
    stream.on('end', finish);
    function onData(data) {
        numGot++;
        if (expectedI >= expectedData.length) {
            unexpected.push(data);
        } else {
            var expected = expectedData[expectedI++];
            expected(data);
        }
    }
    function finish(err) {
        if (finished) return;
        finished = true;
        stream.removeListener('error', finish);
        stream.removeListener('end', finish);
        if (err) {
            done(err);
        } else if (unexpected.length) {
            done(MoreDataThanExpectedError({
                numGot: numGot,
                numExpected: expectedData.length,
                data: unexpected
            }));
        } else if (expectedI < expectedData.length-1) {
            done(LessDataThanExpectedError({
                numGot: numGot,
                numExpected: expectedData.length
            }));
        } else {
            done(null);
        }
    }
}

module.exports = expectReadableStream;
