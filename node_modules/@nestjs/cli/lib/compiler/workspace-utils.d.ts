import { Configuration } from '../configuration';
export declare class WorkspaceUtils {
    deleteOutDirIfEnabled(configuration: Required<Configuration>, appName: string, dirPath: string): Promise<void>;
}
