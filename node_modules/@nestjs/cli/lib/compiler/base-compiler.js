"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCompiler = void 0;
const path_1 = require("path");
const get_value_or_default_1 = require("./helpers/get-value-or-default");
class BaseCompiler {
    constructor(pluginsLoader) {
        this.pluginsLoader = pluginsLoader;
    }
    loadPlugins(configuration, tsConfigPath, appName) {
        const pluginsConfig = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.plugins', appName);
        const pathToSource = this.getPathToSource(configuration, tsConfigPath, appName);
        const plugins = this.pluginsLoader.load(pluginsConfig, { pathToSource });
        return plugins;
    }
    getPathToSource(configuration, tsConfigPath, appName) {
        const sourceRoot = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'sourceRoot', appName, 'sourceRoot');
        const cwd = process.cwd();
        const relativeRootPath = (0, path_1.dirname)((0, path_1.relative)(cwd, tsConfigPath));
        const pathToSource = (0, path_1.normalize)(sourceRoot).indexOf((0, path_1.normalize)(relativeRootPath)) >= 0
            ? (0, path_1.join)(cwd, sourceRoot)
            : (0, path_1.join)(cwd, relativeRootPath, sourceRoot);
        return pathToSource;
    }
}
exports.BaseCompiler = BaseCompiler;
