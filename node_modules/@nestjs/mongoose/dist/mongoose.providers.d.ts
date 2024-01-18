import { Provider } from '@nestjs/common';
import { AsyncModelFactory, ModelDefinition } from './interfaces';
export declare function createMongooseProviders(connectionName?: string, options?: ModelDefinition[]): Provider[];
export declare function createMongooseAsyncProviders(connectionName?: string, modelFactories?: AsyncModelFactory[]): Provider[];
