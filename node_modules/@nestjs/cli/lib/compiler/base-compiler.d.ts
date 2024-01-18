import { Configuration } from '../configuration';
import { PluginsLoader } from './plugins/plugins-loader';
export declare abstract class BaseCompiler<T = Record<string, any>> {
    private readonly pluginsLoader;
    constructor(pluginsLoader: PluginsLoader);
    abstract run(configuration: Required<Configuration>, tsConfigPath: string, appName: string | undefined, extras?: T, onSuccess?: () => void): any;
    loadPlugins(configuration: Required<Configuration>, tsConfigPath: string, appName: string | undefined): import("./plugins/plugins-loader").MultiNestCompilerPlugins;
    getPathToSource(configuration: Required<Configuration>, tsConfigPath: string, appName: string | undefined): string;
}
