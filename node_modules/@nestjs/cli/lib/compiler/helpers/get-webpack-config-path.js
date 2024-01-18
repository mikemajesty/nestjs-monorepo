"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackConfigPath = void 0;
const get_value_or_default_1 = require("./get-value-or-default");
/**
 * Returns the path to the webpack configuration file to use for the given application.
 * @param configuration Configuration object.
 * @param cmdOptions Command line options.
 * @param appName Application name.
 * @returns The path to the webpack configuration file to use.
 */
function getWebpackConfigPath(configuration, cmdOptions, appName) {
    let webpackPath = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.webpackConfigPath', appName, 'webpackPath', cmdOptions);
    if (webpackPath) {
        return webpackPath;
    }
    const builder = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.builder', appName);
    webpackPath =
        typeof builder === 'object' && builder?.type === 'webpack'
            ? builder.options?.configPath
            : undefined;
    return webpackPath;
}
exports.getWebpackConfigPath = getWebpackConfigPath;
