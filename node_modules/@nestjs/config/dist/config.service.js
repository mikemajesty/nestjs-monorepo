"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const get_1 = __importDefault(require("lodash/get"));
const has_1 = __importDefault(require("lodash/has"));
const set_1 = __importDefault(require("lodash/set"));
const config_constants_1 = require("./config.constants");
let ConfigService = exports.ConfigService = class ConfigService {
    set isCacheEnabled(value) {
        this._isCacheEnabled = value;
    }
    get isCacheEnabled() {
        return this._isCacheEnabled;
    }
    constructor(internalConfig = {}) {
        this.internalConfig = internalConfig;
        this.cache = {};
        this._isCacheEnabled = false;
    }
    /**
     * Get a configuration value (either custom configuration or process environment variable)
     * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
     * It returns a default value if the key does not exist.
     * @param propertyPath
     * @param defaultValueOrOptions
     */
    get(propertyPath, defaultValueOrOptions, options) {
        const validatedEnvValue = this.getFromValidatedEnv(propertyPath);
        if (!(0, shared_utils_1.isUndefined)(validatedEnvValue)) {
            return validatedEnvValue;
        }
        const defaultValue = this.isGetOptionsObject(defaultValueOrOptions) &&
            !options
            ? undefined
            : defaultValueOrOptions;
        const processEnvValue = this.getFromProcessEnv(propertyPath, defaultValue);
        if (!(0, shared_utils_1.isUndefined)(processEnvValue)) {
            return processEnvValue;
        }
        const internalValue = this.getFromInternalConfig(propertyPath);
        if (!(0, shared_utils_1.isUndefined)(internalValue)) {
            return internalValue;
        }
        return defaultValue;
    }
    /**
     * Get a configuration value (either custom configuration or process environment variable)
     * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
     * It returns a default value if the key does not exist.
     * If the default value is undefined an exception will be thrown.
     * @param propertyPath
     * @param defaultValueOrOptions
     */
    getOrThrow(propertyPath, defaultValueOrOptions, options) {
        // @ts-expect-error Bypass method overloads
        const value = this.get(propertyPath, defaultValueOrOptions, options);
        if ((0, shared_utils_1.isUndefined)(value)) {
            throw new TypeError(`Configuration key "${propertyPath.toString()}" does not exist`);
        }
        return value;
    }
    getFromCache(propertyPath, defaultValue) {
        const cachedValue = (0, get_1.default)(this.cache, propertyPath);
        return (0, shared_utils_1.isUndefined)(cachedValue)
            ? defaultValue
            : cachedValue;
    }
    getFromValidatedEnv(propertyPath) {
        const validatedEnvValue = (0, get_1.default)(this.internalConfig[config_constants_1.VALIDATED_ENV_PROPNAME], propertyPath);
        return validatedEnvValue;
    }
    getFromProcessEnv(propertyPath, defaultValue) {
        if (this.isCacheEnabled &&
            (0, has_1.default)(this.cache, propertyPath)) {
            const cachedValue = this.getFromCache(propertyPath, defaultValue);
            return !(0, shared_utils_1.isUndefined)(cachedValue) ? cachedValue : defaultValue;
        }
        const processValue = (0, get_1.default)(process.env, propertyPath);
        this.setInCacheIfDefined(propertyPath, processValue);
        return processValue;
    }
    getFromInternalConfig(propertyPath) {
        const internalValue = (0, get_1.default)(this.internalConfig, propertyPath);
        return internalValue;
    }
    setInCacheIfDefined(propertyPath, value) {
        if (typeof value === 'undefined') {
            return;
        }
        (0, set_1.default)(this.cache, propertyPath, value);
    }
    isGetOptionsObject(options) {
        return options && options?.infer && Object.keys(options).length === 1;
    }
};
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Inject)(config_constants_1.CONFIGURATION_TOKEN)),
    __metadata("design:paramtypes", [Object])
], ConfigService);
