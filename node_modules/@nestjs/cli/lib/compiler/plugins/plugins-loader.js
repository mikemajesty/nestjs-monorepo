"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginsLoader = void 0;
const path_1 = require("path");
const ui_1 = require("../../ui");
const PLUGIN_ENTRY_FILENAME = 'plugin';
class PluginsLoader {
    load(plugins = [], extras = {}) {
        const pluginNames = plugins.map((entry) => typeof entry === 'object'
            ? entry.name
            : entry);
        const pluginRefs = this.resolvePluginReferences(pluginNames);
        const multiCompilerPlugins = {
            afterHooks: [],
            afterDeclarationsHooks: [],
            beforeHooks: [],
            readonlyVisitors: [],
        };
        pluginRefs.forEach((plugin, index) => {
            if (!plugin.before && !plugin.after && !plugin.afterDeclarations) {
                throw new Error(ui_1.CLI_ERRORS.WRONG_PLUGIN(pluginNames[index]));
            }
            const options = typeof plugins[index] === 'object'
                ? plugins[index].options || {}
                : {};
            if (plugin.before) {
                multiCompilerPlugins.beforeHooks.push(plugin.before.bind(plugin.before, options));
            }
            if (plugin.after) {
                multiCompilerPlugins.afterHooks.push(plugin.after.bind(plugin.after, options));
            }
            if (plugin.afterDeclarations) {
                multiCompilerPlugins.afterDeclarationsHooks.push(plugin.afterDeclarations.bind(plugin.afterDeclarations, options));
            }
            if (plugin.ReadonlyVisitor) {
                const instance = new plugin.ReadonlyVisitor({
                    ...options,
                    ...extras,
                    readonly: true,
                });
                instance.key = pluginNames[index];
                multiCompilerPlugins.readonlyVisitors.push(instance);
            }
        });
        return multiCompilerPlugins;
    }
    resolvePluginReferences(pluginNames) {
        const nodeModulePaths = [
            (0, path_1.join)(process.cwd(), 'node_modules'),
            ...module.paths,
        ];
        return pluginNames.map((item) => {
            try {
                try {
                    const binaryPath = require.resolve((0, path_1.join)(item, PLUGIN_ENTRY_FILENAME), {
                        paths: nodeModulePaths,
                    });
                    return require(binaryPath);
                }
                catch { }
                const binaryPath = require.resolve(item, { paths: nodeModulePaths });
                return require(binaryPath);
            }
            catch (e) {
                throw new Error(`"${item}" plugin is not installed.`);
            }
        });
    }
}
exports.PluginsLoader = PluginsLoader;
