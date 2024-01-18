import { Provider, Scope, Type } from '@nestjs/common';
import { EnhancerSubtype } from '@nestjs/common/constants';
import { FactoryProvider, InjectionToken } from '@nestjs/common/interfaces';
import { Module } from './module';
import { SettlementSignal } from './settlement-signal';
export declare const INSTANCE_METADATA_SYMBOL: unique symbol;
export declare const INSTANCE_ID_SYMBOL: unique symbol;
export interface HostComponentInfo {
    /**
     * Injection token (or class reference)
     */
    token: InjectionToken;
    /**
     * Flag that indicates whether DI subtree is durable
     */
    isTreeDurable: boolean;
}
export interface ContextId {
    readonly id: number;
    payload?: unknown;
    getParent?(info: HostComponentInfo): ContextId;
}
export interface InstancePerContext<T> {
    instance: T;
    isResolved?: boolean;
    isPending?: boolean;
    donePromise?: Promise<unknown>;
}
export interface PropertyMetadata {
    key: symbol | string;
    wrapper: InstanceWrapper;
}
export declare class InstanceWrapper<T = any> {
    readonly name: any;
    readonly token: InjectionToken;
    readonly async?: boolean;
    readonly host?: Module;
    readonly isAlias: boolean;
    readonly subtype?: EnhancerSubtype;
    scope?: Scope;
    metatype: Type<T> | Function;
    inject?: FactoryProvider['inject'];
    forwardRef?: boolean;
    durable?: boolean;
    initTime?: number;
    settlementSignal?: SettlementSignal;
    private static logger;
    private readonly values;
    private readonly [INSTANCE_METADATA_SYMBOL];
    private readonly [INSTANCE_ID_SYMBOL];
    private transientMap?;
    private isTreeStatic;
    private isTreeDurable;
    constructor(metadata?: Partial<InstanceWrapper<T>> & Partial<InstancePerContext<T>>);
    get id(): string;
    set instance(value: T);
    get instance(): T;
    get isNotMetatype(): boolean;
    get isFactory(): boolean;
    get isTransient(): boolean;
    getInstanceByContextId(contextId: ContextId, inquirerId?: string): InstancePerContext<T>;
    getInstanceByInquirerId(contextId: ContextId, inquirerId: string): InstancePerContext<T>;
    setInstanceByContextId(contextId: ContextId, value: InstancePerContext<T>, inquirerId?: string): void;
    setInstanceByInquirerId(contextId: ContextId, inquirerId: string, value: InstancePerContext<T>): void;
    addCtorMetadata(index: number, wrapper: InstanceWrapper): void;
    getCtorMetadata(): InstanceWrapper[];
    addPropertiesMetadata(key: symbol | string, wrapper: InstanceWrapper): void;
    getPropertiesMetadata(): PropertyMetadata[];
    addEnhancerMetadata(wrapper: InstanceWrapper): void;
    getEnhancersMetadata(): InstanceWrapper[];
    isDependencyTreeDurable(lookupRegistry?: string[]): boolean;
    introspectDepsAttribute(callback: (collection: InstanceWrapper[], lookupRegistry: string[]) => boolean, lookupRegistry?: string[]): boolean;
    isDependencyTreeStatic(lookupRegistry?: string[]): boolean;
    cloneStaticInstance(contextId: ContextId): InstancePerContext<T>;
    cloneTransientInstance(contextId: ContextId, inquirerId: string): InstancePerContext<T>;
    createPrototype(contextId: ContextId): any;
    isInRequestScope(contextId: ContextId, inquirer?: InstanceWrapper | undefined): boolean;
    isLazyTransient(contextId: ContextId, inquirer: InstanceWrapper | undefined): boolean;
    isExplicitlyRequested(contextId: ContextId, inquirer?: InstanceWrapper): boolean;
    isStatic(contextId: ContextId, inquirer: InstanceWrapper | undefined): boolean;
    getStaticTransientInstances(): InstancePerContext<T>[];
    mergeWith(provider: Provider): void;
    private isNewable;
    private initialize;
    private printIntrospectedAsRequestScoped;
    private printIntrospectedAsDurable;
    private isDebugMode;
    private generateUuid;
}
