"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestConfigurationLoader = void 0;
const defaults_1 = require("./defaults");
/**
 * A cache table that maps some reader (by its name along with the config path)
 * to a loaded configuration.
 * This was added because several commands relies on the app's config in order
 * to generate some dynanmic content prior running the command itself.
 */
const loadedConfigsCache = new Map();
class NestConfigurationLoader {
    constructor(reader) {
        this.reader = reader;
    }
    async load(name) {
        const cacheEntryKey = `${this.reader.constructor.name}:${name}`;
        const cachedConfig = loadedConfigsCache.get(cacheEntryKey);
        if (cachedConfig) {
            return cachedConfig;
        }
        let loadedConfig;
        const content = name
            ? await this.reader.read(name)
            : await this.reader.readAnyOf([
                'nest-cli.json',
                '.nestcli.json',
                '.nest-cli.json',
                'nest.json',
            ]);
        if (content) {
            const fileConfig = JSON.parse(content);
            if (fileConfig.compilerOptions) {
                loadedConfig = {
                    ...defaults_1.defaultConfiguration,
                    ...fileConfig,
                    compilerOptions: {
                        ...defaults_1.defaultConfiguration.compilerOptions,
                        ...fileConfig.compilerOptions,
                    },
                };
            }
            else {
                loadedConfig = {
                    ...defaults_1.defaultConfiguration,
                    ...fileConfig,
                };
            }
        }
        else {
            loadedConfig = defaults_1.defaultConfiguration;
        }
        loadedConfigsCache.set(cacheEntryKey, loadedConfig);
        return loadedConfig;
    }
}
exports.NestConfigurationLoader = NestConfigurationLoader;
