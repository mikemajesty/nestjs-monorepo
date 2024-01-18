import { InstanceLoader } from '@nestjs/core/injector/instance-loader';
import { Module } from '@nestjs/core/injector/module';
import { MockFactory } from './interfaces';
import { TestingInjector } from './testing-injector';
export declare class TestingInstanceLoader extends InstanceLoader<TestingInjector> {
    createInstancesOfDependencies(modules?: Map<string, Module>, mocker?: MockFactory): Promise<void>;
}
