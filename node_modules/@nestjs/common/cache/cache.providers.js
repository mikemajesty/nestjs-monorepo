"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCacheManager = void 0;
const load_package_util_1 = require("../utils/load-package.util");
const cache_constants_1 = require("./cache.constants");
const cache_module_definition_1 = require("./cache.module-definition");
const default_options_1 = require("./default-options");
/**
 * Creates a CacheManager Provider.
 *
 * @publicApi
 */
function createCacheManager() {
    return {
        provide: cache_constants_1.CACHE_MANAGER,
        useFactory: async (options) => {
            const cacheManager = (0, load_package_util_1.loadPackage)('cache-manager', 'CacheModule', () => require('cache-manager'));
            const cacheManagerIsv5OrGreater = 'memoryStore' in cacheManager;
            const cachingFactory = async (store, options) => {
                if (!cacheManagerIsv5OrGreater) {
                    return cacheManager.caching(Object.assign(Object.assign({}, default_options_1.defaultCacheOptions), Object.assign(Object.assign({}, options), { store })));
                }
                let cache = 'memory';
                default_options_1.defaultCacheOptions.ttl *= 1000;
                if (typeof store === 'object') {
                    if ('create' in store) {
                        cache = store.create;
                    }
                    else {
                        cache = store;
                    }
                }
                else if (typeof store === 'function') {
                    cache = store;
                }
                return cacheManager.caching(cache, Object.assign(Object.assign({}, default_options_1.defaultCacheOptions), options));
            };
            return Array.isArray(options)
                ? cacheManager.multiCaching(await Promise.all(options.map(option => cachingFactory(option.store, option))))
                : cachingFactory(options.store, options);
        },
        inject: [cache_module_definition_1.MODULE_OPTIONS_TOKEN],
    };
}
exports.createCacheManager = createCacheManager;
