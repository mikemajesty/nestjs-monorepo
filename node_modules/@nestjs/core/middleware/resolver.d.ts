import { Injector } from '../injector/injector';
import { Module } from '../injector/module';
import { MiddlewareContainer } from './container';
export declare class MiddlewareResolver {
    private readonly middlewareContainer;
    private readonly injector;
    constructor(middlewareContainer: MiddlewareContainer, injector: Injector);
    resolveInstances(moduleRef: Module, moduleName: string): Promise<void>;
    private resolveMiddlewareInstance;
}
