import { FactoryProvider } from '@nestjs/common/interfaces';
import { ConfigFactory } from '../interfaces';
import { ConfigFactoryKeyHost } from './register-as.util';
export declare function createConfigProvider(factory: ConfigFactory & ConfigFactoryKeyHost): FactoryProvider;
