import { InjectorDependencyContext } from '../../injector/injector';
import { Module } from '../../injector/module';
import { RuntimeException } from './runtime.exception';
export declare class UnknownDependenciesException extends RuntimeException {
    readonly type: string | symbol;
    readonly context: InjectorDependencyContext;
    readonly metadata?: {
        id: string;
    };
    readonly moduleRef: {
        id: string;
    } | undefined;
    constructor(type: string | symbol, context: InjectorDependencyContext, moduleRef?: Module, metadata?: {
        id: string;
    });
}
