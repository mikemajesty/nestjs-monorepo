import { ConfigModule } from '..';
import { ConfigFactory } from '../interfaces';
import { ConfigObject } from '../types';
export interface ConfigFactoryKeyHost<T = unknown> {
    KEY: string;
    asProvider(): {
        imports: [ReturnType<typeof ConfigModule.forFeature>];
        useFactory: (config: T) => T;
        inject: [string];
    };
}
/**
 * Registers the configuration object behind a specified token.
 */
export declare function registerAs<TConfig extends ConfigObject, TFactory extends ConfigFactory = ConfigFactory<TConfig>>(token: string, configFactory: TFactory): TFactory & ConfigFactoryKeyHost<ReturnType<TFactory>>;
