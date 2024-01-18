import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
export declare class AddAction extends AbstractAction {
    handle(inputs: Input[], options: Input[], extraFlags: string[]): Promise<void>;
    private getSourceRoot;
    private installPackage;
    private addLibrary;
    private getLibraryName;
    private getPackageName;
    private getCollectionName;
    private getTagName;
}
