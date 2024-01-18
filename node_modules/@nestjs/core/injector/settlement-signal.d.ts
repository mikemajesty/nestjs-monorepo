/**
 * SettlementSignal is used to signal the resolution of a provider/instance.
 * Calling `complete` or `error` will resolve the promise returned by `asPromise`.
 * Can be used to detect circular dependencies.
 */
export declare class SettlementSignal {
    private readonly _refs;
    private readonly settledPromise;
    private settleFn;
    private completed;
    constructor();
    /**
     * Resolves the promise returned by `asPromise`.
     */
    complete(): void;
    /**
     * Rejects the promise returned by `asPromise` with the given error.
     * @param err Error to reject the promise returned by `asPromise` with.
     */
    error(err: unknown): void;
    /**
     * Returns a promise that will be resolved when `complete` or `error` is called.
     * @returns Promise that will be resolved when `complete` or `error` is called.
     */
    asPromise(): Promise<unknown>;
    /**
     * Inserts a wrapper id that the host of this signal depends on.
     * @param wrapperId Wrapper id to insert.
     */
    insertRef(wrapperId: string): void;
    /**
     * Check if relationship is circular.
     * @param wrapperId Wrapper id to check.
     * @returns True if relationship is circular, false otherwise.
     */
    isCycle(wrapperId: string): boolean;
}
