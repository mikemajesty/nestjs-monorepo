"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestApplicationContext = void 0;
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const iterare_1 = require("iterare");
const constants_1 = require("./constants");
const exceptions_1 = require("./errors/exceptions");
const context_id_factory_1 = require("./helpers/context-id-factory");
const hooks_1 = require("./hooks");
const abstract_instance_resolver_1 = require("./injector/abstract-instance-resolver");
const compiler_1 = require("./injector/compiler");
const injector_1 = require("./injector/injector");
const instance_links_host_1 = require("./injector/instance-links-host");
/**
 * @publicApi
 */
class NestApplicationContext extends abstract_instance_resolver_1.AbstractInstanceResolver {
    get instanceLinksHost() {
        if (!this._instanceLinksHost) {
            this._instanceLinksHost = new instance_links_host_1.InstanceLinksHost(this.container);
        }
        return this._instanceLinksHost;
    }
    constructor(container, appOptions = {}, contextModule = null, scope = new Array()) {
        super();
        this.container = container;
        this.appOptions = appOptions;
        this.contextModule = contextModule;
        this.scope = scope;
        this.isInitialized = false;
        this.logger = new common_1.Logger(NestApplicationContext.name, {
            timestamp: true,
        });
        this.shouldFlushLogsOnOverride = false;
        this.activeShutdownSignals = new Array();
        this.moduleCompiler = new compiler_1.ModuleCompiler();
        this.injector = new injector_1.Injector();
        if (this.appOptions.preview) {
            this.printInPreviewModeWarning();
        }
    }
    selectContextModule() {
        const modules = this.container.getModules().values();
        this.contextModule = modules.next().value;
    }
    /**
     * Allows navigating through the modules tree, for example, to pull out a specific instance from the selected module.
     * @returns {INestApplicationContext}
     */
    select(moduleType) {
        const modulesContainer = this.container.getModules();
        const contextModuleCtor = this.contextModule.metatype;
        const scope = this.scope.concat(contextModuleCtor);
        const moduleTokenFactory = this.container.getModuleTokenFactory();
        const { type, dynamicMetadata } = this.moduleCompiler.extractMetadata(moduleType);
        const token = moduleTokenFactory.create(type, dynamicMetadata);
        const selectedModule = modulesContainer.get(token);
        if (!selectedModule) {
            throw new exceptions_1.UnknownModuleException(type.name);
        }
        return new NestApplicationContext(this.container, this.appOptions, selectedModule, scope);
    }
    /**
     * Retrieves an instance (or a list of instances) of either injectable or controller, otherwise, throws exception.
     * @returns {TResult | Array<TResult>}
     */
    get(typeOrToken, options = { strict: false }) {
        return !(options && options.strict)
            ? this.find(typeOrToken, options)
            : this.find(typeOrToken, {
                moduleId: this.contextModule?.id,
                each: options.each,
            });
    }
    /**
     * Resolves transient or request-scoped instance (or a list of instances) of either injectable or controller, otherwise, throws exception.
     * @returns {Promise<TResult | Array<TResult>>}
     */
    resolve(typeOrToken, contextId = (0, context_id_factory_1.createContextId)(), options = { strict: false }) {
        return this.resolvePerContext(typeOrToken, this.contextModule, contextId, options);
    }
    /**
     * Registers the request/context object for a given context ID (DI container sub-tree).
     * @returns {void}
     */
    registerRequestByContextId(request, contextId) {
        this.container.registerRequestProvider(request, contextId);
    }
    /**
     * Initializes the Nest application.
     * Calls the Nest lifecycle events.
     *
     * @returns {Promise<this>} The NestApplicationContext instance as Promise
     */
    async init() {
        if (this.isInitialized) {
            return this;
        }
        await this.callInitHook();
        await this.callBootstrapHook();
        this.isInitialized = true;
        return this;
    }
    /**
     * Terminates the application
     * @returns {Promise<void>}
     */
    async close(signal) {
        await this.callDestroyHook();
        await this.callBeforeShutdownHook(signal);
        await this.dispose();
        await this.callShutdownHook(signal);
        this.unsubscribeFromProcessSignals();
    }
    /**
     * Sets custom logger service.
     * Flushes buffered logs if auto flush is on.
     * @returns {void}
     */
    useLogger(logger) {
        common_1.Logger.overrideLogger(logger);
        if (this.shouldFlushLogsOnOverride) {
            this.flushLogs();
        }
    }
    /**
     * Prints buffered logs and detaches buffer.
     * @returns {void}
     */
    flushLogs() {
        common_1.Logger.flush();
    }
    /**
     * Define that it must flush logs right after defining a custom logger.
     */
    flushLogsOnOverride() {
        this.shouldFlushLogsOnOverride = true;
    }
    /**
     * Enables the usage of shutdown hooks. Will call the
     * `onApplicationShutdown` function of a provider if the
     * process receives a shutdown signal.
     *
     * @param {ShutdownSignal[]} [signals=[]] The system signals it should listen to
     *
     * @returns {this} The Nest application context instance
     */
    enableShutdownHooks(signals = []) {
        if ((0, shared_utils_1.isEmpty)(signals)) {
            signals = Object.keys(common_1.ShutdownSignal).map((key) => common_1.ShutdownSignal[key]);
        }
        else {
            // given signals array should be unique because
            // process shouldn't listen to the same signal more than once.
            signals = Array.from(new Set(signals));
        }
        signals = (0, iterare_1.iterate)(signals)
            .map((signal) => signal.toString().toUpperCase().trim())
            // filter out the signals which is already listening to
            .filter(signal => !this.activeShutdownSignals.includes(signal))
            .toArray();
        this.listenToShutdownSignals(signals);
        return this;
    }
    async dispose() {
        // Nest application context has no server
        // to dispose, therefore just call a noop
        return Promise.resolve();
    }
    /**
     * Listens to shutdown signals by listening to
     * process events
     *
     * @param {string[]} signals The system signals it should listen to
     */
    listenToShutdownSignals(signals) {
        let receivedSignal = false;
        const cleanup = async (signal) => {
            try {
                if (receivedSignal) {
                    // If we receive another signal while we're waiting
                    // for the server to stop, just ignore it.
                    return;
                }
                receivedSignal = true;
                await this.callDestroyHook();
                await this.callBeforeShutdownHook(signal);
                await this.dispose();
                await this.callShutdownHook(signal);
                signals.forEach(sig => process.removeListener(sig, cleanup));
                process.kill(process.pid, signal);
            }
            catch (err) {
                common_1.Logger.error(constants_1.MESSAGES.ERROR_DURING_SHUTDOWN, err?.stack, NestApplicationContext.name);
                process.exit(1);
            }
        };
        this.shutdownCleanupRef = cleanup;
        signals.forEach((signal) => {
            this.activeShutdownSignals.push(signal);
            process.on(signal, cleanup);
        });
    }
    /**
     * Unsubscribes from shutdown signals (process events)
     */
    unsubscribeFromProcessSignals() {
        if (!this.shutdownCleanupRef) {
            return;
        }
        this.activeShutdownSignals.forEach(signal => {
            process.removeListener(signal, this.shutdownCleanupRef);
        });
    }
    /**
     * Calls the `onModuleInit` function on the registered
     * modules and its children.
     */
    async callInitHook() {
        const modulesSortedByDistance = this.getModulesToTriggerHooksOn();
        for (const module of modulesSortedByDistance) {
            await (0, hooks_1.callModuleInitHook)(module);
        }
    }
    /**
     * Calls the `onModuleDestroy` function on the registered
     * modules and its children.
     */
    async callDestroyHook() {
        const modulesSortedByDistance = this.getModulesToTriggerHooksOn();
        for (const module of modulesSortedByDistance) {
            await (0, hooks_1.callModuleDestroyHook)(module);
        }
    }
    /**
     * Calls the `onApplicationBootstrap` function on the registered
     * modules and its children.
     */
    async callBootstrapHook() {
        const modulesSortedByDistance = this.getModulesToTriggerHooksOn();
        for (const module of modulesSortedByDistance) {
            await (0, hooks_1.callModuleBootstrapHook)(module);
        }
    }
    /**
     * Calls the `onApplicationShutdown` function on the registered
     * modules and children.
     */
    async callShutdownHook(signal) {
        const modulesSortedByDistance = this.getModulesToTriggerHooksOn();
        for (const module of modulesSortedByDistance) {
            await (0, hooks_1.callAppShutdownHook)(module, signal);
        }
    }
    /**
     * Calls the `beforeApplicationShutdown` function on the registered
     * modules and children.
     */
    async callBeforeShutdownHook(signal) {
        const modulesSortedByDistance = this.getModulesToTriggerHooksOn();
        for (const module of modulesSortedByDistance) {
            await (0, hooks_1.callBeforeAppShutdownHook)(module, signal);
        }
    }
    assertNotInPreviewMode(methodName) {
        if (this.appOptions.preview) {
            const error = `Calling the "${methodName}" in the preview mode is not supported.`;
            this.logger.error(error);
            throw new Error(error);
        }
    }
    getModulesToTriggerHooksOn() {
        if (this._moduleRefsForHooksByDistance) {
            return this._moduleRefsForHooksByDistance;
        }
        const modulesContainer = this.container.getModules();
        const compareFn = (a, b) => b.distance - a.distance;
        const modulesSortedByDistance = Array.from(modulesContainer.values()).sort(compareFn);
        this._moduleRefsForHooksByDistance = this.appOptions?.preview
            ? modulesSortedByDistance.filter(moduleRef => moduleRef.initOnPreview)
            : modulesSortedByDistance;
        return this._moduleRefsForHooksByDistance;
    }
    printInPreviewModeWarning() {
        this.logger.warn('------------------------------------------------');
        this.logger.warn('Application is running in the PREVIEW mode!');
        this.logger.warn('Providers/controllers will not be instantiated.');
        this.logger.warn('------------------------------------------------');
    }
}
exports.NestApplicationContext = NestApplicationContext;
