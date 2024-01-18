"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeCheckerHost = void 0;
const chalk = require("chalk");
const ora = require("ora");
const ts = require("typescript");
const tsconfig_provider_1 = require("../helpers/tsconfig-provider");
const typescript_loader_1 = require("../typescript-loader");
const constants_1 = require("./constants");
class TypeCheckerHost {
    constructor() {
        this.typescriptLoader = new typescript_loader_1.TypeScriptBinaryLoader();
        this.tsConfigProvider = new tsconfig_provider_1.TsConfigProvider(this.typescriptLoader);
    }
    run(tsconfigPath, options) {
        if (!tsconfigPath) {
            throw new Error('"tsconfigPath" is required when "tsProgramRef" is not provided.');
        }
        const tsBinary = this.typescriptLoader.load();
        const spinner = ora({
            text: constants_1.INITIALIZING_TYPE_CHECKER,
        });
        if (options.watch) {
            console.log();
            spinner.start();
            this.runInWatchMode(tsconfigPath, tsBinary, options);
            spinner.succeed();
            return;
        }
        spinner.start();
        this.runOnce(tsconfigPath, tsBinary, options);
        spinner.succeed();
    }
    runInWatchMode(tsconfigPath, tsBinary, options) {
        const { options: tsOptions } = this.tsConfigProvider.getByConfigFilename(tsconfigPath);
        let builderProgram = undefined;
        const reportWatchStatusCallback = (diagnostic) => {
            if (diagnostic.messageText !== constants_1.TSC_NO_ERRORS_MESSAGE) {
                if (diagnostic.messageText?.includes('Found')) {
                    console.log(constants_1.TSC_LOG_ERROR_PREFIX, chalk.red(diagnostic.messageText));
                }
                return;
            }
            if (!builderProgram) {
                return;
            }
            const tsProgram = builderProgram.getProgram().getProgram();
            options.onTypeCheck?.(tsProgram);
        };
        const host = this.createWatchCompilerHost(tsBinary, tsconfigPath, tsOptions, reportWatchStatusCallback);
        builderProgram = tsBinary.createWatchProgram(host);
        process.nextTick(() => {
            options.onProgramInit?.(builderProgram.getProgram().getProgram());
        });
    }
    runOnce(tsconfigPath, tsBinary, options) {
        const { options: tsOptions, fileNames, projectReferences, } = this.tsConfigProvider.getByConfigFilename(tsconfigPath);
        const createProgram = tsBinary.createIncrementalProgram ?? tsBinary.createProgram;
        const program = createProgram.call(ts, {
            rootNames: fileNames,
            projectReferences,
            options: tsOptions,
        });
        const programRef = program.getProgram
            ? program.getProgram()
            : program;
        const diagnostics = tsBinary.getPreEmitDiagnostics(programRef);
        if (diagnostics.length > 0) {
            const formatDiagnosticsHost = {
                getCanonicalFileName: (path) => path,
                getCurrentDirectory: tsBinary.sys.getCurrentDirectory,
                getNewLine: () => tsBinary.sys.newLine,
            };
            console.log();
            console.log(tsBinary.formatDiagnosticsWithColorAndContext(diagnostics, formatDiagnosticsHost));
            process.exit(1);
        }
        options.onTypeCheck?.(programRef);
    }
    createWatchCompilerHost(tsBinary, tsConfigPath, options, reportWatchStatusCallback) {
        const origDiagnosticReporter = tsBinary.createDiagnosticReporter(tsBinary.sys, true);
        const tsOptions = {
            ...options,
            preserveWatchOutput: true,
            noEmit: true,
        };
        return tsBinary.createWatchCompilerHost(tsConfigPath, tsOptions, tsBinary.sys, undefined, origDiagnosticReporter, reportWatchStatusCallback);
    }
}
exports.TypeCheckerHost = TypeCheckerHost;
