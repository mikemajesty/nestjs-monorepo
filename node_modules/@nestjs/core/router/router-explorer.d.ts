import { HttpServer } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';
import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { VersionValue } from '@nestjs/common/interfaces/version-options.interface';
import { ApplicationConfig } from '../application-config';
import { NestContainer } from '../injector/container';
import { Injector } from '../injector/injector';
import { InstanceWrapper } from '../injector/instance-wrapper';
import { Module } from '../injector/module';
import { GraphInspector } from '../inspector/graph-inspector';
import { MetadataScanner } from '../metadata-scanner';
import { ExceptionsFilter } from './interfaces/exceptions-filter.interface';
import { RoutePathMetadata } from './interfaces/route-path-metadata.interface';
import { RoutePathFactory } from './route-path-factory';
import { RouterProxy, RouterProxyCallback } from './router-proxy';
export interface RouteDefinition {
    path: string[];
    requestMethod: RequestMethod;
    targetCallback: RouterProxyCallback;
    methodName: string;
    version?: VersionValue;
}
export declare class RouterExplorer {
    private readonly container;
    private readonly injector;
    private readonly routerProxy;
    private readonly exceptionsFilter;
    private readonly routePathFactory;
    private readonly graphInspector;
    private readonly executionContextCreator;
    private readonly pathsExplorer;
    private readonly routerMethodFactory;
    private readonly logger;
    private readonly exceptionFiltersCache;
    constructor(metadataScanner: MetadataScanner, container: NestContainer, injector: Injector, routerProxy: RouterProxy, exceptionsFilter: ExceptionsFilter, config: ApplicationConfig, routePathFactory: RoutePathFactory, graphInspector: GraphInspector);
    explore<T extends HttpServer = any>(instanceWrapper: InstanceWrapper, moduleKey: string, applicationRef: T, host: string | RegExp | Array<string | RegExp>, routePathMetadata: RoutePathMetadata): void;
    extractRouterPath(metatype: Type<Controller>): string[];
    applyPathsToRouterProxy<T extends HttpServer>(router: T, routeDefinitions: RouteDefinition[], instanceWrapper: InstanceWrapper, moduleKey: string, routePathMetadata: RoutePathMetadata, host: string | RegExp | Array<string | RegExp>): void;
    private applyCallbackToRouter;
    private applyHostFilter;
    private applyVersionFilter;
    private createCallbackProxy;
    createRequestScopedHandler(instanceWrapper: InstanceWrapper, requestMethod: RequestMethod, moduleRef: Module, moduleKey: string, methodName: string): <TRequest extends Record<any, any>, TResponse>(req: TRequest, res: TResponse, next: () => void) => Promise<void>;
    private getContextId;
    private copyMetadataToCallback;
}
