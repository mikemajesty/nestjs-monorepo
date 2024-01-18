import { DynamicModule } from '../interfaces';
import { ConfigurableModuleClass } from './cache.module-definition';
import { CacheModuleAsyncOptions, CacheModuleOptions } from './interfaces/cache-module.interface';
/**
 * Module that provides Nest cache-manager.
 *
 * @see [Caching](https://docs.nestjs.com/techniques/caching)
 * @deprecated `CacheModule` (from the `@nestjs/common` package) is deprecated and will be removed in the next major release. Please, use the `@nestjs/cache-manager` package instead
 * @publicApi
 */
export declare class CacheModule extends ConfigurableModuleClass {
    /**
     * Configure the cache manager statically.
     *
     * @param options options to configure the cache manager
     *
     * @see [Customize caching](https://docs.nestjs.com/techniques/caching#customize-caching)
     */
    static register<StoreConfig extends Record<any, any> = Record<string, any>>(options?: CacheModuleOptions<StoreConfig>): DynamicModule;
    /**
     * Configure the cache manager dynamically.
     *
     * @param options method for dynamically supplying cache manager configuration
     * options
     *
     * @see [Async configuration](https://docs.nestjs.com/techniques/caching#async-configuration)
     */
    static registerAsync<StoreConfig extends Record<any, any> = Record<string, any>>(options: CacheModuleAsyncOptions<StoreConfig>): DynamicModule;
}
