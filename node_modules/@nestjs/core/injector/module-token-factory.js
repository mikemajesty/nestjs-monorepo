"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleTokenFactory = void 0;
const common_1 = require("@nestjs/common");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const crypto_1 = require("crypto");
const fast_safe_stringify_1 = require("fast-safe-stringify");
const perf_hooks_1 = require("perf_hooks");
const CLASS_STR = 'class ';
const CLASS_STR_LEN = CLASS_STR.length;
class ModuleTokenFactory {
    constructor() {
        this.moduleTokenCache = new Map();
        this.moduleIdsCache = new WeakMap();
        this.logger = new common_1.Logger(ModuleTokenFactory.name, {
            timestamp: true,
        });
    }
    create(metatype, dynamicModuleMetadata) {
        const moduleId = this.getModuleId(metatype);
        if (!dynamicModuleMetadata) {
            return this.getStaticModuleToken(moduleId, this.getModuleName(metatype));
        }
        const opaqueToken = {
            id: moduleId,
            module: this.getModuleName(metatype),
            dynamic: dynamicModuleMetadata,
        };
        const start = perf_hooks_1.performance.now();
        const opaqueTokenString = this.getStringifiedOpaqueToken(opaqueToken);
        const timeSpentInMs = perf_hooks_1.performance.now() - start;
        if (timeSpentInMs > 10) {
            const formattedTimeSpent = timeSpentInMs.toFixed(2);
            this.logger.warn(`The module "${opaqueToken.module}" is taking ${formattedTimeSpent}ms to serialize, this may be caused by larger objects statically assigned to the module. More details: https://github.com/nestjs/nest/issues/12738`);
        }
        return this.hashString(opaqueTokenString);
    }
    getStaticModuleToken(moduleId, moduleName) {
        const key = `${moduleId}_${moduleName}`;
        if (this.moduleTokenCache.has(key)) {
            return this.moduleTokenCache.get(key);
        }
        const hash = this.hashString(key);
        this.moduleTokenCache.set(key, hash);
        return hash;
    }
    getStringifiedOpaqueToken(opaqueToken) {
        // Uses safeStringify instead of JSON.stringify to support circular dynamic modules
        // The replacer function is also required in order to obtain real class names
        // instead of the unified "Function" key
        return opaqueToken ? (0, fast_safe_stringify_1.default)(opaqueToken, this.replacer) : '';
    }
    getModuleId(metatype) {
        let moduleId = this.moduleIdsCache.get(metatype);
        if (moduleId) {
            return moduleId;
        }
        moduleId = (0, random_string_generator_util_1.randomStringGenerator)();
        this.moduleIdsCache.set(metatype, moduleId);
        return moduleId;
    }
    getModuleName(metatype) {
        return metatype.name;
    }
    hashString(value) {
        return (0, crypto_1.createHash)('sha256').update(value).digest('hex');
    }
    replacer(key, value) {
        if ((0, shared_utils_1.isFunction)(value)) {
            const funcAsString = value.toString();
            const isClass = funcAsString.slice(0, CLASS_STR_LEN) === CLASS_STR;
            if (isClass) {
                return value.name;
            }
            return funcAsString;
        }
        if ((0, shared_utils_1.isSymbol)(value)) {
            return value.toString();
        }
        return value;
    }
}
exports.ModuleTokenFactory = ModuleTokenFactory;
