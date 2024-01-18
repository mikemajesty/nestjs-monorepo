"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const tslib_1 = require("tslib");
const decorators_1 = require("../decorators");
const cache_constants_1 = require("./cache.constants");
const cache_module_definition_1 = require("./cache.module-definition");
const cache_providers_1 = require("./cache.providers");
/**
 * Module that provides Nest cache-manager.
 *
 * @see [Caching](https://docs.nestjs.com/techniques/caching)
 * @deprecated `CacheModule` (from the `@nestjs/common` package) is deprecated and will be removed in the next major release. Please, use the `@nestjs/cache-manager` package instead
 * @publicApi
 */
let CacheModule = class CacheModule extends cache_module_definition_1.ConfigurableModuleClass {
    /**
     * Configure the cache manager statically.
     *
     * @param options options to configure the cache manager
     *
     * @see [Customize caching](https://docs.nestjs.com/techniques/caching#customize-caching)
     */
    static register(options = {}) {
        return Object.assign({ global: options.isGlobal }, super.register(options));
    }
    /**
     * Configure the cache manager dynamically.
     *
     * @param options method for dynamically supplying cache manager configuration
     * options
     *
     * @see [Async configuration](https://docs.nestjs.com/techniques/caching#async-configuration)
     */
    static registerAsync(options) {
        const moduleDefinition = super.registerAsync(options);
        return Object.assign(Object.assign({ global: options.isGlobal }, moduleDefinition), { providers: options.extraProviders
                ? moduleDefinition.providers.concat(options.extraProviders)
                : moduleDefinition.providers });
    }
};
CacheModule = tslib_1.__decorate([
    (0, decorators_1.Module)({
        providers: [(0, cache_providers_1.createCacheManager)()],
        exports: [cache_constants_1.CACHE_MANAGER],
    })
], CacheModule);
exports.CacheModule = CacheModule;
