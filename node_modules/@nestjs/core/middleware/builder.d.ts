import { HttpServer, MiddlewareConsumer, Type } from '@nestjs/common/interfaces';
import { MiddlewareConfigProxy, MiddlewareConfiguration } from '@nestjs/common/interfaces/middleware';
import { RouteInfoPathExtractor } from './route-info-path-extractor';
import { RoutesMapper } from './routes-mapper';
export declare class MiddlewareBuilder implements MiddlewareConsumer {
    private readonly routesMapper;
    private readonly httpAdapter;
    private readonly routeInfoPathExtractor;
    private readonly middlewareCollection;
    constructor(routesMapper: RoutesMapper, httpAdapter: HttpServer, routeInfoPathExtractor: RouteInfoPathExtractor);
    apply(...middleware: Array<Type<any> | Function | any>): MiddlewareConfigProxy;
    build(): MiddlewareConfiguration[];
    getHttpAdapter(): HttpServer;
    private static readonly ConfigProxy;
}
