"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildAction = void 0;
const chalk = require("chalk");
const path_1 = require("path");
const assets_manager_1 = require("../lib/compiler/assets-manager");
const get_builder_1 = require("../lib/compiler/helpers/get-builder");
const get_tsc_config_path_1 = require("../lib/compiler/helpers/get-tsc-config.path");
const get_value_or_default_1 = require("../lib/compiler/helpers/get-value-or-default");
const get_webpack_config_path_1 = require("../lib/compiler/helpers/get-webpack-config-path");
const tsconfig_provider_1 = require("../lib/compiler/helpers/tsconfig-provider");
const plugins_loader_1 = require("../lib/compiler/plugins/plugins-loader");
const typescript_loader_1 = require("../lib/compiler/typescript-loader");
const workspace_utils_1 = require("../lib/compiler/workspace-utils");
const configuration_1 = require("../lib/configuration");
const defaults_1 = require("../lib/configuration/defaults");
const readers_1 = require("../lib/readers");
const ui_1 = require("../lib/ui");
const abstract_action_1 = require("./abstract.action");
class BuildAction extends abstract_action_1.AbstractAction {
    constructor() {
        super(...arguments);
        this.pluginsLoader = new plugins_loader_1.PluginsLoader();
        this.tsLoader = new typescript_loader_1.TypeScriptBinaryLoader();
        this.tsConfigProvider = new tsconfig_provider_1.TsConfigProvider(this.tsLoader);
        this.fileSystemReader = new readers_1.FileSystemReader(process.cwd());
        this.loader = new configuration_1.NestConfigurationLoader(this.fileSystemReader);
        this.assetsManager = new assets_manager_1.AssetsManager();
        this.workspaceUtils = new workspace_utils_1.WorkspaceUtils();
    }
    async handle(commandInputs, commandOptions) {
        try {
            const watchModeOption = commandOptions.find((option) => option.name === 'watch');
            const watchMode = !!(watchModeOption && watchModeOption.value);
            const watchAssetsModeOption = commandOptions.find((option) => option.name === 'watchAssets');
            const watchAssetsMode = !!(watchAssetsModeOption && watchAssetsModeOption.value);
            await this.runBuild(commandInputs, commandOptions, watchMode, watchAssetsMode);
        }
        catch (err) {
            if (err instanceof Error) {
                console.log(`\n${ui_1.ERROR_PREFIX} ${err.message}\n`);
            }
            else {
                console.error(`\n${chalk.red(err)}\n`);
            }
            process.exit(1);
        }
    }
    async runBuild(commandInputs, commandOptions, watchMode, watchAssetsMode, isDebugEnabled = false, onSuccess) {
        const configFileName = commandOptions.find((option) => option.name === 'config').value;
        const configuration = await this.loader.load(configFileName);
        const appName = commandInputs.find((input) => input.name === 'app')
            .value;
        const pathToTsconfig = (0, get_tsc_config_path_1.getTscConfigPath)(configuration, commandOptions, appName);
        const { options: tsOptions } = this.tsConfigProvider.getByConfigFilename(pathToTsconfig);
        const outDir = tsOptions.outDir || defaults_1.defaultOutDir;
        const isWebpackEnabled = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.webpack', appName, 'webpack', commandOptions);
        const builder = isWebpackEnabled
            ? { type: 'webpack' }
            : (0, get_builder_1.getBuilder)(configuration, commandOptions, appName);
        await this.workspaceUtils.deleteOutDirIfEnabled(configuration, appName, outDir);
        this.assetsManager.copyAssets(configuration, appName, outDir, watchAssetsMode);
        switch (builder.type) {
            case 'tsc':
                return this.runTsc(watchMode, commandOptions, configuration, pathToTsconfig, appName, onSuccess);
            case 'webpack':
                return this.runWebpack(configuration, appName, commandOptions, pathToTsconfig, isDebugEnabled, watchMode, onSuccess);
            case 'swc':
                return this.runSwc(configuration, appName, pathToTsconfig, watchMode, commandOptions, tsOptions, onSuccess);
        }
    }
    async runSwc(configuration, appName, pathToTsconfig, watchMode, options, tsOptions, onSuccess) {
        const { SwcCompiler } = await Promise.resolve().then(() => require('../lib/compiler/swc/swc-compiler'));
        const swc = new SwcCompiler(this.pluginsLoader);
        await swc.run(configuration, pathToTsconfig, appName, {
            watch: watchMode,
            typeCheck: (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.typeCheck', appName, 'typeCheck', options),
            tsOptions,
            assetsManager: this.assetsManager,
        }, onSuccess);
    }
    async runWebpack(configuration, appName, commandOptions, pathToTsconfig, debug, watchMode, onSuccess) {
        const { WebpackCompiler } = await Promise.resolve().then(() => require('../lib/compiler/webpack-compiler'));
        const webpackCompiler = new WebpackCompiler(this.pluginsLoader);
        const webpackPath = (0, get_webpack_config_path_1.getWebpackConfigPath)(configuration, commandOptions, appName) ??
            defaults_1.defaultWebpackConfigFilename;
        const webpackConfigFactoryOrConfig = this.getWebpackConfigFactoryByPath(webpackPath, defaults_1.defaultWebpackConfigFilename);
        return webpackCompiler.run(configuration, pathToTsconfig, appName, {
            inputs: commandOptions,
            webpackConfigFactoryOrConfig,
            debug,
            watchMode,
            assetsManager: this.assetsManager,
        }, onSuccess);
    }
    async runTsc(watchMode, options, configuration, pathToTsconfig, appName, onSuccess) {
        if (watchMode) {
            const { WatchCompiler } = await Promise.resolve().then(() => require('../lib/compiler/watch-compiler'));
            const watchCompiler = new WatchCompiler(this.pluginsLoader, this.tsConfigProvider, this.tsLoader);
            const isPreserveWatchOutputEnabled = options.find((option) => option.name === 'preserveWatchOutput' && option.value === true)?.value;
            watchCompiler.run(configuration, pathToTsconfig, appName, { preserveWatchOutput: isPreserveWatchOutputEnabled }, onSuccess);
        }
        else {
            const { Compiler } = await Promise.resolve().then(() => require('../lib/compiler/compiler'));
            const compiler = new Compiler(this.pluginsLoader, this.tsConfigProvider, this.tsLoader);
            compiler.run(configuration, pathToTsconfig, appName, undefined, onSuccess);
            this.assetsManager.closeWatchers();
        }
    }
    getWebpackConfigFactoryByPath(webpackPath, defaultPath) {
        const pathToWebpackFile = (0, path_1.join)(process.cwd(), webpackPath);
        try {
            return require(pathToWebpackFile);
        }
        catch (err) {
            if (webpackPath !== defaultPath) {
                throw err;
            }
            return ({}) => ({});
        }
    }
}
exports.BuildAction = BuildAction;
