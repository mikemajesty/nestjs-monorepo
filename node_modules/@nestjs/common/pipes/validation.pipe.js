"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const tslib_1 = require("tslib");
const iterare_1 = require("iterare");
const util_1 = require("util");
const decorators_1 = require("../decorators");
const core_1 = require("../decorators/core");
const http_status_enum_1 = require("../enums/http-status.enum");
const http_error_by_code_util_1 = require("../utils/http-error-by-code.util");
const load_package_util_1 = require("../utils/load-package.util");
const shared_utils_1 = require("../utils/shared.utils");
let classValidator = {};
let classTransformer = {};
/**
 * @see [Validation](https://docs.nestjs.com/techniques/validation)
 *
 * @publicApi
 */
let ValidationPipe = class ValidationPipe {
    constructor(options) {
        options = options || {};
        const { transform, disableErrorMessages, errorHttpStatusCode, expectedType, transformOptions, validateCustomDecorators, ...validatorOptions } = options;
        // @see https://github.com/nestjs/nest/issues/10683#issuecomment-1413690508
        this.validatorOptions = { forbidUnknownValues: false, ...validatorOptions };
        this.isTransformEnabled = !!transform;
        this.transformOptions = transformOptions;
        this.isDetailedOutputDisabled = disableErrorMessages;
        this.validateCustomDecorators = validateCustomDecorators || false;
        this.errorHttpStatusCode = errorHttpStatusCode || http_status_enum_1.HttpStatus.BAD_REQUEST;
        this.expectedType = expectedType;
        this.exceptionFactory =
            options.exceptionFactory || this.createExceptionFactory();
        classValidator = this.loadValidator(options.validatorPackage);
        classTransformer = this.loadTransformer(options.transformerPackage);
    }
    loadValidator(validatorPackage) {
        return (validatorPackage ??
            (0, load_package_util_1.loadPackage)('class-validator', 'ValidationPipe', () => require('class-validator')));
    }
    loadTransformer(transformerPackage) {
        return (transformerPackage ??
            (0, load_package_util_1.loadPackage)('class-transformer', 'ValidationPipe', () => require('class-transformer')));
    }
    async transform(value, metadata) {
        if (this.expectedType) {
            metadata = { ...metadata, metatype: this.expectedType };
        }
        const metatype = metadata.metatype;
        if (!metatype || !this.toValidate(metadata)) {
            return this.isTransformEnabled
                ? this.transformPrimitive(value, metadata)
                : value;
        }
        const originalValue = value;
        value = this.toEmptyIfNil(value);
        const isNil = value !== originalValue;
        const isPrimitive = this.isPrimitive(value);
        this.stripProtoKeys(value);
        let entity = classTransformer.plainToClass(metatype, value, this.transformOptions);
        const originalEntity = entity;
        const isCtorNotEqual = entity.constructor !== metatype;
        if (isCtorNotEqual && !isPrimitive) {
            entity.constructor = metatype;
        }
        else if (isCtorNotEqual) {
            // when "entity" is a primitive value, we have to temporarily
            // replace the entity to perform the validation against the original
            // metatype defined inside the handler
            entity = { constructor: metatype };
        }
        const errors = await this.validate(entity, this.validatorOptions);
        if (errors.length > 0) {
            throw await this.exceptionFactory(errors);
        }
        if (isPrimitive) {
            // if the value is a primitive value and the validation process has been successfully completed
            // we have to revert the original value passed through the pipe
            entity = originalEntity;
        }
        if (this.isTransformEnabled) {
            return entity;
        }
        if (isNil) {
            // if the value was originally undefined or null, revert it back
            return originalValue;
        }
        // we check if the number of keys of the "validatorOptions" is higher than 1 (instead of 0)
        // because the "forbidUnknownValues" now fallbacks to "false" (in case it wasn't explicitly specified)
        const shouldTransformToPlain = Object.keys(this.validatorOptions).length > 1;
        return shouldTransformToPlain
            ? classTransformer.classToPlain(entity, this.transformOptions)
            : value;
    }
    createExceptionFactory() {
        return (validationErrors = []) => {
            if (this.isDetailedOutputDisabled) {
                return new http_error_by_code_util_1.HttpErrorByCode[this.errorHttpStatusCode]();
            }
            const errors = this.flattenValidationErrors(validationErrors);
            return new http_error_by_code_util_1.HttpErrorByCode[this.errorHttpStatusCode](errors);
        };
    }
    toValidate(metadata) {
        const { metatype, type } = metadata;
        if (type === 'custom' && !this.validateCustomDecorators) {
            return false;
        }
        const types = [String, Boolean, Number, Array, Object, Buffer, Date];
        return !types.some(t => metatype === t) && !(0, shared_utils_1.isNil)(metatype);
    }
    transformPrimitive(value, metadata) {
        if (!metadata.data) {
            // leave top-level query/param objects unmodified
            return value;
        }
        const { type, metatype } = metadata;
        if (type !== 'param' && type !== 'query') {
            return value;
        }
        if (metatype === Boolean) {
            if ((0, shared_utils_1.isUndefined)(value)) {
                // This is an workaround to deal with optional boolean values since
                // optional booleans shouldn't be parsed to a valid boolean when
                // they were not defined
                return undefined;
            }
            // Any fasly value but `undefined` will be parsed to `false`
            return value === true || value === 'true';
        }
        if (metatype === Number) {
            return +value;
        }
        return value;
    }
    toEmptyIfNil(value) {
        return (0, shared_utils_1.isNil)(value) ? {} : value;
    }
    stripProtoKeys(value) {
        if (value == null ||
            typeof value !== 'object' ||
            util_1.types.isTypedArray(value)) {
            return;
        }
        if (Array.isArray(value)) {
            for (const v of value) {
                this.stripProtoKeys(v);
            }
            return;
        }
        delete value.__proto__;
        for (const key in value) {
            this.stripProtoKeys(value[key]);
        }
    }
    isPrimitive(value) {
        return ['number', 'boolean', 'string'].includes(typeof value);
    }
    validate(object, validatorOptions) {
        return classValidator.validate(object, validatorOptions);
    }
    flattenValidationErrors(validationErrors) {
        return (0, iterare_1.iterate)(validationErrors)
            .map(error => this.mapChildrenToValidationErrors(error))
            .flatten()
            .filter(item => !!item.constraints)
            .map(item => Object.values(item.constraints))
            .flatten()
            .toArray();
    }
    mapChildrenToValidationErrors(error, parentPath) {
        if (!(error.children && error.children.length)) {
            return [error];
        }
        const validationErrors = [];
        parentPath = parentPath
            ? `${parentPath}.${error.property}`
            : error.property;
        for (const item of error.children) {
            if (item.children && item.children.length) {
                validationErrors.push(...this.mapChildrenToValidationErrors(item, parentPath));
            }
            validationErrors.push(this.prependConstraintsWithParentProp(parentPath, item));
        }
        return validationErrors;
    }
    prependConstraintsWithParentProp(parentPath, error) {
        const constraints = {};
        for (const key in error.constraints) {
            constraints[key] = `${parentPath}.${error.constraints[key]}`;
        }
        return {
            ...error,
            constraints,
        };
    }
};
exports.ValidationPipe = ValidationPipe;
exports.ValidationPipe = ValidationPipe = tslib_1.__decorate([
    (0, core_1.Injectable)(),
    tslib_1.__param(0, (0, decorators_1.Optional)()),
    tslib_1.__metadata("design:paramtypes", [Object])
], ValidationPipe);
