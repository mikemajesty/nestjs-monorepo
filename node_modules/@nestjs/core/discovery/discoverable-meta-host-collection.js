"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoverableMetaHostCollection = void 0;
class DiscoverableMetaHostCollection {
    /**
     * Adds a link between a class reference and a metadata key.
     * @param target The class reference.
     * @param metadataKey The metadata key.
     */
    static addClassMetaHostLink(target, metadataKey) {
        this.metaHostLinks.set(target, metadataKey);
    }
    /**
     * Inspects a provider instance wrapper and adds it to the collection of providers
     * if it has a metadata key.
     * @param hostContainerRef A reference to the modules container.
     * @param instanceWrapper A provider instance wrapper.
     * @returns void
     */
    static inspectProvider(hostContainerRef, instanceWrapper) {
        return this.inspectInstanceWrapper(hostContainerRef, instanceWrapper, this.providersByMetaKey);
    }
    /**
     * Inspects a controller instance wrapper and adds it to the collection of controllers
     * if it has a metadata key.
     * @param hostContainerRef A reference to the modules container.
     * @param instanceWrapper A controller's instance wrapper.
     * @returns void
     */
    static inspectController(hostContainerRef, instanceWrapper) {
        return this.inspectInstanceWrapper(hostContainerRef, instanceWrapper, this.controllersByMetaKey);
    }
    static insertByMetaKey(metaKey, instanceWrapper, collection) {
        if (collection.has(metaKey)) {
            const wrappers = collection.get(metaKey);
            wrappers.add(instanceWrapper);
        }
        else {
            const wrappers = new Set();
            wrappers.add(instanceWrapper);
            collection.set(metaKey, wrappers);
        }
    }
    static getProvidersByMetaKey(hostContainerRef, metaKey) {
        const wrappersByMetaKey = this.providersByMetaKey.get(hostContainerRef);
        return wrappersByMetaKey?.get(metaKey) ?? new Set();
    }
    static getControllersByMetaKey(hostContainerRef, metaKey) {
        const wrappersByMetaKey = this.controllersByMetaKey.get(hostContainerRef);
        return wrappersByMetaKey?.get(metaKey) ?? new Set();
    }
    static inspectInstanceWrapper(hostContainerRef, instanceWrapper, wrapperByMetaKeyMap) {
        const metaKey = DiscoverableMetaHostCollection.getMetaKeyByInstanceWrapper(instanceWrapper);
        if (!metaKey) {
            return;
        }
        let collection;
        if (wrapperByMetaKeyMap.has(hostContainerRef)) {
            collection = wrapperByMetaKeyMap.get(hostContainerRef);
        }
        else {
            collection = new Map();
            wrapperByMetaKeyMap.set(hostContainerRef, collection);
        }
        this.insertByMetaKey(metaKey, instanceWrapper, collection);
    }
    static getMetaKeyByInstanceWrapper(instanceWrapper) {
        return this.metaHostLinks.get(
        // NOTE: Regarding the ternary statement below,
        // - The condition `!wrapper.metatype` is needed because when we use `useValue`
        // the value of `wrapper.metatype` will be `null`.
        // - The condition `wrapper.inject` is needed here because when we use
        // `useFactory`, the value of `wrapper.metatype` will be the supplied
        // factory function.
        // For both cases, we should use `wrapper.instance.constructor` instead
        // of `wrapper.metatype` to resolve processor's class properly.
        // But since calling `wrapper.instance` could degrade overall performance
        // we must defer it as much we can.
        instanceWrapper.metatype || instanceWrapper.inject
            ? instanceWrapper.instance?.constructor ?? instanceWrapper.metatype
            : instanceWrapper.metatype);
    }
}
exports.DiscoverableMetaHostCollection = DiscoverableMetaHostCollection;
/**
 * A map of class references to metadata keys.
 */
DiscoverableMetaHostCollection.metaHostLinks = new Map();
/**
 * A map of metadata keys to instance wrappers (providers) with the corresponding metadata key.
 * The map is weakly referenced by the modules container (unique per application).
 */
DiscoverableMetaHostCollection.providersByMetaKey = new WeakMap();
/**
 * A map of metadata keys to instance wrappers (controllers) with the corresponding metadata key.
 * The map is weakly referenced by the modules container (unique per application).
 */
DiscoverableMetaHostCollection.controllersByMetaKey = new WeakMap();
