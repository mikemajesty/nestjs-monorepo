import * as ts from 'typescript';
import { TypeScriptBinaryLoader } from '../typescript-loader';
export declare class TsConfigProvider {
    private readonly typescriptLoader;
    constructor(typescriptLoader: TypeScriptBinaryLoader);
    getByConfigFilename(configFilename: string): {
        options: ts.CompilerOptions;
        fileNames: string[];
        projectReferences: readonly ts.ProjectReference[] | undefined;
    };
}
