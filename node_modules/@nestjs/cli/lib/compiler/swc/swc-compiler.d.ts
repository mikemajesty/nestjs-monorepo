import * as ts from 'typescript';
import { Configuration } from '../../configuration';
import { AssetsManager } from '../assets-manager';
import { BaseCompiler } from '../base-compiler';
import { PluginsLoader } from '../plugins/plugins-loader';
export type SwcCompilerExtras = {
    watch: boolean;
    typeCheck: boolean;
    assetsManager: AssetsManager;
    tsOptions: ts.CompilerOptions;
};
export declare class SwcCompiler extends BaseCompiler {
    private readonly pluginMetadataGenerator;
    private readonly typeCheckerHost;
    constructor(pluginsLoader: PluginsLoader);
    run(configuration: Required<Configuration>, tsConfigPath: string, appName: string, extras: SwcCompilerExtras, onSuccess?: () => void): Promise<void>;
    private runTypeChecker;
    private runSwc;
    private loadSwcCliBinary;
    private getSwcRcFileContentIfExists;
    private deepMerge;
    private debounce;
    private watchFilesInOutDir;
}
