import { Configuration } from '../configuration';
import { BaseCompiler } from './base-compiler';
import { TsConfigProvider } from './helpers/tsconfig-provider';
import { PluginsLoader } from './plugins/plugins-loader';
import { TypeScriptBinaryLoader } from './typescript-loader';
export declare class Compiler extends BaseCompiler {
    private readonly tsConfigProvider;
    private readonly typescriptLoader;
    constructor(pluginsLoader: PluginsLoader, tsConfigProvider: TsConfigProvider, typescriptLoader: TypeScriptBinaryLoader);
    run(configuration: Required<Configuration>, tsConfigPath: string, appName: string, _extras: any, onSuccess?: () => void): void;
    private reportAfterCompilationDiagnostic;
}
