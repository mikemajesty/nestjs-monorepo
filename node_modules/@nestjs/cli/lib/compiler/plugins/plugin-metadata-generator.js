"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginMetadataGenerator = void 0;
const constants_1 = require("../swc/constants");
const type_checker_host_1 = require("../swc/type-checker-host");
const typescript_loader_1 = require("../typescript-loader");
const plugin_metadata_printer_1 = require("./plugin-metadata-printer");
/**
 * Generates plugins metadata by traversing the AST of the project.
 * @example
 * ```ts
 * const generator = new PluginMetadataGenerator();
 * generator.generate({
 *  visitors: [
 *    new ReadonlyVisitor({ introspectComments: true, pathToSource: __dirname }),
 *  ],
 *  outputDir: __dirname,
 *  watch: true,
 *  tsconfigPath: 'tsconfig.build.json',
 * });
 * ```
 */
class PluginMetadataGenerator {
    constructor() {
        this.pluginMetadataPrinter = new plugin_metadata_printer_1.PluginMetadataPrinter();
        this.typeCheckerHost = new type_checker_host_1.TypeCheckerHost();
        this.typescriptLoader = new typescript_loader_1.TypeScriptBinaryLoader();
        this.tsBinary = this.typescriptLoader.load();
    }
    generate(options) {
        const { tsconfigPath, visitors, tsProgramRef, outputDir, watch, filename, printDiagnostics = true, } = options;
        if (visitors.length === 0) {
            return;
        }
        if (tsProgramRef) {
            return this.traverseAndPrintMetadata(tsProgramRef, visitors, outputDir, filename);
        }
        const onTypeCheckOrProgramInit = (program) => {
            this.traverseAndPrintMetadata(program, visitors, outputDir, filename);
            if (printDiagnostics) {
                const tsBinary = this.typescriptLoader.load();
                const diagnostics = tsBinary.getPreEmitDiagnostics(program);
                if (diagnostics.length > 0) {
                    const formatDiagnosticsHost = {
                        getCanonicalFileName: (path) => path,
                        getCurrentDirectory: tsBinary.sys.getCurrentDirectory,
                        getNewLine: () => tsBinary.sys.newLine,
                    };
                    console.log();
                    console.log(tsBinary.formatDiagnosticsWithColorAndContext(diagnostics, formatDiagnosticsHost));
                }
                else {
                    console.log(constants_1.FOUND_NO_ISSUES_GENERATING_METADATA);
                }
            }
        };
        this.typeCheckerHost.run(tsconfigPath, {
            watch,
            onTypeCheck: onTypeCheckOrProgramInit,
            onProgramInit: onTypeCheckOrProgramInit,
        });
    }
    traverseAndPrintMetadata(programRef, visitors, outputDir, filename) {
        for (const sourceFile of programRef.getSourceFiles()) {
            if (!sourceFile.isDeclarationFile) {
                visitors.forEach((visitor) => visitor.visit(programRef, sourceFile));
            }
        }
        let typeImports = {};
        const collectedMetadata = {};
        visitors.forEach((visitor) => {
            collectedMetadata[visitor.key] = visitor.collect();
            typeImports = {
                ...typeImports,
                ...visitor.typeImports,
            };
        });
        this.pluginMetadataPrinter.print(collectedMetadata, typeImports, {
            outputDir,
            filename,
        }, this.tsBinary);
    }
}
exports.PluginMetadataGenerator = PluginMetadataGenerator;
