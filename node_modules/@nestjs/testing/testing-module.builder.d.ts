import { LoggerService, ModuleMetadata } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { ModuleDefinition } from '@nestjs/core/interfaces/module-definition.interface';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { MockFactory, OverrideBy } from './interfaces';
import { OverrideModule } from './interfaces/override-module.interface';
import { TestingModule } from './testing-module';
/**
 * @publicApi
 */
export declare class TestingModuleBuilder {
    private readonly metadataScanner;
    private readonly applicationConfig;
    private readonly container;
    private readonly overloadsMap;
    private readonly moduleOverloadsMap;
    private readonly module;
    private testingLogger;
    private mocker?;
    constructor(metadataScanner: MetadataScanner, metadata: ModuleMetadata);
    setLogger(testingLogger: LoggerService): this;
    overridePipe<T = any>(typeOrToken: T): OverrideBy;
    useMocker(mocker: MockFactory): TestingModuleBuilder;
    overrideFilter<T = any>(typeOrToken: T): OverrideBy;
    overrideGuard<T = any>(typeOrToken: T): OverrideBy;
    overrideInterceptor<T = any>(typeOrToken: T): OverrideBy;
    overrideProvider<T = any>(typeOrToken: T): OverrideBy;
    overrideModule(moduleToOverride: ModuleDefinition): OverrideModule;
    compile(options?: Pick<NestApplicationContextOptions, 'snapshot' | 'preview'>): Promise<TestingModule>;
    private override;
    private createOverrideByBuilder;
    private applyOverloadsMap;
    private getModuleOverloads;
    private getRootModule;
    private createInstancesOfDependencies;
    private createModule;
    private applyLogger;
}
