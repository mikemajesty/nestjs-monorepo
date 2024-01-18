"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSerializerInterceptor = void 0;
const tslib_1 = require("tslib");
const operators_1 = require("rxjs/operators");
const core_1 = require("../decorators/core");
const file_stream_1 = require("../file-stream");
const load_package_util_1 = require("../utils/load-package.util");
const shared_utils_1 = require("../utils/shared.utils");
const class_serializer_constants_1 = require("./class-serializer.constants");
let classTransformer = {};
// NOTE (external)
// We need to deduplicate them here due to the circular dependency
// between core and common packages
const REFLECTOR = 'Reflector';
/**
 * @publicApi
 */
let ClassSerializerInterceptor = class ClassSerializerInterceptor {
    constructor(reflector, defaultOptions = {}) {
        this.reflector = reflector;
        this.defaultOptions = defaultOptions;
        classTransformer =
            defaultOptions?.transformerPackage ??
                (0, load_package_util_1.loadPackage)('class-transformer', 'ClassSerializerInterceptor', () => require('class-transformer'));
        if (!defaultOptions?.transformerPackage) {
            require('class-transformer');
        }
    }
    intercept(context, next) {
        const contextOptions = this.getContextOptions(context);
        const options = {
            ...this.defaultOptions,
            ...contextOptions,
        };
        return next
            .handle()
            .pipe((0, operators_1.map)((res) => this.serialize(res, options)));
    }
    /**
     * Serializes responses that are non-null objects nor streamable files.
     */
    serialize(response, options) {
        if (!(0, shared_utils_1.isObject)(response) || response instanceof file_stream_1.StreamableFile) {
            return response;
        }
        return Array.isArray(response)
            ? response.map(item => this.transformToPlain(item, options))
            : this.transformToPlain(response, options);
    }
    transformToPlain(plainOrClass, options) {
        if (!plainOrClass) {
            return plainOrClass;
        }
        if (!options.type) {
            return classTransformer.classToPlain(plainOrClass, options);
        }
        if (plainOrClass instanceof options.type) {
            return classTransformer.classToPlain(plainOrClass, options);
        }
        const instance = classTransformer.plainToClass(options.type, plainOrClass);
        return classTransformer.classToPlain(instance, options);
    }
    getContextOptions(context) {
        return this.reflector.getAllAndOverride(class_serializer_constants_1.CLASS_SERIALIZER_OPTIONS, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
};
exports.ClassSerializerInterceptor = ClassSerializerInterceptor;
exports.ClassSerializerInterceptor = ClassSerializerInterceptor = tslib_1.__decorate([
    (0, core_1.Injectable)(),
    tslib_1.__param(0, (0, core_1.Inject)(REFLECTOR)),
    tslib_1.__param(1, (0, core_1.Optional)()),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], ClassSerializerInterceptor);
