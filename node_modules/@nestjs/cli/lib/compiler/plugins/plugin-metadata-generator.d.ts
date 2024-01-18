import * as ts from 'typescript';
import { ReadonlyVisitor } from '../interfaces/readonly-visitor.interface';
export interface PluginMetadataGenerateOptions {
    /**
     * The visitors to use to generate the metadata.
     */
    visitors: ReadonlyVisitor[];
    /**
     * The output directory to write the metadata to.
     */
    outputDir: string;
    /**
     * Whether to watch the project for changes.
     */
    watch?: boolean;
    /**
     * The path to the tsconfig file.
     * Relative to the current working directory (process.cwd()).
     */
    tsconfigPath?: string;
    /**
     * The filename to write the metadata to.
     */
    filename?: string;
    /**
     * A reference to an existing ts.Program instance.
     */
    tsProgramRef?: ts.Program;
    /**
     * Whether to print diagnostics to the console.
     * @default true
     */
    printDiagnostics?: boolean;
}
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
export declare class PluginMetadataGenerator {
    private readonly pluginMetadataPrinter;
    private readonly typeCheckerHost;
    private readonly typescriptLoader;
    private readonly tsBinary;
    constructor();
    generate(options: PluginMetadataGenerateOptions): void;
    private traverseAndPrintMetadata;
}
