"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_MODULE_OPTIONS = exports.CACHE_TTL_METADATA = exports.CACHE_KEY_METADATA = exports.CACHE_MANAGER = void 0;
const cache_module_definition_1 = require("./cache.module-definition");
/**
 * @deprecated `CacheModule` (from the `@nestjs/common` package) is deprecated and will be removed in the next major release. Please, use the `@nestjs/cache-manager` package instead
 * @publicApi
 */
exports.CACHE_MANAGER = 'CACHE_MANAGER';
exports.CACHE_KEY_METADATA = 'cache_module:cache_key';
exports.CACHE_TTL_METADATA = 'cache_module:cache_ttl';
/**
 * @deprecated `CacheModule` (from the `@nestjs/common` package) is deprecated and will be removed in the next major release. Please, use the `@nestjs/cache-manager` package instead
 * @publicApi
 */
exports.CACHE_MODULE_OPTIONS = cache_module_definition_1.MODULE_OPTIONS_TOKEN;
