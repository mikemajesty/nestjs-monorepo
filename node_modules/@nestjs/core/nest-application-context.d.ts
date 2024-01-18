import { INestApplicationContext, Logger, LoggerService, LogLevel, ShutdownSignal } from '@nestjs/common';
import { DynamicModule, Type } from '@nestjs/common/interfaces';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { AbstractInstanceResolver } from './injector/abstract-instance-resolver';
import { NestContainer } from './injector/container';
import { Injector } from './injector/injector';
import { InstanceLinksHost } from './injector/instance-links-host';
import { ContextId } from './injector/instance-wrapper';
import { Module } from './injector/module';
/**
 * @publicApi
 */
export declare class NestApplicationContext<TOptions extends NestApplicationContextOptions = NestApplicationContextOptions> extends AbstractInstanceResolver implements INestApplicationContext {
    protected readonly container: NestContainer;
    protected readonly appOptions: TOptions;
    private contextModule;
    private readonly scope;
    protected isInitialized: boolean;
    protected injector: Injector;
    protected readonly logger: Logger;
    private shouldFlushLogsOnOverride;
    private readonly activeShutdownSignals;
    private readonly moduleCompiler;
    private shutdownCleanupRef?;
    private _instanceLinksHost;
    private _moduleRefsForHooksByDistance?;
    protected get instanceLinksHost(): InstanceLinksHost;
    constructor(container: NestContainer, appOptions?: TOptions, contextModule?: Module, scope?: Type<any>[]);
    selectContextModule(): void;
    /**
     * Allows navigating through the modules tree, for example, to pull out a specific instance from the selected module.
     * @returns {INestApplicationContext}
     */
    select<T>(moduleType: Type<T> | DynamicModule): INestApplicationContext;
    /**
     * Retrieves an instance of either injectable or controller, otherwise, throws exception.
     * @returns {TResult}
     */
    get<TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Function | string | symbol): TResult;
    /**
     * Retrieves an instance of either injectable or controller, otherwise, throws exception.
     * @returns {TResult}
     */
    get<TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Function | string | symbol, options: {
        strict?: boolean;
        each?: undefined | false;
    }): TResult;
    /**
     * Retrieves a list of instances of either injectables or controllers, otherwise, throws exception.
     * @returns {Array<TResult>}
     */
    get<TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Function | string | symbol, options: {
        strict?: boolean;
        each: true;
    }): Array<TResult>;
    /**
     * Resolves transient or request-scoped instance of either injectable or controller, otherwise, throws exception.
     * @returns {Array<TResult>}
     */
    resolve<TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Function | string | symbol): Promise<TResult>;
    /**
     * Resolves transient or request-scoped instance of either injectable or controller, otherwise, throws exception.
     * @returns {Array<TResult>}
     */
    resolve<TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Function | string | symbol, contextId?: {
        id: number;
    }): Promise<TResult>;
    /**
     * Resolves transient or request-scoped instance of either injectable or controller, otherwise, throws exception.
     * @returns {Array<TResult>}
     */
    resolve<TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Function | string | symbol, contextId?: {
        id: number;
    }, options?: {
        strict?: boolean;
        each?: undefined | false;
    }): Promise<TResult>;
    /**
     * Resolves transient or request-scoped instances of either injectables or controllers, otherwise, throws exception.
     * @returns {Array<TResult>}
     */
    resolve<TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Function | string | symbol, contextId?: {
        id: number;
    }, options?: {
        strict?: boolean;
        each: true;
    }): Promise<Array<TResult>>;
    /**
     * Registers the request/context object for a given context ID (DI container sub-tree).
     * @returns {void}
     */
    registerRequestByContextId<T = any>(request: T, contextId: ContextId): void;
    /**
     * Initializes the Nest application.
     * Calls the Nest lifecycle events.
     *
     * @returns {Promise<this>} The NestApplicationContext instance as Promise
     */
    init(): Promise<this>;
    /**
     * Terminates the application
     * @returns {Promise<void>}
     */
    close(signal?: string): Promise<void>;
    /**
     * Sets custom logger service.
     * Flushes buffered logs if auto flush is on.
     * @returns {void}
     */
    useLogger(logger: LoggerService | LogLevel[] | false): void;
    /**
     * Prints buffered logs and detaches buffer.
     * @returns {void}
     */
    flushLogs(): void;
    /**
     * Define that it must flush logs right after defining a custom logger.
     */
    flushLogsOnOverride(): void;
    /**
     * Enables the usage of shutdown hooks. Will call the
     * `onApplicationShutdown` function of a provider if the
     * process receives a shutdown signal.
     *
     * @param {ShutdownSignal[]} [signals=[]] The system signals it should listen to
     *
     * @returns {this} The Nest application context instance
     */
    enableShutdownHooks(signals?: (ShutdownSignal | string)[]): this;
    protected dispose(): Promise<void>;
    /**
     * Listens to shutdown signals by listening to
     * process events
     *
     * @param {string[]} signals The system signals it should listen to
     */
    protected listenToShutdownSignals(signals: string[]): void;
    /**
     * Unsubscribes from shutdown signals (process events)
     */
    protected unsubscribeFromProcessSignals(): void;
    /**
     * Calls the `onModuleInit` function on the registered
     * modules and its children.
     */
    protected callInitHook(): Promise<void>;
    /**
     * Calls the `onModuleDestroy` function on the registered
     * modules and its children.
     */
    protected callDestroyHook(): Promise<void>;
    /**
     * Calls the `onApplicationBootstrap` function on the registered
     * modules and its children.
     */
    protected callBootstrapHook(): Promise<void>;
    /**
     * Calls the `onApplicationShutdown` function on the registered
     * modules and children.
     */
    protected callShutdownHook(signal?: string): Promise<void>;
    /**
     * Calls the `beforeApplicationShutdown` function on the registered
     * modules and children.
     */
    protected callBeforeShutdownHook(signal?: string): Promise<void>;
    protected assertNotInPreviewMode(methodName: string): void;
    private getModulesToTriggerHooksOn;
    private printInPreviewModeWarning;
}
