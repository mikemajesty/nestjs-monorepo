import { Type } from '@nestjs/common';
import { InstanceWrapper } from '../injector/instance-wrapper';
import { ModulesContainer } from '../injector/modules-container';
export declare class DiscoverableMetaHostCollection {
    /**
     * A map of class references to metadata keys.
     */
    static readonly metaHostLinks: Map<Function | Type<any>, string>;
    /**
     * A map of metadata keys to instance wrappers (providers) with the corresponding metadata key.
     * The map is weakly referenced by the modules container (unique per application).
     */
    private static readonly providersByMetaKey;
    /**
     * A map of metadata keys to instance wrappers (controllers) with the corresponding metadata key.
     * The map is weakly referenced by the modules container (unique per application).
     */
    private static readonly controllersByMetaKey;
    /**
     * Adds a link between a class reference and a metadata key.
     * @param target The class reference.
     * @param metadataKey The metadata key.
     */
    static addClassMetaHostLink(target: Type | Function, metadataKey: string): void;
    /**
     * Inspects a provider instance wrapper and adds it to the collection of providers
     * if it has a metadata key.
     * @param hostContainerRef A reference to the modules container.
     * @param instanceWrapper A provider instance wrapper.
     * @returns void
     */
    static inspectProvider(hostContainerRef: ModulesContainer, instanceWrapper: InstanceWrapper): void;
    /**
     * Inspects a controller instance wrapper and adds it to the collection of controllers
     * if it has a metadata key.
     * @param hostContainerRef A reference to the modules container.
     * @param instanceWrapper A controller's instance wrapper.
     * @returns void
     */
    static inspectController(hostContainerRef: ModulesContainer, instanceWrapper: InstanceWrapper): void;
    static insertByMetaKey(metaKey: string, instanceWrapper: InstanceWrapper, collection: Map<string, Set<InstanceWrapper>>): void;
    static getProvidersByMetaKey(hostContainerRef: ModulesContainer, metaKey: string): Set<InstanceWrapper>;
    static getControllersByMetaKey(hostContainerRef: ModulesContainer, metaKey: string): Set<InstanceWrapper>;
    private static inspectInstanceWrapper;
    private static getMetaKeyByInstanceWrapper;
}
