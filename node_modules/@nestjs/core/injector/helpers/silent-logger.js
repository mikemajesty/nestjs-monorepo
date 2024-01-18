"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SilentLogger = void 0;
const common_1 = require("@nestjs/common");
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => { };
class SilentLogger extends common_1.Logger {
    constructor() {
        super(...arguments);
        this.log = noop;
        this.error = noop;
        this.warn = noop;
        this.debug = noop;
        this.verbose = noop;
        this.fatal = noop;
        this.setLogLevels = noop;
    }
}
exports.SilentLogger = SilentLogger;
