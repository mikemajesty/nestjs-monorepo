import { AbstractRunner } from '../runners/abstract.runner';
import { PackageManagerCommands } from './package-manager-commands';
import { ProjectDependency } from './project.dependency';
export declare abstract class AbstractPackageManager {
    protected runner: AbstractRunner;
    constructor(runner: AbstractRunner);
    install(directory: string, packageManager: string): Promise<void>;
    version(): Promise<string>;
    addProduction(dependencies: string[], tag: string): Promise<boolean>;
    addDevelopment(dependencies: string[], tag: string): Promise<void>;
    private add;
    getProduction(): Promise<ProjectDependency[]>;
    getDevelopment(): Promise<ProjectDependency[]>;
    private readPackageJson;
    updateProduction(dependencies: string[]): Promise<void>;
    updateDevelopment(dependencies: string[]): Promise<void>;
    private update;
    upgradeProduction(dependencies: string[], tag: string): Promise<void>;
    upgradeDevelopment(dependencies: string[], tag: string): Promise<void>;
    deleteProduction(dependencies: string[]): Promise<void>;
    deleteDevelopment(dependencies: string[]): Promise<void>;
    delete(commandArguments: string): Promise<void>;
    abstract get name(): string;
    abstract get cli(): PackageManagerCommands;
}
