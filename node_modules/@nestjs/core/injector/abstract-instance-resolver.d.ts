import { Abstract, Type } from '@nestjs/common';
import { GetOrResolveOptions } from '@nestjs/common/interfaces';
import { Injector } from './injector';
import { InstanceLinksHost } from './instance-links-host';
import { ContextId } from './instance-wrapper';
import { Module } from './module';
export declare abstract class AbstractInstanceResolver {
    protected abstract instanceLinksHost: InstanceLinksHost;
    protected abstract injector: Injector;
    protected abstract get<TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Function | string | symbol, options?: GetOrResolveOptions): TResult | Array<TResult>;
    protected find<TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Abstract<TInput> | string | symbol, options: {
        moduleId?: string;
        each?: boolean;
    }): TResult | Array<TResult>;
    protected resolvePerContext<TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Abstract<TInput> | string | symbol, contextModule: Module, contextId: ContextId, options?: GetOrResolveOptions): Promise<TResult | Array<TResult>>;
}
