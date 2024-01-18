"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterExplorer = void 0;
const constants_1 = require("@nestjs/common/constants");
const enums_1 = require("@nestjs/common/enums");
const exceptions_1 = require("@nestjs/common/exceptions");
const logger_service_1 = require("@nestjs/common/services/logger.service");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const pathToRegexp = require("path-to-regexp");
const unknown_request_mapping_exception_1 = require("../errors/exceptions/unknown-request-mapping.exception");
const guards_1 = require("../guards");
const context_id_factory_1 = require("../helpers/context-id-factory");
const execution_context_host_1 = require("../helpers/execution-context-host");
const messages_1 = require("../helpers/messages");
const router_method_factory_1 = require("../helpers/router-method-factory");
const constants_2 = require("../injector/constants");
const interceptors_1 = require("../interceptors");
const pipes_1 = require("../pipes");
const paths_explorer_1 = require("./paths-explorer");
const request_constants_1 = require("./request/request-constants");
const route_params_factory_1 = require("./route-params-factory");
const router_execution_context_1 = require("./router-execution-context");
class RouterExplorer {
    constructor(metadataScanner, container, injector, routerProxy, exceptionsFilter, config, routePathFactory, graphInspector) {
        this.container = container;
        this.injector = injector;
        this.routerProxy = routerProxy;
        this.exceptionsFilter = exceptionsFilter;
        this.routePathFactory = routePathFactory;
        this.graphInspector = graphInspector;
        this.routerMethodFactory = new router_method_factory_1.RouterMethodFactory();
        this.logger = new logger_service_1.Logger(RouterExplorer.name, {
            timestamp: true,
        });
        this.exceptionFiltersCache = new WeakMap();
        this.pathsExplorer = new paths_explorer_1.PathsExplorer(metadataScanner);
        const routeParamsFactory = new route_params_factory_1.RouteParamsFactory();
        const pipesContextCreator = new pipes_1.PipesContextCreator(container, config);
        const pipesConsumer = new pipes_1.PipesConsumer();
        const guardsContextCreator = new guards_1.GuardsContextCreator(container, config);
        const guardsConsumer = new guards_1.GuardsConsumer();
        const interceptorsContextCreator = new interceptors_1.InterceptorsContextCreator(container, config);
        const interceptorsConsumer = new interceptors_1.InterceptorsConsumer();
        this.executionContextCreator = new router_execution_context_1.RouterExecutionContext(routeParamsFactory, pipesContextCreator, pipesConsumer, guardsContextCreator, guardsConsumer, interceptorsContextCreator, interceptorsConsumer, container.getHttpAdapterRef());
    }
    explore(instanceWrapper, moduleKey, applicationRef, host, routePathMetadata) {
        const { instance } = instanceWrapper;
        const routerPaths = this.pathsExplorer.scanForPaths(instance);
        this.applyPathsToRouterProxy(applicationRef, routerPaths, instanceWrapper, moduleKey, routePathMetadata, host);
    }
    extractRouterPath(metatype) {
        const path = Reflect.getMetadata(constants_1.PATH_METADATA, metatype);
        if ((0, shared_utils_1.isUndefined)(path)) {
            throw new unknown_request_mapping_exception_1.UnknownRequestMappingException(metatype);
        }
        if (Array.isArray(path)) {
            return path.map(p => (0, shared_utils_1.addLeadingSlash)(p));
        }
        return [(0, shared_utils_1.addLeadingSlash)(path)];
    }
    applyPathsToRouterProxy(router, routeDefinitions, instanceWrapper, moduleKey, routePathMetadata, host) {
        (routeDefinitions || []).forEach(routeDefinition => {
            const { version: methodVersion } = routeDefinition;
            routePathMetadata.methodVersion = methodVersion;
            this.applyCallbackToRouter(router, routeDefinition, instanceWrapper, moduleKey, routePathMetadata, host);
        });
    }
    applyCallbackToRouter(router, routeDefinition, instanceWrapper, moduleKey, routePathMetadata, host) {
        const { path: paths, requestMethod, targetCallback, methodName, } = routeDefinition;
        const { instance } = instanceWrapper;
        const routerMethodRef = this.routerMethodFactory
            .get(router, requestMethod)
            .bind(router);
        const isRequestScoped = !instanceWrapper.isDependencyTreeStatic();
        const proxy = isRequestScoped
            ? this.createRequestScopedHandler(instanceWrapper, requestMethod, this.container.getModuleByKey(moduleKey), moduleKey, methodName)
            : this.createCallbackProxy(instance, targetCallback, methodName, moduleKey, requestMethod);
        const isVersioned = (routePathMetadata.methodVersion ||
            routePathMetadata.controllerVersion) &&
            routePathMetadata.versioningOptions;
        let routeHandler = this.applyHostFilter(host, proxy);
        paths.forEach(path => {
            if (isVersioned &&
                routePathMetadata.versioningOptions.type !== enums_1.VersioningType.URI) {
                // All versioning (except for URI Versioning) is done via the "Version Filter"
                routeHandler = this.applyVersionFilter(router, routePathMetadata, routeHandler);
            }
            routePathMetadata.methodPath = path;
            const pathsToRegister = this.routePathFactory.create(routePathMetadata, requestMethod);
            pathsToRegister.forEach(path => {
                const entrypointDefinition = {
                    type: 'http-endpoint',
                    methodName,
                    className: instanceWrapper.name,
                    classNodeId: instanceWrapper.id,
                    metadata: {
                        key: path,
                        path,
                        requestMethod: enums_1.RequestMethod[requestMethod],
                        methodVersion: routePathMetadata.methodVersion,
                        controllerVersion: routePathMetadata.controllerVersion,
                    },
                };
                this.copyMetadataToCallback(targetCallback, routeHandler);
                routerMethodRef(path, routeHandler);
                this.graphInspector.insertEntrypointDefinition(entrypointDefinition, instanceWrapper.id);
            });
            const pathsToLog = this.routePathFactory.create({
                ...routePathMetadata,
                versioningOptions: undefined,
            }, requestMethod);
            pathsToLog.forEach(path => {
                if (isVersioned) {
                    const version = this.routePathFactory.getVersion(routePathMetadata);
                    this.logger.log((0, messages_1.VERSIONED_ROUTE_MAPPED_MESSAGE)(path, requestMethod, version));
                }
                else {
                    this.logger.log((0, messages_1.ROUTE_MAPPED_MESSAGE)(path, requestMethod));
                }
            });
        });
    }
    applyHostFilter(host, handler) {
        if (!host) {
            return handler;
        }
        const httpAdapterRef = this.container.getHttpAdapterRef();
        const hosts = Array.isArray(host) ? host : [host];
        const hostRegExps = hosts.map((host) => {
            const keys = [];
            const regexp = pathToRegexp(host, keys);
            return { regexp, keys };
        });
        const unsupportedFilteringErrorMessage = Array.isArray(host)
            ? `HTTP adapter does not support filtering on hosts: ["${host.join('", "')}"]`
            : `HTTP adapter does not support filtering on host: "${host}"`;
        return (req, res, next) => {
            req.hosts = {};
            const hostname = httpAdapterRef.getRequestHostname(req) || '';
            for (const exp of hostRegExps) {
                const match = hostname.match(exp.regexp);
                if (match) {
                    if (exp.keys.length > 0) {
                        exp.keys.forEach((key, i) => (req.hosts[key.name] = match[i + 1]));
                    }
                    else if (exp.regexp && match.groups) {
                        for (const groupName in match.groups) {
                            req.hosts[groupName] = match.groups[groupName];
                        }
                    }
                    return handler(req, res, next);
                }
            }
            if (!next) {
                throw new exceptions_1.InternalServerErrorException(unsupportedFilteringErrorMessage);
            }
            return next();
        };
    }
    applyVersionFilter(router, routePathMetadata, handler) {
        const version = this.routePathFactory.getVersion(routePathMetadata);
        return router.applyVersionFilter(handler, version, routePathMetadata.versioningOptions);
    }
    createCallbackProxy(instance, callback, methodName, moduleRef, requestMethod, contextId = constants_2.STATIC_CONTEXT, inquirerId) {
        const executionContext = this.executionContextCreator.create(instance, callback, methodName, moduleRef, requestMethod, contextId, inquirerId);
        const exceptionFilter = this.exceptionsFilter.create(instance, callback, moduleRef, contextId, inquirerId);
        return this.routerProxy.createProxy(executionContext, exceptionFilter);
    }
    createRequestScopedHandler(instanceWrapper, requestMethod, moduleRef, moduleKey, methodName) {
        const { instance } = instanceWrapper;
        const collection = moduleRef.controllers;
        const isTreeDurable = instanceWrapper.isDependencyTreeDurable();
        return async (req, res, next) => {
            try {
                const contextId = this.getContextId(req, isTreeDurable);
                const contextInstance = await this.injector.loadPerContext(instance, moduleRef, collection, contextId);
                await this.createCallbackProxy(contextInstance, contextInstance[methodName], methodName, moduleKey, requestMethod, contextId, instanceWrapper.id)(req, res, next);
            }
            catch (err) {
                let exceptionFilter = this.exceptionFiltersCache.get(instance[methodName]);
                if (!exceptionFilter) {
                    exceptionFilter = this.exceptionsFilter.create(instance, instance[methodName], moduleKey);
                    this.exceptionFiltersCache.set(instance[methodName], exceptionFilter);
                }
                const host = new execution_context_host_1.ExecutionContextHost([req, res, next]);
                exceptionFilter.next(err, host);
            }
        };
    }
    getContextId(request, isTreeDurable) {
        const contextId = context_id_factory_1.ContextIdFactory.getByRequest(request);
        if (!request[request_constants_1.REQUEST_CONTEXT_ID]) {
            Object.defineProperty(request, request_constants_1.REQUEST_CONTEXT_ID, {
                value: contextId,
                enumerable: false,
                writable: false,
                configurable: false,
            });
            const requestProviderValue = isTreeDurable ? contextId.payload : request;
            this.container.registerRequestProvider(requestProviderValue, contextId);
        }
        return contextId;
    }
    copyMetadataToCallback(originalCallback, targetCallback) {
        for (const key of Reflect.getMetadataKeys(originalCallback)) {
            Reflect.defineMetadata(key, Reflect.getMetadata(key, originalCallback), targetCallback);
        }
    }
}
exports.RouterExplorer = RouterExplorer;
