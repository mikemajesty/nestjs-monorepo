import { AbstractPackageManager } from './abstract.package-manager';
import { PackageManagerCommands } from './package-manager-commands';
export declare class PnpmPackageManager extends AbstractPackageManager {
    constructor();
    get name(): string;
    get cli(): PackageManagerCommands;
}
