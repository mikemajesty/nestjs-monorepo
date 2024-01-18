import { CustomDecorator } from '@nestjs/common';
import { InstanceWrapper } from '../injector/instance-wrapper';
import { Module } from '../injector/module';
import { ModulesContainer } from '../injector/modules-container';
/**
 * @publicApi
 */
export interface FilterByInclude {
    /**
     * List of modules to include (whitelist) into the discovery process.
     */
    include?: Function[];
}
/**
 * @publicApi
 */
export interface FilterByMetadataKey {
    /**
     * A key to filter controllers and providers by.
     * Only instance wrappers with the specified metadata key will be returned.
     */
    metadataKey?: string;
}
/**
 * @publicApi
 */
export type DiscoveryOptions = FilterByInclude | FilterByMetadataKey;
/**
 * @publicApi
 */
export type DiscoverableDecorator<T> = ((opts?: T) => CustomDecorator) & {
    KEY: string;
};
/**
 * @publicApi
 */
export declare class DiscoveryService {
    private readonly modulesContainer;
    constructor(modulesContainer: ModulesContainer);
    /**
     * Creates a decorator that can be used to decorate classes and methods with metadata.
     * The decorator will also add the class to the collection of discoverable classes (by metadata key).
     * Decorated classes can be discovered using the `getProviders` and `getControllers` methods.
     * @returns A decorator function.
     */
    static createDecorator<T>(): DiscoverableDecorator<T>;
    /**
     * Returns an array of instance wrappers (providers).
     * Depending on the options, the array will contain either all providers or only providers with the specified metadata key.
     * @param options Discovery options.
     * @param modules A list of modules to filter by.
     * @returns An array of instance wrappers (providers).
     */
    getProviders(options?: DiscoveryOptions, modules?: Module[]): InstanceWrapper[];
    /**
     * Returns an array of instance wrappers (controllers).
     * Depending on the options, the array will contain either all controllers or only controllers with the specified metadata key.
     * @param options Discovery options.
     * @param modules A list of modules to filter by.
     * @returns An array of instance wrappers (controllers).
     */
    getControllers(options?: DiscoveryOptions, modules?: Module[]): InstanceWrapper[];
    /**
     * Retrieves metadata from the specified instance wrapper.
     * @param decorator The decorator to retrieve metadata of.
     * @param instanceWrapper Reference to the instance wrapper.
     * @param methodKey An optional method key to retrieve metadata from.
     * @returns Discovered metadata.
     */
    getMetadataByDecorator<T extends DiscoverableDecorator<any>>(decorator: T, instanceWrapper: InstanceWrapper, methodKey?: string): T extends DiscoverableDecorator<infer R> ? R | undefined : T | undefined;
    /**
     * Returns a list of modules to be used for discovery.
     */
    protected getModules(options?: DiscoveryOptions): Module[];
    private includeWhitelisted;
}
