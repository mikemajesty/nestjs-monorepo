"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwcCompiler = void 0;
const chalk = require("chalk");
const child_process_1 = require("child_process");
const chokidar = require("chokidar");
const fs_1 = require("fs");
const path = require("path");
const path_1 = require("path");
const ui_1 = require("../../ui");
const tree_kill_1 = require("../../utils/tree-kill");
const base_compiler_1 = require("../base-compiler");
const swc_defaults_1 = require("../defaults/swc-defaults");
const get_value_or_default_1 = require("../helpers/get-value-or-default");
const plugin_metadata_generator_1 = require("../plugins/plugin-metadata-generator");
const constants_1 = require("./constants");
const type_checker_host_1 = require("./type-checker-host");
class SwcCompiler extends base_compiler_1.BaseCompiler {
    constructor(pluginsLoader) {
        super(pluginsLoader);
        this.pluginMetadataGenerator = new plugin_metadata_generator_1.PluginMetadataGenerator();
        this.typeCheckerHost = new type_checker_host_1.TypeCheckerHost();
    }
    async run(configuration, tsConfigPath, appName, extras, onSuccess) {
        const swcOptions = (0, swc_defaults_1.swcDefaultsFactory)(extras.tsOptions, configuration);
        const swcrcFilePath = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.builder.options.swcrcPath', appName);
        if (extras.watch) {
            if (extras.typeCheck) {
                this.runTypeChecker(configuration, tsConfigPath, appName, extras);
            }
            await this.runSwc(swcOptions, extras, swcrcFilePath);
            if (onSuccess) {
                onSuccess();
                const debounceTime = 150;
                const callback = this.debounce(onSuccess, debounceTime);
                this.watchFilesInOutDir(swcOptions, callback);
            }
        }
        else {
            if (extras.typeCheck) {
                await this.runTypeChecker(configuration, tsConfigPath, appName, extras);
            }
            await this.runSwc(swcOptions, extras, swcrcFilePath);
            if (onSuccess) {
                onSuccess();
            }
            extras.assetsManager?.closeWatchers();
        }
    }
    runTypeChecker(configuration, tsConfigPath, appName, extras) {
        if (extras.watch) {
            const args = [
                tsConfigPath,
                appName,
                configuration.sourceRoot ?? 'src',
                JSON.stringify(configuration.compilerOptions.plugins ?? []),
            ];
            const childProcessRef = (0, child_process_1.fork)((0, path_1.join)(__dirname, 'forked-type-checker.js'), args, {
                cwd: process.cwd(),
            });
            process.on('exit', () => childProcessRef && (0, tree_kill_1.treeKillSync)(childProcessRef.pid));
        }
        else {
            const { readonlyVisitors } = this.loadPlugins(configuration, tsConfigPath, appName);
            const outputDir = this.getPathToSource(configuration, tsConfigPath, appName);
            let fulfilled = false;
            return new Promise((resolve, reject) => {
                try {
                    this.typeCheckerHost.run(tsConfigPath, {
                        watch: extras.watch,
                        onTypeCheck: (program) => {
                            if (!fulfilled) {
                                fulfilled = true;
                                resolve();
                            }
                            if (readonlyVisitors.length > 0) {
                                process.nextTick(() => console.log(constants_1.FOUND_NO_ISSUES_GENERATING_METADATA));
                                this.pluginMetadataGenerator.generate({
                                    outputDir,
                                    visitors: readonlyVisitors,
                                    tsProgramRef: program,
                                });
                            }
                            else {
                                process.nextTick(() => console.log(constants_1.FOUND_NO_ISSUES_METADATA_GENERATION_SKIPPED));
                            }
                        },
                    });
                }
                catch (err) {
                    if (!fulfilled) {
                        fulfilled = true;
                        reject(err);
                    }
                }
            });
        }
    }
    async runSwc(options, extras, swcrcFilePath) {
        process.nextTick(() => console.log(constants_1.SWC_LOG_PREFIX, chalk.cyan('Running...')));
        const swcCli = this.loadSwcCliBinary();
        const swcRcFile = await this.getSwcRcFileContentIfExists(swcrcFilePath);
        const swcOptions = this.deepMerge(options.swcOptions, swcRcFile);
        if (swcOptions?.jsc?.baseUrl && !(0, path_1.isAbsolute)(swcOptions?.jsc?.baseUrl)) {
            // jsc.baseUrl should be resolved by the caller, if it's passed as an object.
            // https://github.com/swc-project/swc/pull/7827
            const rootDir = process.cwd();
            swcOptions.jsc.baseUrl = path.join(rootDir, swcOptions.jsc.baseUrl);
        }
        await swcCli.default({
            ...options,
            swcOptions,
            cliOptions: {
                ...options.cliOptions,
                watch: extras.watch,
            },
        });
    }
    loadSwcCliBinary() {
        try {
            return require('@swc/cli/lib/swc/dir');
        }
        catch (err) {
            console.error(ui_1.ERROR_PREFIX +
                ' Failed to load "@swc/cli" and "@swc/core" packages. Please, install them by running "npm i -D @swc/cli @swc/core".');
            process.exit(1);
        }
    }
    getSwcRcFileContentIfExists(swcrcFilePath) {
        try {
            return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), swcrcFilePath ?? '.swcrc'), 'utf8'));
        }
        catch (err) {
            if (swcrcFilePath !== undefined) {
                console.error(ui_1.ERROR_PREFIX +
                    ` Failed to load "${swcrcFilePath}". Please, check if the file exists and is valid JSON.`);
                process.exit(1);
            }
            return {};
        }
    }
    deepMerge(target, source) {
        if (typeof target !== 'object' ||
            target === null ||
            typeof source !== 'object' ||
            source === null) {
            return source;
        }
        if (Array.isArray(target) && Array.isArray(source)) {
            return source.reduce((acc, value, index) => {
                acc[index] = this.deepMerge(target[index], value);
                return acc;
            }, target);
        }
        const merged = { ...target };
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (key in target) {
                    merged[key] = this.deepMerge(target[key], source[key]);
                }
                else {
                    merged[key] = source[key];
                }
            }
        }
        return merged;
    }
    debounce(callback, wait) {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(callback, wait);
        };
    }
    watchFilesInOutDir(options, onChange) {
        const dir = (0, path_1.isAbsolute)(options.cliOptions.outDir)
            ? options.cliOptions.outDir
            : (0, path_1.join)(process.cwd(), options.cliOptions.outDir);
        const paths = (0, path_1.join)(dir, '**/*.js');
        const watcher = chokidar.watch(paths, {
            ignoreInitial: true,
            awaitWriteFinish: {
                stabilityThreshold: 50,
                pollInterval: 10,
            },
        });
        for (const type of ['add', 'change']) {
            watcher.on(type, async () => onChange());
        }
    }
}
exports.SwcCompiler = SwcCompiler;
