import { DynamicModule } from '../interfaces';
import { Logger } from '../services/logger.service';
import { DEFAULT_FACTORY_CLASS_METHOD_KEY, DEFAULT_METHOD_KEY } from './constants';
import { ConfigurableModuleHost } from './interfaces';
/**
 * @publicApi
 */
export interface ConfigurableModuleBuilderOptions {
    /**
     * Specified what injection token should be used for the module options provider.
     * By default, an auto-generated UUID will be used.
     */
    optionsInjectionToken?: string | symbol;
    /**
     * By default, an UUID will be used as a module options provider token.
     * Explicitly specifying the "moduleName" will instruct the "ConfigurableModuleBuilder"
     * to use a more descriptive provider token.
     *
     * For example, if `moduleName: "Cache"` then auto-generated provider token will be "CACHE_MODULE_OPTIONS".
     */
    moduleName?: string;
    /**
     * Indicates whether module should always be "transient", meaning,
     * every time you call the static method to construct a dynamic module,
     * regardless of what arguments you pass in, a new "unique" module will be created.
     *
     * @default false
     */
    alwaysTransient?: boolean;
}
/**
 * Factory that lets you create configurable modules and
 * provides a way to reduce the majority of dynamic module boilerplate.
 *
 * @publicApi
 */
export declare class ConfigurableModuleBuilder<ModuleOptions, StaticMethodKey extends string = typeof DEFAULT_METHOD_KEY, FactoryClassMethodKey extends string = typeof DEFAULT_FACTORY_CLASS_METHOD_KEY, ExtraModuleDefinitionOptions = {}> {
    protected readonly options: ConfigurableModuleBuilderOptions;
    protected staticMethodKey: StaticMethodKey;
    protected factoryClassMethodKey: FactoryClassMethodKey;
    protected extras: ExtraModuleDefinitionOptions;
    protected transformModuleDefinition: (definition: DynamicModule, extraOptions: ExtraModuleDefinitionOptions) => DynamicModule;
    protected readonly logger: Logger;
    constructor(options?: ConfigurableModuleBuilderOptions, parentBuilder?: ConfigurableModuleBuilder<ModuleOptions>);
    /**
     * Registers the "extras" object (a set of extra options that can be used to modify the dynamic module definition).
     * Values you specify within the "extras" object will be used as default values (that can be overridden by module consumers).
     *
     * This method also applies the so-called "module definition transform function" that takes the auto-generated
     * dynamic module object ("DynamicModule") and the actual consumer "extras" object as input parameters.
     * The "extras" object consists of values explicitly specified by module consumers and default values.
     *
     * @example
     * ```typescript
     * .setExtras<{ isGlobal?: boolean }>({ isGlobal: false }, (definition, extras) =>
     *    ({ ...definition, global: extras.isGlobal })
     * )
     * ```
     */
    setExtras<ExtraModuleDefinitionOptions>(extras: ExtraModuleDefinitionOptions, transformDefinition?: (definition: DynamicModule, extras: ExtraModuleDefinitionOptions) => DynamicModule): ConfigurableModuleBuilder<ModuleOptions, StaticMethodKey, FactoryClassMethodKey, ExtraModuleDefinitionOptions>;
    /**
     * Dynamic modules must expose public static methods that let you pass in
     * configuration parameters (control the module's behavior from the outside).
     * Some frequently used names that you may have seen in other modules are:
     * "forRoot", "forFeature", "register", "configure".
     *
     * This method "setClassMethodName" lets you specify the name of the
     * method that will be auto-generated.
     *
     * @param key name of the method
     */
    setClassMethodName<StaticMethodKey extends string>(key: StaticMethodKey): ConfigurableModuleBuilder<ModuleOptions, StaticMethodKey, FactoryClassMethodKey, ExtraModuleDefinitionOptions>;
    /**
     * Asynchronously configured modules (that rely on other modules, i.e. "ConfigModule")
     * let you pass the configuration factory class that will be registered and instantiated as a provider.
     * This provider then will be used to retrieve the module's configuration. To provide the configuration,
     * the corresponding factory method must be implemented.
     *
     * This method ("setFactoryMethodName") lets you control what method name will have to be
     * implemented by the config factory (default is "create").
     *
     * @param key name of the method
     */
    setFactoryMethodName<FactoryClassMethodKey extends string>(key: FactoryClassMethodKey): ConfigurableModuleBuilder<ModuleOptions, StaticMethodKey, FactoryClassMethodKey, ExtraModuleDefinitionOptions>;
    /**
     * Returns an object consisting of multiple properties that lets you
     * easily construct dynamic configurable modules. See "ConfigurableModuleHost" interface for more details.
     */
    build(): ConfigurableModuleHost<ModuleOptions, StaticMethodKey, FactoryClassMethodKey, ExtraModuleDefinitionOptions>;
    private constructInjectionTokenString;
    private createConfigurableModuleCls;
    private createTypeProxy;
}
