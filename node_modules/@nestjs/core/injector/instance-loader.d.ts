import { Logger, LoggerService } from '@nestjs/common';
import { GraphInspector } from '../inspector/graph-inspector';
import { NestContainer } from './container';
import { Injector } from './injector';
import { Module } from './module';
export declare class InstanceLoader<TInjector extends Injector = Injector> {
    protected readonly container: NestContainer;
    protected readonly injector: TInjector;
    protected readonly graphInspector: GraphInspector;
    private logger;
    constructor(container: NestContainer, injector: TInjector, graphInspector: GraphInspector, logger?: LoggerService);
    setLogger(logger: Logger): void;
    createInstancesOfDependencies(modules?: Map<string, Module>): Promise<void>;
    private createPrototypes;
    private createInstances;
    private createPrototypesOfProviders;
    private createInstancesOfProviders;
    private createPrototypesOfControllers;
    private createInstancesOfControllers;
    private createPrototypesOfInjectables;
    private createInstancesOfInjectables;
    private isModuleWhitelisted;
}
