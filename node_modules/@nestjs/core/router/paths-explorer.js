"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathsExplorer = void 0;
const constants_1 = require("@nestjs/common/constants");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
class PathsExplorer {
    constructor(metadataScanner) {
        this.metadataScanner = metadataScanner;
    }
    scanForPaths(instance, prototype) {
        const instancePrototype = (0, shared_utils_1.isUndefined)(prototype)
            ? Object.getPrototypeOf(instance)
            : prototype;
        return this.metadataScanner
            .getAllMethodNames(instancePrototype)
            .reduce((acc, method) => {
            const route = this.exploreMethodMetadata(instance, instancePrototype, method);
            if (route) {
                acc.push(route);
            }
            return acc;
        }, []);
    }
    exploreMethodMetadata(instance, prototype, methodName) {
        const instanceCallback = instance[methodName];
        const prototypeCallback = prototype[methodName];
        const routePath = Reflect.getMetadata(constants_1.PATH_METADATA, prototypeCallback);
        if ((0, shared_utils_1.isUndefined)(routePath)) {
            return null;
        }
        const requestMethod = Reflect.getMetadata(constants_1.METHOD_METADATA, prototypeCallback);
        const version = Reflect.getMetadata(constants_1.VERSION_METADATA, prototypeCallback);
        const path = (0, shared_utils_1.isString)(routePath)
            ? [(0, shared_utils_1.addLeadingSlash)(routePath)]
            : routePath.map((p) => (0, shared_utils_1.addLeadingSlash)(p));
        return {
            path,
            requestMethod,
            targetCallback: instanceCallback,
            methodName,
            version,
        };
    }
}
exports.PathsExplorer = PathsExplorer;
