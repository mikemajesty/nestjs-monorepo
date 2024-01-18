"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTscConfigPath = void 0;
const get_default_tsconfig_path_1 = require("../../utils/get-default-tsconfig-path");
const get_value_or_default_1 = require("./get-value-or-default");
/**
 * Returns the path to the tsc configuration file to use for the given application.
 * @param configuration Configuration object.
 * @param cmdOptions Command line options.
 * @param appName Application name.
 * @returns The path to the tsc configuration file to use.
 */
function getTscConfigPath(configuration, cmdOptions, appName) {
    let tsconfigPath = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.tsConfigPath', appName, 'path', cmdOptions);
    if (tsconfigPath) {
        return tsconfigPath;
    }
    const builder = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.builder', appName);
    tsconfigPath =
        typeof builder === 'object' && builder?.type === 'tsc'
            ? builder.options?.configPath
            : undefined;
    return tsconfigPath ?? (0, get_default_tsconfig_path_1.getDefaultTsconfigPath)();
}
exports.getTscConfigPath = getTscConfigPath;
