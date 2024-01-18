import { DynamicModule, Type } from '@nestjs/common';
import { ModuleOverride } from '../../interfaces/module-override.interface';
import { DependenciesScanner } from '../../scanner';
import { ModuleCompiler } from '../compiler';
import { InstanceLoader } from '../instance-loader';
import { ModuleRef } from '../module-ref';
import { ModulesContainer } from '../modules-container';
import { LazyModuleLoaderLoadOptions } from './lazy-module-loader-options.interface';
export declare class LazyModuleLoader {
    private readonly dependenciesScanner;
    private readonly instanceLoader;
    private readonly moduleCompiler;
    private readonly modulesContainer;
    private readonly moduleOverrides?;
    constructor(dependenciesScanner: DependenciesScanner, instanceLoader: InstanceLoader, moduleCompiler: ModuleCompiler, modulesContainer: ModulesContainer, moduleOverrides?: ModuleOverride[]);
    load(loaderFn: () => Promise<Type<unknown> | DynamicModule> | Type<unknown> | DynamicModule, loadOpts?: LazyModuleLoaderLoadOptions): Promise<ModuleRef>;
    private registerLoggerConfiguration;
    private createLazyModulesContainer;
    private getTargetModuleRef;
}
