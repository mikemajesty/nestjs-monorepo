import { Input } from '../commands';
import { BuildAction } from './build.action';
export declare class StartAction extends BuildAction {
    handle(commandInputs: Input[], commandOptions: Input[]): Promise<void>;
    createOnSuccessHook(entryFile: string, sourceRoot: string, debugFlag: boolean | string | undefined, outDirName: string, binaryToRun: string): () => void;
    private spawnChildProcess;
    private getSourceMapSupportPkg;
}
