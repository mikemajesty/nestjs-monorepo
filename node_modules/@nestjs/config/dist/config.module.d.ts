import { DynamicModule } from '@nestjs/common';
import { ConfigFactory, ConfigModuleOptions } from './interfaces';
export declare class ConfigModule {
    /**
     * This promise resolves when "dotenv" completes loading environment variables.
     * When "ignoreEnvFile" is set to true, then it will resolve immediately after the
     * "ConfigModule#forRoot" method is called.
     */
    static get envVariablesLoaded(): Promise<void>;
    private static environmentVariablesLoadedSignal;
    private static readonly _envVariablesLoaded;
    /**
     * Loads process environment variables depending on the "ignoreEnvFile" flag and "envFilePath" value.
     * Also, registers custom configurations globally.
     * @param options
     */
    static forRoot(options?: ConfigModuleOptions): DynamicModule;
    /**
     * Registers configuration object (partial registration).
     * @param config
     */
    static forFeature(config: ConfigFactory): DynamicModule;
    private static loadEnvFile;
    private static assignVariablesToProcess;
    private static mergePartial;
    private static getSchemaValidationOptions;
}
