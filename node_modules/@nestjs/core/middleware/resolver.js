"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareResolver = void 0;
class MiddlewareResolver {
    constructor(middlewareContainer, injector) {
        this.middlewareContainer = middlewareContainer;
        this.injector = injector;
    }
    async resolveInstances(moduleRef, moduleName) {
        const middlewareMap = this.middlewareContainer.getMiddlewareCollection(moduleName);
        const resolveInstance = async (wrapper) => this.resolveMiddlewareInstance(wrapper, middlewareMap, moduleRef);
        await Promise.all([...middlewareMap.values()].map(resolveInstance));
    }
    async resolveMiddlewareInstance(wrapper, middlewareMap, moduleRef) {
        await this.injector.loadMiddleware(wrapper, middlewareMap, moduleRef);
    }
}
exports.MiddlewareResolver = MiddlewareResolver;
