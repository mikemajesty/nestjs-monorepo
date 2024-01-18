"use strict";
var ParseUUIDPipe_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseUUIDPipe = void 0;
const tslib_1 = require("tslib");
const injectable_decorator_1 = require("../decorators/core/injectable.decorator");
const optional_decorator_1 = require("../decorators/core/optional.decorator");
const http_status_enum_1 = require("../enums/http-status.enum");
const http_error_by_code_util_1 = require("../utils/http-error-by-code.util");
const shared_utils_1 = require("../utils/shared.utils");
/**
 * Defines the built-in ParseUUID Pipe
 *
 * @see [Built-in Pipes](https://docs.nestjs.com/pipes#built-in-pipes)
 *
 * @publicApi
 */
let ParseUUIDPipe = ParseUUIDPipe_1 = class ParseUUIDPipe {
    constructor(options) {
        this.options = options;
        options = options || {};
        const { exceptionFactory, errorHttpStatusCode = http_status_enum_1.HttpStatus.BAD_REQUEST, version, } = options;
        this.version = version;
        this.exceptionFactory =
            exceptionFactory ||
                (error => new http_error_by_code_util_1.HttpErrorByCode[errorHttpStatusCode](error));
    }
    async transform(value, metadata) {
        if ((0, shared_utils_1.isNil)(value) && this.options?.optional) {
            return value;
        }
        if (!this.isUUID(value, this.version)) {
            throw this.exceptionFactory(`Validation failed (uuid${this.version ? ` v ${this.version}` : ''} is expected)`);
        }
        return value;
    }
    isUUID(str, version = 'all') {
        if (!(0, shared_utils_1.isString)(str)) {
            throw this.exceptionFactory('The value passed as UUID is not a string');
        }
        const pattern = ParseUUIDPipe_1.uuidRegExps[version];
        return pattern?.test(str);
    }
};
exports.ParseUUIDPipe = ParseUUIDPipe;
ParseUUIDPipe.uuidRegExps = {
    3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
};
exports.ParseUUIDPipe = ParseUUIDPipe = ParseUUIDPipe_1 = tslib_1.__decorate([
    (0, injectable_decorator_1.Injectable)(),
    tslib_1.__param(0, (0, optional_decorator_1.Optional)()),
    tslib_1.__metadata("design:paramtypes", [Object])
], ParseUUIDPipe);
