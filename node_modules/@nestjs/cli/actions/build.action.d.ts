import { Input } from '../commands';
import { AssetsManager } from '../lib/compiler/assets-manager';
import { TsConfigProvider } from '../lib/compiler/helpers/tsconfig-provider';
import { PluginsLoader } from '../lib/compiler/plugins/plugins-loader';
import { TypeScriptBinaryLoader } from '../lib/compiler/typescript-loader';
import { WorkspaceUtils } from '../lib/compiler/workspace-utils';
import { ConfigurationLoader } from '../lib/configuration';
import { FileSystemReader } from '../lib/readers';
import { AbstractAction } from './abstract.action';
export declare class BuildAction extends AbstractAction {
    protected readonly pluginsLoader: PluginsLoader;
    protected readonly tsLoader: TypeScriptBinaryLoader;
    protected readonly tsConfigProvider: TsConfigProvider;
    protected readonly fileSystemReader: FileSystemReader;
    protected readonly loader: ConfigurationLoader;
    protected readonly assetsManager: AssetsManager;
    protected readonly workspaceUtils: WorkspaceUtils;
    handle(commandInputs: Input[], commandOptions: Input[]): Promise<void>;
    runBuild(commandInputs: Input[], commandOptions: Input[], watchMode: boolean, watchAssetsMode: boolean, isDebugEnabled?: boolean, onSuccess?: () => void): Promise<void>;
    private runSwc;
    private runWebpack;
    private runTsc;
    private getWebpackConfigFactoryByPath;
}
