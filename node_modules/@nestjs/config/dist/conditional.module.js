"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalModule = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("./config.module");
/**
 * @publicApi
 */
class ConditionalModule {
    /**
     * @publicApi
     */
    static async registerWhen(module, condition, options) {
        let configResolved = false;
        const { timeout = 5000 } = options ?? {};
        setTimeout(() => {
            if (!configResolved) {
                throw new Error(`Nest was not able to resolve the config variables within ${timeout} milliseconds. Bause of this, the ConditionalModule was not able to determine if ${module.toString()} should be registered or not`);
            }
        }, timeout);
        const returnModule = { module: ConditionalModule, imports: [], exports: [] };
        if (typeof condition === 'string') {
            const key = condition;
            condition = env => {
                return env[key]?.toLowerCase() !== 'false';
            };
        }
        await config_module_1.ConfigModule.envVariablesLoaded;
        configResolved = true;
        const evaluation = condition(process.env);
        if (evaluation) {
            returnModule.imports.push(module);
            returnModule.exports.push(module);
        }
        else {
            common_1.Logger.debug(`${condition.toString()} evaluated to false. Skipping the registration of ${module.toString()}`, ConditionalModule.name);
        }
        return returnModule;
    }
}
exports.ConditionalModule = ConditionalModule;
