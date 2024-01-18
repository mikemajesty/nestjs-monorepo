"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareBuilder = void 0;
const dependencies_decorator_1 = require("@nestjs/common/decorators/core/dependencies.decorator");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const iterare_1 = require("iterare");
const utils_1 = require("./utils");
class MiddlewareBuilder {
    constructor(routesMapper, httpAdapter, routeInfoPathExtractor) {
        this.routesMapper = routesMapper;
        this.httpAdapter = httpAdapter;
        this.routeInfoPathExtractor = routeInfoPathExtractor;
        this.middlewareCollection = new Set();
    }
    apply(...middleware) {
        return new MiddlewareBuilder.ConfigProxy(this, (0, dependencies_decorator_1.flatten)(middleware), this.routeInfoPathExtractor);
    }
    build() {
        return [...this.middlewareCollection];
    }
    getHttpAdapter() {
        return this.httpAdapter;
    }
}
exports.MiddlewareBuilder = MiddlewareBuilder;
MiddlewareBuilder.ConfigProxy = class {
    constructor(builder, middleware, routeInfoPathExtractor) {
        this.builder = builder;
        this.middleware = middleware;
        this.routeInfoPathExtractor = routeInfoPathExtractor;
        this.excludedRoutes = [];
    }
    getExcludedRoutes() {
        return this.excludedRoutes;
    }
    exclude(...routes) {
        this.excludedRoutes = this.getRoutesFlatList(routes).map(route => ({
            ...route,
            path: this.routeInfoPathExtractor.extractPathFrom(route),
        }));
        return this;
    }
    forRoutes(...routes) {
        const { middlewareCollection } = this.builder;
        const flattedRoutes = this.getRoutesFlatList(routes);
        const forRoutes = this.removeOverlappedRoutes(flattedRoutes);
        const configuration = {
            middleware: (0, utils_1.filterMiddleware)(this.middleware, this.excludedRoutes, this.builder.getHttpAdapter()),
            forRoutes,
        };
        middlewareCollection.add(configuration);
        return this.builder;
    }
    getRoutesFlatList(routes) {
        const { routesMapper } = this.builder;
        return (0, iterare_1.iterate)(routes)
            .map(route => routesMapper.mapRouteToRouteInfo(route))
            .flatten()
            .toArray();
    }
    removeOverlappedRoutes(routes) {
        const regexMatchParams = /(:[^\/]*)/g;
        const wildcard = '([^/]*)';
        const routesWithRegex = routes
            .filter(route => route.path.includes(':'))
            .map(route => ({
            method: route.method,
            path: route.path,
            regex: new RegExp('^(' + route.path.replace(regexMatchParams, wildcard) + ')$', 'g'),
        }));
        return routes.filter(route => {
            const isOverlapped = (item) => {
                if (route.method !== item.method) {
                    return false;
                }
                const normalizedRoutePath = (0, shared_utils_1.stripEndSlash)(route.path);
                return (normalizedRoutePath !== item.path &&
                    item.regex.test(normalizedRoutePath));
            };
            const routeMatch = routesWithRegex.find(isOverlapped);
            return routeMatch === undefined;
        });
    }
};
