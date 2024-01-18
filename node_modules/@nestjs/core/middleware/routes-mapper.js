"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesMapper = void 0;
const constants_1 = require("@nestjs/common/constants");
const interfaces_1 = require("@nestjs/common/interfaces");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const metadata_scanner_1 = require("../metadata-scanner");
const paths_explorer_1 = require("../router/paths-explorer");
const router_module_1 = require("../router/router-module");
class RoutesMapper {
    constructor(container, applicationConfig) {
        this.container = container;
        this.applicationConfig = applicationConfig;
        this.pathsExplorer = new paths_explorer_1.PathsExplorer(new metadata_scanner_1.MetadataScanner());
    }
    mapRouteToRouteInfo(controllerOrRoute) {
        if ((0, shared_utils_1.isString)(controllerOrRoute)) {
            return this.getRouteInfoFromPath(controllerOrRoute);
        }
        const routePathOrPaths = this.getRoutePath(controllerOrRoute);
        if (this.isRouteInfo(routePathOrPaths, controllerOrRoute)) {
            return this.getRouteInfoFromObject(controllerOrRoute);
        }
        return this.getRouteInfoFromController(controllerOrRoute, routePathOrPaths);
    }
    getRouteInfoFromPath(routePath) {
        const defaultRequestMethod = -1;
        return [
            {
                path: (0, shared_utils_1.addLeadingSlash)(routePath),
                method: defaultRequestMethod,
            },
        ];
    }
    getRouteInfoFromObject(routeInfoObject) {
        const routeInfo = {
            path: (0, shared_utils_1.addLeadingSlash)(routeInfoObject.path),
            method: routeInfoObject.method,
        };
        if (routeInfoObject.version) {
            routeInfo.version = routeInfoObject.version;
        }
        return [routeInfo];
    }
    getRouteInfoFromController(controller, routePath) {
        const controllerPaths = this.pathsExplorer.scanForPaths(Object.create(controller), controller.prototype);
        const controllerVersion = this.getVersionMetadata(controller);
        const versioningConfig = this.applicationConfig.getVersioning();
        const moduleRef = this.getHostModuleOfController(controller);
        const modulePath = this.getModulePath(moduleRef?.metatype);
        const concatPaths = (acc, currentValue) => acc.concat(currentValue);
        const toUndefinedIfNeural = (version) => version === interfaces_1.VERSION_NEUTRAL ? undefined : version;
        const toRouteInfo = (item, prefix) => item.path?.flatMap(p => {
            let endpointPath = modulePath ?? '';
            endpointPath += this.normalizeGlobalPath(prefix) + (0, shared_utils_1.addLeadingSlash)(p);
            const routeInfo = {
                path: endpointPath,
                method: item.requestMethod,
            };
            const version = item.version ?? controllerVersion;
            if (version && versioningConfig) {
                if (typeof version !== 'string' && Array.isArray(version)) {
                    return version.map(v => ({
                        ...routeInfo,
                        version: toUndefinedIfNeural(v),
                    }));
                }
                routeInfo.version = toUndefinedIfNeural(version);
            }
            return routeInfo;
        });
        return []
            .concat(routePath)
            .map(routePath => controllerPaths
            .map(item => toRouteInfo(item, routePath))
            .reduce(concatPaths, []))
            .reduce(concatPaths, []);
    }
    isRouteInfo(path, objectOrClass) {
        return (0, shared_utils_1.isUndefined)(path);
    }
    normalizeGlobalPath(path) {
        const prefix = (0, shared_utils_1.addLeadingSlash)(path);
        return prefix === '/' ? '' : prefix;
    }
    getRoutePath(route) {
        return Reflect.getMetadata(constants_1.PATH_METADATA, route);
    }
    getHostModuleOfController(metatype) {
        if (!metatype) {
            return;
        }
        const modulesContainer = this.container.getModules();
        const moduleRefsSet = router_module_1.targetModulesByContainer.get(modulesContainer);
        if (!moduleRefsSet) {
            return;
        }
        const modules = Array.from(modulesContainer.values()).filter(moduleRef => moduleRefsSet.has(moduleRef));
        return modules.find(({ controllers }) => controllers.has(metatype));
    }
    getModulePath(metatype) {
        if (!metatype) {
            return;
        }
        const modulesContainer = this.container.getModules();
        const modulePath = Reflect.getMetadata(constants_1.MODULE_PATH + modulesContainer.applicationId, metatype);
        return modulePath ?? Reflect.getMetadata(constants_1.MODULE_PATH, metatype);
    }
    getVersionMetadata(metatype) {
        const versioningConfig = this.applicationConfig.getVersioning();
        if (versioningConfig) {
            return (Reflect.getMetadata(constants_1.VERSION_METADATA, metatype) ??
                versioningConfig.defaultVersion);
        }
    }
}
exports.RoutesMapper = RoutesMapper;
