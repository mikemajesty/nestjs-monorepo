"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBodyParserOptions = void 0;
const rawBodyParser = (req, _res, buffer) => {
    if (Buffer.isBuffer(buffer)) {
        req.rawBody = buffer;
    }
    return true;
};
function getBodyParserOptions(rawBody, options) {
    let parserOptions = (options || {});
    if (rawBody === true) {
        parserOptions = {
            ...parserOptions,
            verify: rawBodyParser,
        };
    }
    return parserOptions;
}
exports.getBodyParserOptions = getBodyParserOptions;
