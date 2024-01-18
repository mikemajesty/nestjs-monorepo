import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, HttpServer, NestInterceptor } from '../../interfaces';
/** @deprecated Import from the "@nestjs/core" instead. */
export interface HttpAdapterHost<T extends HttpServer = any> {
    httpAdapter: T;
}
/**
 * @see [Caching](https://docs.nestjs.com/techniques/caching)
 *
 * @deprecated `CacheModule` (from the `@nestjs/common` package) is deprecated and will be removed in the next major release. Please, use the `@nestjs/cache-manager` package instead
 * @publicApi
 */
export declare class CacheInterceptor implements NestInterceptor {
    protected readonly cacheManager: any;
    protected readonly reflector: any;
    protected readonly httpAdapterHost: HttpAdapterHost;
    protected allowedMethods: string[];
    private cacheManagerIsv5OrGreater;
    constructor(cacheManager: any, reflector: any);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    protected trackBy(context: ExecutionContext): string | undefined;
    protected isRequestCacheable(context: ExecutionContext): boolean;
}
