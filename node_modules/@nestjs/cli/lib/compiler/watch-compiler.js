"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchCompiler = void 0;
const errors_1 = require("../ui/errors");
const base_compiler_1 = require("./base-compiler");
const get_value_or_default_1 = require("./helpers/get-value-or-default");
const manual_restart_1 = require("./helpers/manual-restart");
const tsconfig_paths_hook_1 = require("./hooks/tsconfig-paths.hook");
class WatchCompiler extends base_compiler_1.BaseCompiler {
    constructor(pluginsLoader, tsConfigProvider, typescriptLoader) {
        super(pluginsLoader);
        this.tsConfigProvider = tsConfigProvider;
        this.typescriptLoader = typescriptLoader;
    }
    run(configuration, tsConfigPath, appName, extras, onSuccess) {
        const tsBin = this.typescriptLoader.load();
        const configPath = tsBin.findConfigFile(process.cwd(), tsBin.sys.fileExists, tsConfigPath);
        if (!configPath) {
            throw new Error(errors_1.CLI_ERRORS.MISSING_TYPESCRIPT(tsConfigPath));
        }
        const { options, projectReferences } = this.tsConfigProvider.getByConfigFilename(tsConfigPath);
        const createProgram = tsBin.createEmitAndSemanticDiagnosticsBuilderProgram;
        const origDiagnosticReporter = tsBin.createDiagnosticReporter(tsBin.sys, true);
        const origWatchStatusReporter = tsBin.createWatchStatusReporter(tsBin.sys, true);
        const host = tsBin.createWatchCompilerHost(configPath, {
            ...options,
            preserveWatchOutput: extras.preserveWatchOutput ?? options.preserveWatchOutput,
        }, tsBin.sys, createProgram, this.createDiagnosticReporter(origDiagnosticReporter), this.createWatchStatusChanged(origWatchStatusReporter, onSuccess));
        const manualRestart = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.manualRestart', appName);
        const plugins = this.loadPlugins(configuration, tsConfigPath, appName);
        this.overrideCreateProgramFn(host, manualRestart, projectReferences, plugins);
        const watchProgram = tsBin.createWatchProgram(host);
        if (manualRestart) {
            (0, manual_restart_1.listenForManualRestart)(() => {
                watchProgram.close();
                this.run(configuration, tsConfigPath, appName, extras, onSuccess);
            });
        }
    }
    overrideCreateProgramFn(host, manualRestart, projectReferences, plugins) {
        const origCreateProgram = host.createProgram;
        host.createProgram = (rootNames, options, 
        // tslint:disable-next-line:no-shadowed-variable
        host, oldProgram) => {
            if (manualRestart) {
                (0, manual_restart_1.displayManualRestartTip)();
            }
            const tsconfigPathsPlugin = options
                ? (0, tsconfig_paths_hook_1.tsconfigPathsBeforeHookFactory)(options)
                : null;
            const program = origCreateProgram(rootNames, options, host, oldProgram, undefined, projectReferences);
            const origProgramEmit = program.emit;
            program.emit = (targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers) => {
                let transforms = customTransformers;
                transforms = typeof transforms !== 'object' ? {} : transforms;
                const before = plugins.beforeHooks.map((hook) => hook(program.getProgram()));
                const after = plugins.afterHooks.map((hook) => hook(program.getProgram()));
                const afterDeclarations = plugins.afterDeclarationsHooks.map((hook) => hook(program.getProgram()));
                if (tsconfigPathsPlugin) {
                    before.unshift(tsconfigPathsPlugin);
                }
                transforms.before = before.concat(transforms.before || []);
                transforms.after = after.concat(transforms.after || []);
                transforms.afterDeclarations = afterDeclarations.concat(transforms.afterDeclarations || []);
                return origProgramEmit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, transforms);
            };
            return program;
        };
    }
    createDiagnosticReporter(diagnosticReporter) {
        return function (diagnostic, ...args) {
            return diagnosticReporter.call(this, diagnostic, ...args);
        };
    }
    createWatchStatusChanged(watchStatusReporter, onSuccess) {
        return function (diagnostic, ...args) {
            const messageText = diagnostic && diagnostic.messageText;
            const noErrorsMessage = '0 errors';
            if (messageText &&
                messageText.includes &&
                messageText.includes(noErrorsMessage) &&
                onSuccess) {
                onSuccess();
            }
            return watchStatusReporter.call(this, diagnostic, ...args);
        };
    }
}
exports.WatchCompiler = WatchCompiler;
