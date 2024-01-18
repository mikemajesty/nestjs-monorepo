"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementSignal = void 0;
/**
 * SettlementSignal is used to signal the resolution of a provider/instance.
 * Calling `complete` or `error` will resolve the promise returned by `asPromise`.
 * Can be used to detect circular dependencies.
 */
class SettlementSignal {
    constructor() {
        this._refs = new Set();
        this.completed = false;
        this.settledPromise = new Promise(resolve => {
            this.settleFn = resolve;
        });
    }
    /**
     * Resolves the promise returned by `asPromise`.
     */
    complete() {
        this.completed = true;
        this.settleFn();
    }
    /**
     * Rejects the promise returned by `asPromise` with the given error.
     * @param err Error to reject the promise returned by `asPromise` with.
     */
    error(err) {
        this.completed = true;
        this.settleFn(err);
    }
    /**
     * Returns a promise that will be resolved when `complete` or `error` is called.
     * @returns Promise that will be resolved when `complete` or `error` is called.
     */
    asPromise() {
        return this.settledPromise;
    }
    /**
     * Inserts a wrapper id that the host of this signal depends on.
     * @param wrapperId Wrapper id to insert.
     */
    insertRef(wrapperId) {
        this._refs.add(wrapperId);
    }
    /**
     * Check if relationship is circular.
     * @param wrapperId Wrapper id to check.
     * @returns True if relationship is circular, false otherwise.
     */
    isCycle(wrapperId) {
        return !this.completed && this._refs.has(wrapperId);
    }
}
exports.SettlementSignal = SettlementSignal;
