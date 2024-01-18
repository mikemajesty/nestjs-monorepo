import * as ts from 'typescript';
import { DeepPluginMeta } from '../interfaces/readonly-visitor.interface';
export interface PluginMetadataPrintOptions {
    outputDir: string;
    filename?: string;
}
type ComposedPluginMeta = Record<string, Record<string, Array<[ts.CallExpression, DeepPluginMeta]>>>;
/**
 * Prints the metadata to a file.
 */
export declare class PluginMetadataPrinter {
    print(metadata: ComposedPluginMeta, typeImports: Record<string, string>, options: PluginMetadataPrintOptions, tsBinary: typeof ts): void;
    private recursivelyCreatePropertyAssignment;
    private createTypeImportVariableStatement;
    private createPropertyAssignment;
}
export {};
