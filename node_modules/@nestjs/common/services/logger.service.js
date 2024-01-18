"use strict";
var Logger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tslib_1 = require("tslib");
const core_1 = require("../decorators/core");
const shared_utils_1 = require("../utils/shared.utils");
const console_logger_service_1 = require("./console-logger.service");
const utils_1 = require("./utils");
const DEFAULT_LOGGER = new console_logger_service_1.ConsoleLogger();
const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: '2-digit',
    month: '2-digit',
});
/**
 * @publicApi
 */
let Logger = Logger_1 = class Logger {
    constructor(context, options = {}) {
        this.context = context;
        this.options = options;
    }
    get localInstance() {
        if (Logger_1.staticInstanceRef === DEFAULT_LOGGER) {
            return this.registerLocalInstanceRef();
        }
        else if (Logger_1.staticInstanceRef instanceof Logger_1) {
            const prototype = Object.getPrototypeOf(Logger_1.staticInstanceRef);
            if (prototype.constructor === Logger_1) {
                return this.registerLocalInstanceRef();
            }
        }
        return Logger_1.staticInstanceRef;
    }
    error(message, ...optionalParams) {
        optionalParams = this.context
            ? (optionalParams.length ? optionalParams : [undefined]).concat(this.context)
            : optionalParams;
        this.localInstance?.error(message, ...optionalParams);
    }
    log(message, ...optionalParams) {
        optionalParams = this.context
            ? optionalParams.concat(this.context)
            : optionalParams;
        this.localInstance?.log(message, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        optionalParams = this.context
            ? optionalParams.concat(this.context)
            : optionalParams;
        this.localInstance?.warn(message, ...optionalParams);
    }
    debug(message, ...optionalParams) {
        optionalParams = this.context
            ? optionalParams.concat(this.context)
            : optionalParams;
        this.localInstance?.debug?.(message, ...optionalParams);
    }
    verbose(message, ...optionalParams) {
        optionalParams = this.context
            ? optionalParams.concat(this.context)
            : optionalParams;
        this.localInstance?.verbose?.(message, ...optionalParams);
    }
    fatal(message, ...optionalParams) {
        optionalParams = this.context
            ? optionalParams.concat(this.context)
            : optionalParams;
        this.localInstance?.fatal?.(message, ...optionalParams);
    }
    static error(message, ...optionalParams) {
        this.staticInstanceRef?.error(message, ...optionalParams);
    }
    static log(message, ...optionalParams) {
        this.staticInstanceRef?.log(message, ...optionalParams);
    }
    static warn(message, ...optionalParams) {
        this.staticInstanceRef?.warn(message, ...optionalParams);
    }
    static debug(message, ...optionalParams) {
        this.staticInstanceRef?.debug?.(message, ...optionalParams);
    }
    static verbose(message, ...optionalParams) {
        this.staticInstanceRef?.verbose?.(message, ...optionalParams);
    }
    static fatal(message, ...optionalParams) {
        this.staticInstanceRef?.fatal?.(message, ...optionalParams);
    }
    /**
     * Print buffered logs and detach buffer.
     */
    static flush() {
        this.isBufferAttached = false;
        this.logBuffer.forEach(item => item.methodRef(...item.arguments));
        this.logBuffer = [];
    }
    /**
     * Attach buffer.
     * Turns on initialization logs buffering.
     */
    static attachBuffer() {
        this.isBufferAttached = true;
    }
    /**
     * Detach buffer.
     * Turns off initialization logs buffering.
     */
    static detachBuffer() {
        this.isBufferAttached = false;
    }
    static getTimestamp() {
        return dateTimeFormatter.format(Date.now());
    }
    static overrideLogger(logger) {
        if (Array.isArray(logger)) {
            Logger_1.logLevels = logger;
            return this.staticInstanceRef?.setLogLevels(logger);
        }
        if ((0, shared_utils_1.isObject)(logger)) {
            if (logger instanceof Logger_1 && logger.constructor !== Logger_1) {
                const errorMessage = `Using the "extends Logger" instruction is not allowed in Nest v9. Please, use "extends ConsoleLogger" instead.`;
                this.staticInstanceRef.error(errorMessage);
                throw new Error(errorMessage);
            }
            this.staticInstanceRef = logger;
        }
        else {
            this.staticInstanceRef = undefined;
        }
    }
    static isLevelEnabled(level) {
        const logLevels = Logger_1.logLevels;
        return (0, utils_1.isLogLevelEnabled)(level, logLevels);
    }
    registerLocalInstanceRef() {
        if (this.localInstanceRef) {
            return this.localInstanceRef;
        }
        this.localInstanceRef = new console_logger_service_1.ConsoleLogger(this.context, {
            timestamp: this.options?.timestamp,
            logLevels: Logger_1.logLevels,
        });
        return this.localInstanceRef;
    }
};
exports.Logger = Logger;
Logger.logBuffer = new Array();
Logger.staticInstanceRef = DEFAULT_LOGGER;
Logger.WrapBuffer = (target, propertyKey, descriptor) => {
    const originalFn = descriptor.value;
    descriptor.value = function (...args) {
        if (Logger_1.isBufferAttached) {
            Logger_1.logBuffer.push({
                methodRef: originalFn.bind(this),
                arguments: args,
            });
            return;
        }
        return originalFn.call(this, ...args);
    };
};
tslib_1.__decorate([
    Logger.WrapBuffer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Logger.prototype, "error", null);
tslib_1.__decorate([
    Logger.WrapBuffer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Logger.prototype, "log", null);
tslib_1.__decorate([
    Logger.WrapBuffer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Logger.prototype, "warn", null);
tslib_1.__decorate([
    Logger.WrapBuffer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Logger.prototype, "debug", null);
tslib_1.__decorate([
    Logger.WrapBuffer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Logger.prototype, "verbose", null);
tslib_1.__decorate([
    Logger.WrapBuffer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Logger.prototype, "fatal", null);
tslib_1.__decorate([
    Logger.WrapBuffer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Logger, "error", null);
tslib_1.__decorate([
    Logger.WrapBuffer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Logger, "log", null);
tslib_1.__decorate([
    Logger.WrapBuffer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Logger, "warn", null);
tslib_1.__decorate([
    Logger.WrapBuffer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Logger, "debug", null);
tslib_1.__decorate([
    Logger.WrapBuffer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Logger, "verbose", null);
tslib_1.__decorate([
    Logger.WrapBuffer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Logger, "fatal", null);
exports.Logger = Logger = Logger_1 = tslib_1.__decorate([
    (0, core_1.Injectable)(),
    tslib_1.__param(0, (0, core_1.Optional)()),
    tslib_1.__param(1, (0, core_1.Optional)()),
    tslib_1.__metadata("design:paramtypes", [String, Object])
], Logger);
