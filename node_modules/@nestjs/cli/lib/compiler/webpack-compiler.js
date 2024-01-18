"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackCompiler = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const ui_1 = require("../ui");
const base_compiler_1 = require("./base-compiler");
const webpack_defaults_1 = require("./defaults/webpack-defaults");
const get_value_or_default_1 = require("./helpers/get-value-or-default");
const webpack = require("webpack");
class WebpackCompiler extends base_compiler_1.BaseCompiler {
    constructor(pluginsLoader) {
        super(pluginsLoader);
    }
    run(configuration, tsConfigPath, appName, extras, onSuccess) {
        const cwd = process.cwd();
        const configPath = (0, path_1.join)(cwd, tsConfigPath);
        if (!(0, fs_1.existsSync)(configPath)) {
            throw new Error(`Could not find TypeScript configuration file "${tsConfigPath}".`);
        }
        const plugins = this.loadPlugins(configuration, tsConfigPath, appName);
        const pathToSource = this.getPathToSource(configuration, tsConfigPath, appName);
        const entryFile = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'entryFile', appName, 'entryFile', extras.inputs);
        const entryFileRoot = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'root', appName) || '';
        const defaultOptions = (0, webpack_defaults_1.webpackDefaultsFactory)(pathToSource, entryFileRoot, entryFile, extras.debug ?? false, tsConfigPath, plugins);
        let compiler;
        let watchOptions;
        let watch;
        if (Array.isArray(extras.webpackConfigFactoryOrConfig)) {
            const webpackConfigurations = extras.webpackConfigFactoryOrConfig.map((configOrFactory) => {
                const unwrappedConfig = typeof configOrFactory !== 'function'
                    ? configOrFactory
                    : configOrFactory(defaultOptions, webpack);
                return {
                    ...defaultOptions,
                    mode: extras.watchMode ? 'development' : defaultOptions.mode,
                    ...unwrappedConfig,
                };
            });
            compiler = webpack(webpackConfigurations);
            watchOptions = webpackConfigurations.map((config) => config.watchOptions || {});
            watch = webpackConfigurations.some((config) => config.watch);
        }
        else {
            const projectWebpackOptions = typeof extras.webpackConfigFactoryOrConfig !== 'function'
                ? extras.webpackConfigFactoryOrConfig
                : extras.webpackConfigFactoryOrConfig(defaultOptions, webpack);
            const webpackConfiguration = {
                ...defaultOptions,
                mode: extras.watchMode ? 'development' : defaultOptions.mode,
                ...projectWebpackOptions,
            };
            compiler = webpack(webpackConfiguration);
            watchOptions = webpackConfiguration.watchOptions;
            watch = webpackConfiguration.watch;
        }
        const afterCallback = this.createAfterCallback(onSuccess, extras.assetsManager, extras.watchMode ?? false, watch);
        if (extras.watchMode || watch) {
            compiler.hooks.watchRun.tapAsync('Rebuild info', (params, callback) => {
                console.log(`\n${ui_1.INFO_PREFIX} Webpack is building your sources...\n`);
                callback();
            });
            compiler.watch(watchOptions || {}, afterCallback);
        }
        else {
            compiler.run(afterCallback);
        }
    }
    createAfterCallback(onSuccess, assetsManager, watchMode, watch) {
        return (err, stats) => {
            if (err && stats === undefined) {
                // Could not complete the compilation
                // The error caught is most likely thrown by underlying tasks
                console.log(err);
                return process.exit(1);
            }
            const statsOutput = stats.toString({
                chunks: false,
                colors: true,
                modules: false,
                assets: false,
            });
            if (!err && !stats.hasErrors()) {
                if (!onSuccess) {
                    assetsManager.closeWatchers();
                }
                else {
                    onSuccess();
                }
            }
            else if (!watchMode && !watch) {
                console.log(statsOutput);
                return process.exit(1);
            }
            console.log(statsOutput);
        };
    }
}
exports.WebpackCompiler = WebpackCompiler;
