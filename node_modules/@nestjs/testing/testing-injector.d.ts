import { NestContainer } from '@nestjs/core';
import { Injector, InjectorDependencyContext } from '@nestjs/core/injector/injector';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { MockFactory } from './interfaces';
/**
 * @publicApi
 */
export declare class TestingInjector extends Injector {
    protected mocker?: MockFactory;
    protected container: NestContainer;
    setMocker(mocker: MockFactory): void;
    setContainer(container: NestContainer): void;
    resolveComponentInstance<T>(moduleRef: Module, name: any, dependencyContext: InjectorDependencyContext, wrapper: InstanceWrapper<T>, contextId?: import("@nestjs/core").ContextId, inquirer?: InstanceWrapper, keyOrIndex?: string | number): Promise<InstanceWrapper>;
}
