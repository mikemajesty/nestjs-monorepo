import { DynamicModule, ForwardReference, Provider } from '@nestjs/common';
import { EnhancerSubtype } from '@nestjs/common/constants';
import { ClassProvider, Controller, ExistingProvider, FactoryProvider, Injectable, Type, ValueProvider } from '@nestjs/common/interfaces';
import { ApplicationConfig } from './application-config';
import { NestContainer } from './injector/container';
import { InstanceWrapper } from './injector/instance-wrapper';
import { Module } from './injector/module';
import { GraphInspector } from './inspector/graph-inspector';
import { ModuleDefinition } from './interfaces/module-definition.interface';
import { ModuleOverride } from './interfaces/module-override.interface';
import { MetadataScanner } from './metadata-scanner';
interface ModulesScanParameters {
    moduleDefinition: ModuleDefinition;
    scope?: Type<unknown>[];
    ctxRegistry?: (ForwardReference | DynamicModule | Type<unknown>)[];
    overrides?: ModuleOverride[];
    lazy?: boolean;
}
export declare class DependenciesScanner {
    private readonly container;
    private readonly metadataScanner;
    private readonly graphInspector;
    private readonly applicationConfig;
    private readonly applicationProvidersApplyMap;
    constructor(container: NestContainer, metadataScanner: MetadataScanner, graphInspector: GraphInspector, applicationConfig?: ApplicationConfig);
    scan(module: Type<any>, options?: {
        overrides?: ModuleOverride[];
    }): Promise<void>;
    scanForModules({ moduleDefinition, lazy, scope, ctxRegistry, overrides, }: ModulesScanParameters): Promise<Module[]>;
    insertModule(moduleDefinition: any, scope: Type<unknown>[]): Promise<{
        moduleRef: Module;
        inserted: boolean;
    } | undefined>;
    scanModulesForDependencies(modules?: Map<string, Module>): Promise<void>;
    reflectImports(module: Type<unknown>, token: string, context: string): Promise<void>;
    reflectProviders(module: Type<any>, token: string): void;
    reflectControllers(module: Type<any>, token: string): void;
    reflectDynamicMetadata(cls: Type<Injectable>, token: string): void;
    reflectExports(module: Type<unknown>, token: string): void;
    reflectInjectables(component: Type<Injectable>, token: string, metadataKey: string): void;
    reflectParamInjectables(component: Type<Injectable>, token: string, metadataKey: string): void;
    reflectKeyMetadata(component: Type<Injectable>, key: string, methodKey: string): {
        methodKey: string;
        metadata: any;
    } | undefined;
    calculateModulesDistance(): void;
    insertImport(related: any, token: string, context: string): Promise<void>;
    isCustomProvider(provider: Provider): provider is ClassProvider | ValueProvider | FactoryProvider | ExistingProvider;
    insertProvider(provider: Provider, token: string): string | symbol | Function | InstanceWrapper<unknown>;
    insertInjectable(injectable: Type<Injectable> | object, token: string, host: Type<Injectable>, subtype: EnhancerSubtype, methodKey?: string): InstanceWrapper<any>;
    insertExportedProvider(exportedProvider: Type<Injectable>, token: string): void;
    insertController(controller: Type<Controller>, token: string): void;
    private insertOrOverrideModule;
    private getOverrideModuleByModule;
    private overrideModule;
    reflectMetadata<T = any>(metadataKey: string, metatype: Type<any>): T[];
    registerCoreModule(overrides?: ModuleOverride[]): Promise<void>;
    /**
     * Add either request or transient globally scoped enhancers
     * to all controllers metadata storage
     */
    addScopedEnhancersMetadata(): void;
    applyApplicationProviders(): void;
    getApplyProvidersMap(): {
        [type: string]: Function;
    };
    getApplyRequestProvidersMap(): {
        [type: string]: Function;
    };
    isDynamicModule(module: Type<any> | DynamicModule): module is DynamicModule;
    /**
     * @param metatype
     * @returns `true` if `metatype` is annotated with the `@Injectable()` decorator.
     */
    private isInjectable;
    /**
     * @param metatype
     * @returns `true` if `metatype` is annotated with the `@Controller()` decorator.
     */
    private isController;
    /**
     * @param metatype
     * @returns `true` if `metatype` is annotated with the `@Catch()` decorator.
     */
    private isExceptionFilter;
    private isForwardReference;
    private isRequestOrTransient;
}
export {};
