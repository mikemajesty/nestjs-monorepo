import { EnhancerSubtype } from '@nestjs/common/constants';
import { ClassProvider, Controller, DynamicModule, ExistingProvider, FactoryProvider, Injectable, InjectionToken, NestModule, Provider, Type, ValueProvider } from '@nestjs/common/interfaces';
import { NestContainer } from './container';
import { InstanceWrapper } from './instance-wrapper';
import { ModuleRef } from './module-ref';
export declare class Module {
    private readonly _metatype;
    private readonly container;
    private readonly _id;
    private readonly _imports;
    private readonly _providers;
    private readonly _injectables;
    private readonly _middlewares;
    private readonly _controllers;
    private readonly _entryProviderKeys;
    private readonly _exports;
    private _distance;
    private _initOnPreview;
    private _isGlobal;
    private _token;
    constructor(_metatype: Type<any>, container: NestContainer);
    get id(): string;
    get token(): string;
    set token(token: string);
    get name(): string;
    get isGlobal(): boolean;
    set isGlobal(global: boolean);
    get initOnPreview(): boolean;
    set initOnPreview(initOnPreview: boolean);
    get providers(): Map<InjectionToken, InstanceWrapper<Injectable>>;
    get middlewares(): Map<InjectionToken, InstanceWrapper<Injectable>>;
    get imports(): Set<Module>;
    get injectables(): Map<InjectionToken, InstanceWrapper<Injectable>>;
    get controllers(): Map<InjectionToken, InstanceWrapper<Controller>>;
    get entryProviders(): Array<InstanceWrapper<Injectable>>;
    get exports(): Set<InjectionToken>;
    get instance(): NestModule;
    get metatype(): Type<any>;
    get distance(): number;
    set distance(value: number);
    addCoreProviders(): void;
    addModuleRef(): void;
    addModuleAsProvider(): void;
    addApplicationConfig(): void;
    addInjectable<T extends Injectable>(injectable: Provider, enhancerSubtype: EnhancerSubtype, host?: Type<T>): string | symbol | Function | InstanceWrapper<unknown>;
    addProvider(provider: Provider): InjectionToken;
    addProvider(provider: Provider, enhancerSubtype: EnhancerSubtype): InjectionToken;
    isCustomProvider(provider: Provider): provider is ClassProvider | FactoryProvider | ValueProvider | ExistingProvider;
    addCustomProvider(provider: ClassProvider | FactoryProvider | ValueProvider | ExistingProvider, collection: Map<Function | string | symbol, any>, enhancerSubtype?: EnhancerSubtype): InjectionToken;
    isCustomClass(provider: any): provider is ClassProvider;
    isCustomValue(provider: any): provider is ValueProvider;
    isCustomFactory(provider: any): provider is FactoryProvider;
    isCustomUseExisting(provider: any): provider is ExistingProvider;
    isDynamicModule(exported: any): exported is DynamicModule;
    addCustomClass(provider: ClassProvider, collection: Map<InjectionToken, InstanceWrapper>, enhancerSubtype?: EnhancerSubtype): void;
    addCustomValue(provider: ValueProvider, collection: Map<Function | string | symbol, InstanceWrapper>, enhancerSubtype?: EnhancerSubtype): void;
    addCustomFactory(provider: FactoryProvider, collection: Map<Function | string | symbol, InstanceWrapper>, enhancerSubtype?: EnhancerSubtype): void;
    addCustomUseExisting(provider: ExistingProvider, collection: Map<Function | string | symbol, InstanceWrapper>, enhancerSubtype?: EnhancerSubtype): void;
    addExportedProvider(provider: Provider | string | symbol | DynamicModule): Set<InjectionToken>;
    addCustomExportedProvider(provider: FactoryProvider | ValueProvider | ClassProvider | ExistingProvider): Set<InjectionToken>;
    validateExportedProvider(token: InjectionToken): InjectionToken;
    addController(controller: Type<Controller>): void;
    assignControllerUniqueId(controller: Type<Controller>): void;
    addImport(moduleRef: Module): void;
    /**
     * @deprecated
     */
    addRelatedModule(module: Module): void;
    replace(toReplace: InjectionToken, options: any): void;
    hasProvider(token: InjectionToken): boolean;
    hasInjectable(token: InjectionToken): boolean;
    getProviderByKey<T = any>(name: InjectionToken): InstanceWrapper<T>;
    getProviderById<T = any>(id: string): InstanceWrapper<T> | undefined;
    getControllerById<T = any>(id: string): InstanceWrapper<T> | undefined;
    getInjectableById<T = any>(id: string): InstanceWrapper<T> | undefined;
    getMiddlewareById<T = any>(id: string): InstanceWrapper<T> | undefined;
    getNonAliasProviders(): Array<[
        InjectionToken,
        InstanceWrapper<Injectable>
    ]>;
    createModuleReferenceType(): Type<ModuleRef>;
    private isEntryProvider;
    private generateUuid;
}
