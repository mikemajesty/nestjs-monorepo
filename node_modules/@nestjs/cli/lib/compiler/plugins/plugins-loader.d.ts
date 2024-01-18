import * as ts from 'typescript';
import { ReadonlyVisitor } from '../interfaces/readonly-visitor.interface';
type Transformer = ts.TransformerFactory<any> | ts.CustomTransformerFactory;
type PluginEntry = string | PluginAndOptions;
type PluginOptions = Record<string, any>;
interface PluginAndOptions {
    name: 'string';
    options: PluginOptions;
}
export interface NestCompilerPlugin {
    before?: (options?: PluginOptions, program?: ts.Program) => Transformer;
    after?: (options?: PluginOptions, program?: ts.Program) => Transformer;
    afterDeclarations?: (options?: PluginOptions, program?: ts.Program) => Transformer;
    ReadonlyVisitor?: {
        new (options: PluginOptions): ReadonlyVisitor;
    };
}
export interface MultiNestCompilerPlugins {
    beforeHooks: Array<(program?: ts.Program) => Transformer>;
    afterHooks: Array<(program?: ts.Program) => Transformer>;
    afterDeclarationsHooks: Array<(program?: ts.Program) => Transformer>;
    readonlyVisitors: Array<ReadonlyVisitor>;
}
export declare class PluginsLoader {
    load(plugins?: PluginEntry[], extras?: {
        pathToSource?: string;
    }): MultiNestCompilerPlugins;
    private resolvePluginReferences;
}
export {};
