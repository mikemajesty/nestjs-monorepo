import { ContextId, HostComponentInfo } from '../injector/instance-wrapper';
export declare function createContextId(): ContextId;
export type ContextIdResolverFn = (info: HostComponentInfo) => ContextId;
export interface ContextIdResolver {
    /**
     * Payload associated with the custom context id
     */
    payload: unknown;
    /**
     * A context id resolver function
     */
    resolve: ContextIdResolverFn;
}
export interface ContextIdStrategy<T = any> {
    /**
     * Allows to attach a parent context id to the existing child context id.
     * This lets you construct durable DI sub-trees that can be shared between contexts.
     * @param contextId auto-generated child context id
     * @param request request object
     */
    attach(contextId: ContextId, request: T): ContextIdResolverFn | ContextIdResolver | undefined;
}
export declare class ContextIdFactory {
    private static strategy?;
    /**
     * Generates a context identifier based on the request object.
     */
    static create(): ContextId;
    /**
     * Generates a random identifier to track asynchronous execution context.
     * @param request request object
     */
    static getByRequest<T extends Record<any, any> = any>(request: T, propsToInspect?: string[]): ContextId;
    /**
     * Registers a custom context id strategy that lets you attach
     * a parent context id to the existing context id object.
     * @param strategy strategy instance
     */
    static apply(strategy: ContextIdStrategy): void;
    private static isContextIdResolverWithPayload;
}
