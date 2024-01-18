"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingLogger = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
const common_1 = require("@nestjs/common");
/**
 * @publicApi
 */
class TestingLogger extends common_1.ConsoleLogger {
    constructor() {
        super('Testing');
    }
    log(message) { }
    warn(message) { }
    debug(message) { }
    verbose(message) { }
    error(message, ...optionalParams) {
        return super.error(message, ...optionalParams);
    }
}
exports.TestingLogger = TestingLogger;
