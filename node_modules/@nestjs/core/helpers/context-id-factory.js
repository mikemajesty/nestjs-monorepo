"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextIdFactory = exports.createContextId = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const request_constants_1 = require("../router/request/request-constants");
function createContextId() {
    /**
     * We are generating random identifier to track asynchronous
     * execution context. An identifier does not have to be neither unique
     * nor unpredictable because WeakMap uses objects as keys (reference comparison).
     * Thus, even though identifier number might be equal, WeakMap would properly
     * associate asynchronous context with its internal map values using object reference.
     * Object is automatically removed once request has been processed (closure).
     */
    return { id: Math.random() };
}
exports.createContextId = createContextId;
class ContextIdFactory {
    /**
     * Generates a context identifier based on the request object.
     */
    static create() {
        return createContextId();
    }
    /**
     * Generates a random identifier to track asynchronous execution context.
     * @param request request object
     */
    static getByRequest(request, propsToInspect = ['raw']) {
        if (!request) {
            return ContextIdFactory.create();
        }
        if (request[request_constants_1.REQUEST_CONTEXT_ID]) {
            return request[request_constants_1.REQUEST_CONTEXT_ID];
        }
        for (const key of propsToInspect) {
            if (request[key]?.[request_constants_1.REQUEST_CONTEXT_ID]) {
                return request[key][request_constants_1.REQUEST_CONTEXT_ID];
            }
        }
        if (!this.strategy) {
            return ContextIdFactory.create();
        }
        const contextId = createContextId();
        const resolverObjectOrFunction = this.strategy.attach(contextId, request);
        if (this.isContextIdResolverWithPayload(resolverObjectOrFunction)) {
            contextId.getParent = resolverObjectOrFunction.resolve;
            contextId.payload = resolverObjectOrFunction.payload;
        }
        else {
            contextId.getParent = resolverObjectOrFunction;
        }
        return contextId;
    }
    /**
     * Registers a custom context id strategy that lets you attach
     * a parent context id to the existing context id object.
     * @param strategy strategy instance
     */
    static apply(strategy) {
        this.strategy = strategy;
    }
    static isContextIdResolverWithPayload(resolverOrResolverFn) {
        return (0, shared_utils_1.isObject)(resolverOrResolverFn);
    }
}
exports.ContextIdFactory = ContextIdFactory;
