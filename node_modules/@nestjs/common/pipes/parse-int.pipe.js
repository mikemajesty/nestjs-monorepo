"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseIntPipe = void 0;
const tslib_1 = require("tslib");
const injectable_decorator_1 = require("../decorators/core/injectable.decorator");
const optional_decorator_1 = require("../decorators/core/optional.decorator");
const http_status_enum_1 = require("../enums/http-status.enum");
const http_error_by_code_util_1 = require("../utils/http-error-by-code.util");
const shared_utils_1 = require("../utils/shared.utils");
/**
 * Defines the built-in ParseInt Pipe
 *
 * @see [Built-in Pipes](https://docs.nestjs.com/pipes#built-in-pipes)
 *
 * @publicApi
 */
let ParseIntPipe = class ParseIntPipe {
    constructor(options) {
        this.options = options;
        options = options || {};
        const { exceptionFactory, errorHttpStatusCode = http_status_enum_1.HttpStatus.BAD_REQUEST } = options;
        this.exceptionFactory =
            exceptionFactory ||
                (error => new http_error_by_code_util_1.HttpErrorByCode[errorHttpStatusCode](error));
    }
    /**
     * Method that accesses and performs optional transformation on argument for
     * in-flight requests.
     *
     * @param value currently processed route argument
     * @param metadata contains metadata about the currently processed route argument
     */
    async transform(value, metadata) {
        if ((0, shared_utils_1.isNil)(value) && this.options?.optional) {
            return value;
        }
        if (!this.isNumeric(value)) {
            throw this.exceptionFactory('Validation failed (numeric string is expected)');
        }
        return parseInt(value, 10);
    }
    /**
     * @param value currently processed route argument
     * @returns `true` if `value` is a valid integer number
     */
    isNumeric(value) {
        return (['string', 'number'].includes(typeof value) &&
            /^-?\d+$/.test(value) &&
            isFinite(value));
    }
};
exports.ParseIntPipe = ParseIntPipe;
exports.ParseIntPipe = ParseIntPipe = tslib_1.__decorate([
    (0, injectable_decorator_1.Injectable)(),
    tslib_1.__param(0, (0, optional_decorator_1.Optional)()),
    tslib_1.__metadata("design:paramtypes", [Object])
], ParseIntPipe);
