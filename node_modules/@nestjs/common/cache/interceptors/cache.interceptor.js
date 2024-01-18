"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheInterceptor = void 0;
const tslib_1 = require("tslib");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const decorators_1 = require("../../decorators");
const file_stream_1 = require("../../file-stream");
const logger_service_1 = require("../../services/logger.service");
const load_package_util_1 = require("../../utils/load-package.util");
const shared_utils_1 = require("../../utils/shared.utils");
const cache_constants_1 = require("../cache.constants");
/** @deprecated */
const HTTP_ADAPTER_HOST = 'HttpAdapterHost';
/** @deprecated */
const REFLECTOR = 'Reflector';
/**
 * @see [Caching](https://docs.nestjs.com/techniques/caching)
 *
 * @deprecated `CacheModule` (from the `@nestjs/common` package) is deprecated and will be removed in the next major release. Please, use the `@nestjs/cache-manager` package instead
 * @publicApi
 */
let CacheInterceptor = class CacheInterceptor {
    constructor(cacheManager, reflector) {
        this.cacheManager = cacheManager;
        this.reflector = reflector;
        this.allowedMethods = ['GET'];
        // We need to check if the cache-manager package is v5 or greater
        // because the set method signature changed in v5
        const cacheManagerPackage = (0, load_package_util_1.loadPackage)('cache-manager', 'CacheModule', () => require('cache-manager'));
        this.cacheManagerIsv5OrGreater = 'memoryStore' in cacheManagerPackage;
        logger_service_1.Logger.warn('DEPRECATED! "CacheModule" (from the "@nestjs/common" package) is deprecated and will be removed in the next major release. Please, use the "@nestjs/cache-manager" package instead.');
    }
    async intercept(context, next) {
        var _a;
        const key = this.trackBy(context);
        const ttlValueOrFactory = (_a = this.reflector.get(cache_constants_1.CACHE_TTL_METADATA, context.getHandler())) !== null && _a !== void 0 ? _a : null;
        if (!key) {
            return next.handle();
        }
        try {
            const value = await this.cacheManager.get(key);
            if (!(0, shared_utils_1.isNil)(value)) {
                return (0, rxjs_1.of)(value);
            }
            const ttl = (0, shared_utils_1.isFunction)(ttlValueOrFactory)
                ? await ttlValueOrFactory(context)
                : ttlValueOrFactory;
            return next.handle().pipe((0, operators_1.tap)(async (response) => {
                if (response instanceof file_stream_1.StreamableFile) {
                    return;
                }
                const args = [key, response];
                if (!(0, shared_utils_1.isNil)(ttl)) {
                    args.push(this.cacheManagerIsv5OrGreater ? ttl : { ttl });
                }
                try {
                    await this.cacheManager.set(...args);
                }
                catch (err) {
                    logger_service_1.Logger.error(`An error has occurred when inserting "key: ${key}", "value: ${response}"`, 'CacheInterceptor');
                }
            }));
        }
        catch (_b) {
            return next.handle();
        }
    }
    trackBy(context) {
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
        const cacheMetadata = this.reflector.get(cache_constants_1.CACHE_KEY_METADATA, context.getHandler());
        if (!isHttpApp || cacheMetadata) {
            return cacheMetadata;
        }
        const request = context.getArgByIndex(0);
        if (!this.isRequestCacheable(context)) {
            return undefined;
        }
        return httpAdapter.getRequestUrl(request);
    }
    isRequestCacheable(context) {
        const req = context.switchToHttp().getRequest();
        return this.allowedMethods.includes(req.method);
    }
};
tslib_1.__decorate([
    (0, decorators_1.Optional)(),
    (0, decorators_1.Inject)(HTTP_ADAPTER_HOST),
    tslib_1.__metadata("design:type", Object)
], CacheInterceptor.prototype, "httpAdapterHost", void 0);
CacheInterceptor = tslib_1.__decorate([
    (0, decorators_1.Injectable)(),
    tslib_1.__param(0, (0, decorators_1.Inject)(cache_constants_1.CACHE_MANAGER)),
    tslib_1.__param(1, (0, decorators_1.Inject)(REFLECTOR)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], CacheInterceptor);
exports.CacheInterceptor = CacheInterceptor;
