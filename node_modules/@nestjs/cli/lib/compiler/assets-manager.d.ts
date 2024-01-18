import { Configuration } from '../configuration';
export declare class AssetsManager {
    private watchAssetsKeyValue;
    private watchers;
    private actionInProgress;
    /**
     * Using on `nest build` to close file watch or the build process will not end
     * Interval like process
     * If no action has been taken recently close watchers
     * If action has been taken recently flag and try again
     */
    closeWatchers(): void;
    copyAssets(configuration: Required<Configuration>, appName: string, outDir: string, watchAssetsMode: boolean): void;
    private actionOnFile;
}
