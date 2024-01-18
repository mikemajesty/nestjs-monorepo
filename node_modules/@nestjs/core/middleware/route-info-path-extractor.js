"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteInfoPathExtractor = void 0;
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const utils_1 = require("../router/utils");
const route_path_factory_1 = require("./../router/route-path-factory");
class RouteInfoPathExtractor {
    constructor(applicationConfig) {
        this.applicationConfig = applicationConfig;
        this.routePathFactory = new route_path_factory_1.RoutePathFactory(applicationConfig);
        this.prefixPath = (0, shared_utils_1.stripEndSlash)((0, shared_utils_1.addLeadingSlash)(this.applicationConfig.getGlobalPrefix()));
        this.excludedGlobalPrefixRoutes =
            this.applicationConfig.getGlobalPrefixOptions().exclude;
        this.versioningConfig = this.applicationConfig.getVersioning();
    }
    extractPathsFrom({ path, method, version }) {
        const versionPath = this.extractVersionPathFrom(version);
        if (this.isAWildcard(path)) {
            return Array.isArray(this.excludedGlobalPrefixRoutes)
                ? [
                    this.prefixPath + versionPath + (0, shared_utils_1.addLeadingSlash)(path),
                    ...this.excludedGlobalPrefixRoutes.map(route => versionPath + (0, shared_utils_1.addLeadingSlash)(route.path)),
                ]
                : [this.prefixPath + versionPath + (0, shared_utils_1.addLeadingSlash)(path)];
        }
        return [this.extractNonWildcardPathFrom({ path, method, version })];
    }
    extractPathFrom(route) {
        if (this.isAWildcard(route.path) && !route.version) {
            return (0, shared_utils_1.addLeadingSlash)(route.path);
        }
        return this.extractNonWildcardPathFrom(route);
    }
    isAWildcard(path) {
        return ['*', '/*', '/*/', '(.*)', '/(.*)'].includes(path);
    }
    extractNonWildcardPathFrom({ path, method, version, }) {
        const versionPath = this.extractVersionPathFrom(version);
        if (Array.isArray(this.excludedGlobalPrefixRoutes) &&
            (0, utils_1.isRouteExcluded)(this.excludedGlobalPrefixRoutes, path, method)) {
            return versionPath + (0, shared_utils_1.addLeadingSlash)(path);
        }
        return this.prefixPath + versionPath + (0, shared_utils_1.addLeadingSlash)(path);
    }
    extractVersionPathFrom(version) {
        if (!version || this.versioningConfig?.type !== common_1.VersioningType.URI)
            return '';
        const versionPrefix = this.routePathFactory.getVersionPrefix(this.versioningConfig);
        return (0, shared_utils_1.addLeadingSlash)(versionPrefix + version.toString());
    }
}
exports.RouteInfoPathExtractor = RouteInfoPathExtractor;
