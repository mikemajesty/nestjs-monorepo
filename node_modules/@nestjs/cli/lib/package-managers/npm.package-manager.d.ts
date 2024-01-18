import { AbstractPackageManager } from './abstract.package-manager';
import { PackageManagerCommands } from './package-manager-commands';
export declare class NpmPackageManager extends AbstractPackageManager {
    constructor();
    get name(): string;
    get cli(): PackageManagerCommands;
}
