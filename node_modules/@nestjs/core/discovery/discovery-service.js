"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoveryService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const uid_1 = require("uid");
const modules_container_1 = require("../injector/modules-container");
const discoverable_meta_host_collection_1 = require("./discoverable-meta-host-collection");
/**
 * @publicApi
 */
let DiscoveryService = class DiscoveryService {
    constructor(modulesContainer) {
        this.modulesContainer = modulesContainer;
    }
    /**
     * Creates a decorator that can be used to decorate classes and methods with metadata.
     * The decorator will also add the class to the collection of discoverable classes (by metadata key).
     * Decorated classes can be discovered using the `getProviders` and `getControllers` methods.
     * @returns A decorator function.
     */
    static createDecorator() {
        const metadataKey = (0, uid_1.uid)(21);
        const decoratorFn = (opts) => (target, key, descriptor) => {
            if (!descriptor) {
                discoverable_meta_host_collection_1.DiscoverableMetaHostCollection.addClassMetaHostLink(target, metadataKey);
            }
            (0, common_1.SetMetadata)(metadataKey, opts ?? {})(target, key, descriptor);
        };
        decoratorFn.KEY = metadataKey;
        return decoratorFn;
    }
    /**
     * Returns an array of instance wrappers (providers).
     * Depending on the options, the array will contain either all providers or only providers with the specified metadata key.
     * @param options Discovery options.
     * @param modules A list of modules to filter by.
     * @returns An array of instance wrappers (providers).
     */
    getProviders(options = {}, modules = this.getModules(options)) {
        if ('metadataKey' in options) {
            const providers = discoverable_meta_host_collection_1.DiscoverableMetaHostCollection.getProvidersByMetaKey(this.modulesContainer, options.metadataKey);
            return Array.from(providers);
        }
        const providers = modules.map(item => [...item.providers.values()]);
        return (0, common_1.flatten)(providers);
    }
    /**
     * Returns an array of instance wrappers (controllers).
     * Depending on the options, the array will contain either all controllers or only controllers with the specified metadata key.
     * @param options Discovery options.
     * @param modules A list of modules to filter by.
     * @returns An array of instance wrappers (controllers).
     */
    getControllers(options = {}, modules = this.getModules(options)) {
        if ('metadataKey' in options) {
            const controllers = discoverable_meta_host_collection_1.DiscoverableMetaHostCollection.getControllersByMetaKey(this.modulesContainer, options.metadataKey);
            return Array.from(controllers);
        }
        const controllers = modules.map(item => [...item.controllers.values()]);
        return (0, common_1.flatten)(controllers);
    }
    /**
     * Retrieves metadata from the specified instance wrapper.
     * @param decorator The decorator to retrieve metadata of.
     * @param instanceWrapper Reference to the instance wrapper.
     * @param methodKey An optional method key to retrieve metadata from.
     * @returns Discovered metadata.
     */
    getMetadataByDecorator(decorator, instanceWrapper, methodKey) {
        if (methodKey) {
            return Reflect.getMetadata(decorator.KEY, instanceWrapper.instance[methodKey]);
        }
        const clsRef = instanceWrapper.instance?.constructor ?? instanceWrapper.metatype;
        return Reflect.getMetadata(decorator.KEY, clsRef);
    }
    /**
     * Returns a list of modules to be used for discovery.
     */
    getModules(options = {}) {
        const includeInOpts = 'include' in options;
        if (!includeInOpts) {
            const moduleRefs = [...this.modulesContainer.values()];
            return moduleRefs;
        }
        const whitelisted = this.includeWhitelisted(options.include);
        return whitelisted;
    }
    includeWhitelisted(include) {
        const moduleRefs = [...this.modulesContainer.values()];
        return moduleRefs.filter(({ metatype }) => include.some(item => item === metatype));
    }
};
exports.DiscoveryService = DiscoveryService;
exports.DiscoveryService = DiscoveryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [modules_container_1.ModulesContainer])
], DiscoveryService);
