import { Input } from '../../commands';
import { Configuration } from '../configuration';
import { AssetsManager } from './assets-manager';
import { BaseCompiler } from './base-compiler';
import { PluginsLoader } from './plugins/plugins-loader';
import webpack = require('webpack');
type WebpackConfigFactory = (config: webpack.Configuration, webpackRef: typeof webpack) => webpack.Configuration;
type WebpackConfigFactoryOrConfig = WebpackConfigFactory | webpack.Configuration;
type WebpackCompilerExtras = {
    inputs: Input[];
    assetsManager: AssetsManager;
    webpackConfigFactoryOrConfig: WebpackConfigFactoryOrConfig | WebpackConfigFactoryOrConfig[];
    debug?: boolean;
    watchMode?: boolean;
};
export declare class WebpackCompiler extends BaseCompiler<WebpackCompilerExtras> {
    constructor(pluginsLoader: PluginsLoader);
    run(configuration: Required<Configuration>, tsConfigPath: string, appName: string, extras: WebpackCompilerExtras, onSuccess?: () => void): void;
    private createAfterCallback;
}
export {};
