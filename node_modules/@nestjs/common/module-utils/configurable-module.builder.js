"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurableModuleBuilder = void 0;
const logger_service_1 = require("../services/logger.service");
const random_string_generator_util_1 = require("../utils/random-string-generator.util");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
/**
 * Factory that lets you create configurable modules and
 * provides a way to reduce the majority of dynamic module boilerplate.
 *
 * @publicApi
 */
class ConfigurableModuleBuilder {
    constructor(options = {}, parentBuilder) {
        this.options = options;
        this.logger = new logger_service_1.Logger(ConfigurableModuleBuilder.name);
        if (parentBuilder) {
            this.staticMethodKey = parentBuilder.staticMethodKey;
            this.factoryClassMethodKey =
                parentBuilder.factoryClassMethodKey;
            this.transformModuleDefinition = parentBuilder.transformModuleDefinition;
            this.extras = parentBuilder.extras;
        }
    }
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
    setExtras(extras, transformDefinition = def => def) {
        const builder = new ConfigurableModuleBuilder(this.options, this);
        builder.extras = extras;
        builder.transformModuleDefinition = transformDefinition;
        return builder;
    }
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
    setClassMethodName(key) {
        const builder = new ConfigurableModuleBuilder(this.options, this);
        builder.staticMethodKey = key;
        return builder;
    }
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
    setFactoryMethodName(key) {
        const builder = new ConfigurableModuleBuilder(this.options, this);
        builder.factoryClassMethodKey = key;
        return builder;
    }
    /**
     * Returns an object consisting of multiple properties that lets you
     * easily construct dynamic configurable modules. See "ConfigurableModuleHost" interface for more details.
     */
    build() {
        this.staticMethodKey ??= constants_1.DEFAULT_METHOD_KEY;
        this.factoryClassMethodKey ??=
            constants_1.DEFAULT_FACTORY_CLASS_METHOD_KEY;
        this.options.optionsInjectionToken ??= this.options.moduleName
            ? this.constructInjectionTokenString()
            : (0, utils_1.generateOptionsInjectionToken)();
        this.transformModuleDefinition ??= definition => definition;
        return {
            ConfigurableModuleClass: this.createConfigurableModuleCls(),
            MODULE_OPTIONS_TOKEN: this.options.optionsInjectionToken,
            ASYNC_OPTIONS_TYPE: this.createTypeProxy('ASYNC_OPTIONS_TYPE'),
            OPTIONS_TYPE: this.createTypeProxy('OPTIONS_TYPE'),
        };
    }
    constructInjectionTokenString() {
        const moduleNameInSnakeCase = this.options.moduleName
            .trim()
            .split(/(?=[A-Z])/)
            .join('_')
            .toUpperCase();
        return `${moduleNameInSnakeCase}_MODULE_OPTIONS`;
    }
    createConfigurableModuleCls() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const asyncMethodKey = this.staticMethodKey + constants_1.ASYNC_METHOD_SUFFIX;
        class InternalModuleClass {
            static [self.staticMethodKey](options) {
                const providers = [
                    {
                        provide: self.options.optionsInjectionToken,
                        useFactory: () => this.omitExtras(options, self.extras),
                    },
                ];
                if (self.options.alwaysTransient) {
                    providers.push({
                        provide: constants_1.CONFIGURABLE_MODULE_ID,
                        useValue: (0, random_string_generator_util_1.randomStringGenerator)(),
                    });
                }
                return self.transformModuleDefinition({
                    module: this,
                    providers,
                }, {
                    ...self.extras,
                    ...options,
                });
            }
            static [asyncMethodKey](options) {
                const providers = this.createAsyncProviders(options);
                if (self.options.alwaysTransient) {
                    providers.push({
                        provide: constants_1.CONFIGURABLE_MODULE_ID,
                        useValue: (0, random_string_generator_util_1.randomStringGenerator)(),
                    });
                }
                return self.transformModuleDefinition({
                    module: this,
                    imports: options.imports || [],
                    providers,
                }, {
                    ...self.extras,
                    ...options,
                });
            }
            static omitExtras(input, extras) {
                if (!extras) {
                    return input;
                }
                const moduleOptions = {};
                const extrasKeys = Object.keys(extras);
                Object.keys(input)
                    .filter(key => !extrasKeys.includes(key))
                    .forEach(key => {
                    moduleOptions[key] = input[key];
                });
                return moduleOptions;
            }
            static createAsyncProviders(options) {
                if (options.useExisting || options.useFactory) {
                    if (options.inject && options.provideInjectionTokensFrom) {
                        return [
                            this.createAsyncOptionsProvider(options),
                            ...(0, utils_1.getInjectionProviders)(options.provideInjectionTokensFrom, options.inject),
                        ];
                    }
                    return [this.createAsyncOptionsProvider(options)];
                }
                return [
                    this.createAsyncOptionsProvider(options),
                    {
                        provide: options.useClass,
                        useClass: options.useClass,
                    },
                ];
            }
            static createAsyncOptionsProvider(options) {
                if (options.useFactory) {
                    return {
                        provide: self.options.optionsInjectionToken,
                        useFactory: options.useFactory,
                        inject: options.inject || [],
                    };
                }
                return {
                    provide: self.options.optionsInjectionToken,
                    useFactory: async (optionsFactory) => await optionsFactory[self.factoryClassMethodKey](),
                    inject: [options.useExisting || options.useClass],
                };
            }
        }
        return InternalModuleClass;
    }
    createTypeProxy(typeName) {
        const proxy = new Proxy({}, {
            get: () => {
                throw new Error(`"${typeName}" is not supposed to be used as a value.`);
            },
        });
        return proxy;
    }
}
exports.ConfigurableModuleBuilder = ConfigurableModuleBuilder;
