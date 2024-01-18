"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamableFile = void 0;
const stream_1 = require("stream");
const util_1 = require("util");
const enums_1 = require("../enums");
const shared_utils_1 = require("../utils/shared.utils");
const services_1 = require("../services");
/**
 * @see [Streaming files](https://docs.nestjs.com/techniques/streaming-files)
 *
 * @publicApi
 */
class StreamableFile {
    constructor(bufferOrReadStream, options = {}) {
        this.options = options;
        this.logger = new services_1.Logger('StreamableFile');
        this.handleError = (err, res) => {
            if (res.destroyed) {
                return;
            }
            if (res.headersSent) {
                res.end();
                return;
            }
            res.statusCode = enums_1.HttpStatus.BAD_REQUEST;
            res.send(err.message);
        };
        this.logError = (err) => {
            this.logger.error(err.message, err.stack);
        };
        if (util_1.types.isUint8Array(bufferOrReadStream)) {
            this.stream = new stream_1.Readable();
            this.stream.push(bufferOrReadStream);
            this.stream.push(null);
            this.options.length ??= bufferOrReadStream.length;
        }
        else if (bufferOrReadStream.pipe && (0, shared_utils_1.isFunction)(bufferOrReadStream.pipe)) {
            this.stream = bufferOrReadStream;
        }
    }
    getStream() {
        return this.stream;
    }
    getHeaders() {
        const { type = 'application/octet-stream', disposition = undefined, length = undefined, } = this.options;
        return {
            type,
            disposition,
            length,
        };
    }
    get errorHandler() {
        return this.handleError;
    }
    setErrorHandler(handler) {
        this.handleError = handler;
        return this;
    }
    get errorLogger() {
        return this.logError;
    }
    setErrorLogger(handler) {
        this.logError = handler;
        return this;
    }
}
exports.StreamableFile = StreamableFile;
