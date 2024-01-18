"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const ts = require("typescript");
const base_compiler_1 = require("./base-compiler");
const tsconfig_paths_hook_1 = require("./hooks/tsconfig-paths.hook");
class Compiler extends base_compiler_1.BaseCompiler {
    constructor(pluginsLoader, tsConfigProvider, typescriptLoader) {
        super(pluginsLoader);
        this.tsConfigProvider = tsConfigProvider;
        this.typescriptLoader = typescriptLoader;
    }
    run(configuration, tsConfigPath, appName, _extras, onSuccess) {
        const tsBinary = this.typescriptLoader.load();
        const formatHost = {
            getCanonicalFileName: (path) => path,
            getCurrentDirectory: tsBinary.sys.getCurrentDirectory,
            getNewLine: () => tsBinary.sys.newLine,
        };
        const { options, fileNames, projectReferences } = this.tsConfigProvider.getByConfigFilename(tsConfigPath);
        const createProgram = tsBinary.createIncrementalProgram || tsBinary.createProgram;
        const program = createProgram.call(ts, {
            rootNames: fileNames,
            projectReferences,
            options,
        });
        const plugins = this.loadPlugins(configuration, tsConfigPath, appName);
        const tsconfigPathsPlugin = (0, tsconfig_paths_hook_1.tsconfigPathsBeforeHookFactory)(options);
        const programRef = program.getProgram
            ? program.getProgram()
            : program;
        const before = plugins.beforeHooks.map((hook) => hook(programRef));
        const after = plugins.afterHooks.map((hook) => hook(programRef));
        const afterDeclarations = plugins.afterDeclarationsHooks.map((hook) => hook(programRef));
        const emitResult = program.emit(undefined, undefined, undefined, undefined, {
            before: tsconfigPathsPlugin
                ? before.concat(tsconfigPathsPlugin)
                : before,
            after,
            afterDeclarations,
        });
        const errorsCount = this.reportAfterCompilationDiagnostic(program, emitResult, tsBinary, formatHost);
        if (errorsCount) {
            process.exit(1);
        }
        else if (!errorsCount && onSuccess) {
            onSuccess();
        }
    }
    reportAfterCompilationDiagnostic(program, emitResult, tsBinary, formatHost) {
        const diagnostics = tsBinary
            .getPreEmitDiagnostics(program)
            .concat(emitResult.diagnostics);
        if (diagnostics.length > 0) {
            console.error(tsBinary.formatDiagnosticsWithColorAndContext(diagnostics, formatHost));
            console.info(`Found ${diagnostics.length} error(s).` + tsBinary.sys.newLine);
        }
        return diagnostics.length;
    }
}
exports.Compiler = Compiler;
