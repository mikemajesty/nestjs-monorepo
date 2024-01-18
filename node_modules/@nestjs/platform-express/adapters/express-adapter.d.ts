/// <reference types="node" />
/// <reference types="node" />
import type { Server } from 'http';
import { RequestMethod, VersioningOptions } from '@nestjs/common';
import { VersionValue } from '@nestjs/common/interfaces';
import { CorsOptions, CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { AbstractHttpAdapter } from '@nestjs/core/adapters/http-adapter';
import * as http from 'http';
import * as https from 'https';
import { NestExpressBodyParserOptions } from '../interfaces/nest-express-body-parser-options.interface';
import { NestExpressBodyParserType } from '../interfaces/nest-express-body-parser.interface';
import { ServeStaticOptions } from '../interfaces/serve-static-options.interface';
type VersionedRoute = <TRequest extends Record<string, any> = any, TResponse = any>(req: TRequest, res: TResponse, next: () => void) => any;
/**
 * @publicApi
 */
export declare class ExpressAdapter extends AbstractHttpAdapter<http.Server | https.Server> {
    private readonly routerMethodFactory;
    private readonly logger;
    private readonly openConnections;
    constructor(instance?: any);
    reply(response: any, body: any, statusCode?: number): any;
    status(response: any, statusCode: number): any;
    end(response: any, message?: string): any;
    render(response: any, view: string, options: any): any;
    redirect(response: any, statusCode: number, url: string): any;
    setErrorHandler(handler: Function, prefix?: string): any;
    setNotFoundHandler(handler: Function, prefix?: string): any;
    isHeadersSent(response: any): boolean;
    setHeader(response: any, name: string, value: string): any;
    listen(port: string | number, callback?: () => void): Server;
    listen(port: string | number, hostname: string, callback?: () => void): Server;
    close(): Promise<unknown>;
    set(...args: any[]): any;
    enable(...args: any[]): any;
    disable(...args: any[]): any;
    engine(...args: any[]): any;
    useStaticAssets(path: string, options: ServeStaticOptions): any;
    setBaseViewsDir(path: string | string[]): any;
    setViewEngine(engine: string): any;
    getRequestHostname(request: any): string;
    getRequestMethod(request: any): string;
    getRequestUrl(request: any): string;
    enableCors(options: CorsOptions | CorsOptionsDelegate<any>): any;
    createMiddlewareFactory(requestMethod: RequestMethod): (path: string, callback: Function) => any;
    initHttpServer(options: NestApplicationOptions): void;
    registerParserMiddleware(prefix?: string, rawBody?: boolean): void;
    useBodyParser<Options = NestExpressBodyParserOptions>(type: NestExpressBodyParserType, rawBody: boolean, options?: Omit<Options, 'verify'>): this;
    setLocal(key: string, value: any): this;
    getType(): string;
    applyVersionFilter(handler: Function, version: VersionValue, versioningOptions: VersioningOptions): VersionedRoute;
    private trackOpenConnections;
    private closeOpenConnections;
    private isMiddlewareApplied;
}
export {};
