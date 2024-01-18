"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestApplication = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("@nestjs/common/services/logger.service");
const load_package_util_1 = require("@nestjs/common/utils/load-package.util");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const iterare_1 = require("iterare");
const os_1 = require("os");
const application_config_1 = require("./application-config");
const constants_1 = require("./constants");
const optional_require_1 = require("./helpers/optional-require");
const injector_1 = require("./injector/injector");
const container_1 = require("./middleware/container");
const middleware_module_1 = require("./middleware/middleware-module");
const utils_1 = require("./middleware/utils");
const nest_application_context_1 = require("./nest-application-context");
const routes_resolver_1 = require("./router/routes-resolver");
const { SocketModule } = (0, optional_require_1.optionalRequire)('@nestjs/websockets/socket-module', () => require('@nestjs/websockets/socket-module'));
const { MicroservicesModule } = (0, optional_require_1.optionalRequire)('@nestjs/microservices/microservices-module', () => require('@nestjs/microservices/microservices-module'));
/**
 * @publicApi
 */
class NestApplication extends nest_application_context_1.NestApplicationContext {
    constructor(container, httpAdapter, config, graphInspector, appOptions = {}) {
        super(container, appOptions);
        this.httpAdapter = httpAdapter;
        this.config = config;
        this.graphInspector = graphInspector;
        this.logger = new logger_service_1.Logger(NestApplication.name, {
            timestamp: true,
        });
        this.middlewareContainer = new container_1.MiddlewareContainer(this.container);
        this.microservicesModule = MicroservicesModule && new MicroservicesModule();
        this.socketModule = SocketModule && new SocketModule();
        this.microservices = [];
        this.isListening = false;
        this.selectContextModule();
        this.registerHttpServer();
        this.injector = new injector_1.Injector({ preview: this.appOptions.preview });
        this.middlewareModule = new middleware_module_1.MiddlewareModule();
        this.routesResolver = new routes_resolver_1.RoutesResolver(this.container, this.config, this.injector, this.graphInspector);
    }
    async dispose() {
        this.socketModule && (await this.socketModule.close());
        this.microservicesModule && (await this.microservicesModule.close());
        this.httpAdapter && (await this.httpAdapter.close());
        await Promise.all((0, iterare_1.iterate)(this.microservices).map(async (microservice) => {
            microservice.setIsTerminated(true);
            await microservice.close();
        }));
    }
    getHttpAdapter() {
        return this.httpAdapter;
    }
    registerHttpServer() {
        this.httpServer = this.createServer();
    }
    getUnderlyingHttpServer() {
        return this.httpAdapter.getHttpServer();
    }
    applyOptions() {
        if (!this.appOptions || !this.appOptions.cors) {
            return undefined;
        }
        const passCustomOptions = (0, shared_utils_1.isObject)(this.appOptions.cors) || (0, shared_utils_1.isFunction)(this.appOptions.cors);
        if (!passCustomOptions) {
            return this.enableCors();
        }
        return this.enableCors(this.appOptions.cors);
    }
    createServer() {
        this.httpAdapter.initHttpServer(this.appOptions);
        return this.httpAdapter.getHttpServer();
    }
    async registerModules() {
        this.registerWsModule();
        if (this.microservicesModule) {
            this.microservicesModule.register(this.container, this.graphInspector, this.config, this.appOptions);
            this.microservicesModule.setupClients(this.container);
        }
        await this.middlewareModule.register(this.middlewareContainer, this.container, this.config, this.injector, this.httpAdapter, this.graphInspector, this.appOptions);
    }
    registerWsModule() {
        if (!this.socketModule) {
            return;
        }
        this.socketModule.register(this.container, this.config, this.graphInspector, this.appOptions, this.httpServer);
    }
    async init() {
        if (this.isInitialized) {
            return this;
        }
        this.applyOptions();
        await this.httpAdapter?.init();
        const useBodyParser = this.appOptions && this.appOptions.bodyParser !== false;
        useBodyParser && this.registerParserMiddleware();
        await this.registerModules();
        await this.registerRouter();
        await this.callInitHook();
        await this.registerRouterHooks();
        await this.callBootstrapHook();
        this.isInitialized = true;
        this.logger.log(constants_1.MESSAGES.APPLICATION_READY);
        return this;
    }
    registerParserMiddleware() {
        const prefix = this.config.getGlobalPrefix();
        const rawBody = !!this.appOptions?.rawBody;
        this.httpAdapter.registerParserMiddleware(prefix, rawBody);
    }
    async registerRouter() {
        await this.registerMiddleware(this.httpAdapter);
        const prefix = this.config.getGlobalPrefix();
        const basePath = (0, shared_utils_1.addLeadingSlash)(prefix);
        this.routesResolver.resolve(this.httpAdapter, basePath);
    }
    async registerRouterHooks() {
        this.routesResolver.registerNotFoundHandler();
        this.routesResolver.registerExceptionHandler();
    }
    connectMicroservice(microserviceOptions, hybridAppOptions = {}) {
        const { NestMicroservice } = (0, load_package_util_1.loadPackage)('@nestjs/microservices', 'NestFactory', () => require('@nestjs/microservices'));
        const { inheritAppConfig } = hybridAppOptions;
        const applicationConfig = inheritAppConfig
            ? this.config
            : new application_config_1.ApplicationConfig();
        const instance = new NestMicroservice(this.container, microserviceOptions, this.graphInspector, applicationConfig);
        instance.registerListeners();
        instance.setIsInitialized(true);
        instance.setIsInitHookCalled(true);
        this.microservices.push(instance);
        return instance;
    }
    getMicroservices() {
        return this.microservices;
    }
    getHttpServer() {
        return this.httpServer;
    }
    async startAllMicroservices() {
        this.assertNotInPreviewMode('startAllMicroservices');
        await Promise.all(this.microservices.map(msvc => msvc.listen()));
        return this;
    }
    use(...args) {
        this.httpAdapter.use(...args);
        return this;
    }
    useBodyParser(...args) {
        if (!('useBodyParser' in this.httpAdapter)) {
            this.logger.warn('Your HTTP Adapter does not support `.useBodyParser`.');
            return this;
        }
        const [parserType, ...otherArgs] = args;
        const rawBody = !!this.appOptions.rawBody;
        this.httpAdapter.useBodyParser(...[parserType, rawBody, ...otherArgs]);
        return this;
    }
    enableCors(options) {
        this.httpAdapter.enableCors(options);
    }
    enableVersioning(options = { type: common_1.VersioningType.URI }) {
        this.config.enableVersioning(options);
        return this;
    }
    async listen(port, ...args) {
        this.assertNotInPreviewMode('listen');
        !this.isInitialized && (await this.init());
        return new Promise((resolve, reject) => {
            const errorHandler = (e) => {
                this.logger.error(e?.toString?.());
                reject(e);
            };
            this.httpServer.once('error', errorHandler);
            const isCallbackInOriginalArgs = (0, shared_utils_1.isFunction)(args[args.length - 1]);
            const listenFnArgs = isCallbackInOriginalArgs
                ? args.slice(0, args.length - 1)
                : args;
            this.httpAdapter.listen(port, ...listenFnArgs, (...originalCallbackArgs) => {
                if (this.appOptions?.autoFlushLogs ?? true) {
                    this.flushLogs();
                }
                if (originalCallbackArgs[0] instanceof Error) {
                    return reject(originalCallbackArgs[0]);
                }
                const address = this.httpServer.address();
                if (address) {
                    this.httpServer.removeListener('error', errorHandler);
                    this.isListening = true;
                    resolve(this.httpServer);
                }
                if (isCallbackInOriginalArgs) {
                    args[args.length - 1](...originalCallbackArgs);
                }
            });
        });
    }
    async getUrl() {
        return new Promise((resolve, reject) => {
            if (!this.isListening) {
                this.logger.error(constants_1.MESSAGES.CALL_LISTEN_FIRST);
                reject(constants_1.MESSAGES.CALL_LISTEN_FIRST);
                return;
            }
            const address = this.httpServer.address();
            resolve(this.formatAddress(address));
        });
    }
    formatAddress(address) {
        if ((0, shared_utils_1.isString)(address)) {
            if ((0, os_1.platform)() === 'win32') {
                return address;
            }
            const basePath = encodeURIComponent(address);
            return `${this.getProtocol()}+unix://${basePath}`;
        }
        let host = this.host();
        if (address && address.family === 'IPv6') {
            if (host === '::') {
                host = '[::1]';
            }
            else {
                host = `[${host}]`;
            }
        }
        else if (host === '0.0.0.0') {
            host = '127.0.0.1';
        }
        return `${this.getProtocol()}://${host}:${address.port}`;
    }
    setGlobalPrefix(prefix, options) {
        this.config.setGlobalPrefix(prefix);
        if (options) {
            const exclude = options?.exclude
                ? (0, utils_1.mapToExcludeRoute)(options.exclude)
                : [];
            this.config.setGlobalPrefixOptions({
                ...options,
                exclude,
            });
        }
        return this;
    }
    useWebSocketAdapter(adapter) {
        this.config.setIoAdapter(adapter);
        return this;
    }
    useGlobalFilters(...filters) {
        this.config.useGlobalFilters(...filters);
        filters.forEach(item => this.graphInspector.insertOrphanedEnhancer({
            subtype: 'filter',
            ref: item,
        }));
        return this;
    }
    useGlobalPipes(...pipes) {
        this.config.useGlobalPipes(...pipes);
        pipes.forEach(item => this.graphInspector.insertOrphanedEnhancer({
            subtype: 'pipe',
            ref: item,
        }));
        return this;
    }
    useGlobalInterceptors(...interceptors) {
        this.config.useGlobalInterceptors(...interceptors);
        interceptors.forEach(item => this.graphInspector.insertOrphanedEnhancer({
            subtype: 'interceptor',
            ref: item,
        }));
        return this;
    }
    useGlobalGuards(...guards) {
        this.config.useGlobalGuards(...guards);
        guards.forEach(item => this.graphInspector.insertOrphanedEnhancer({
            subtype: 'guard',
            ref: item,
        }));
        return this;
    }
    useStaticAssets(pathOrOptions, options) {
        this.httpAdapter.useStaticAssets &&
            this.httpAdapter.useStaticAssets(pathOrOptions, options);
        return this;
    }
    setBaseViewsDir(path) {
        this.httpAdapter.setBaseViewsDir && this.httpAdapter.setBaseViewsDir(path);
        return this;
    }
    setViewEngine(engineOrOptions) {
        this.httpAdapter.setViewEngine &&
            this.httpAdapter.setViewEngine(engineOrOptions);
        return this;
    }
    host() {
        const address = this.httpServer.address();
        if ((0, shared_utils_1.isString)(address)) {
            return undefined;
        }
        return address && address.address;
    }
    getProtocol() {
        return this.appOptions && this.appOptions.httpsOptions ? 'https' : 'http';
    }
    async registerMiddleware(instance) {
        await this.middlewareModule.registerMiddleware(this.middlewareContainer, instance);
    }
}
exports.NestApplication = NestApplication;
