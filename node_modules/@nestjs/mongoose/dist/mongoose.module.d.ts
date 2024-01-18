import { DynamicModule } from '@nestjs/common';
import { AsyncModelFactory, ModelDefinition } from './interfaces';
import { MongooseModuleAsyncOptions, MongooseModuleOptions } from './interfaces/mongoose-options.interface';
export declare class MongooseModule {
    static forRoot(uri: string, options?: MongooseModuleOptions): DynamicModule;
    static forRootAsync(options: MongooseModuleAsyncOptions): DynamicModule;
    static forFeature(models?: ModelDefinition[], connectionName?: string): DynamicModule;
    static forFeatureAsync(factories?: AsyncModelFactory[], connectionName?: string): DynamicModule;
}
