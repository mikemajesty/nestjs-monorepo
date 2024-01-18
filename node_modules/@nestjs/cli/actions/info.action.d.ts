import { AbstractAction } from './abstract.action';
interface LockfileDependency {
    version: string;
}
interface PackageJsonDependencies {
    [key: string]: LockfileDependency;
}
interface NestDependency {
    name: string;
    value: string;
    packageName: string;
}
interface NestDependencyWarnings {
    [key: string]: Array<NestDependency>;
}
export declare class InfoAction extends AbstractAction {
    private manager;
    private warningMessageDependenciesWhiteList;
    handle(): Promise<void>;
    private displayBanner;
    private displaySystemInformation;
    displayPackageManagerVersion(): Promise<void>;
    displayNestInformation(): Promise<void>;
    displayNestInformationFromPackage(): Promise<void>;
    displayCliVersion(): void;
    readProjectPackageDependencies(): PackageJsonDependencies;
    displayNestVersions(dependencies: PackageJsonDependencies): void;
    displayWarningMessage(nestDependencies: NestDependency[]): void;
    buildNestVersionsWarningMessage(nestDependencies: NestDependency[]): NestDependencyWarnings;
    buildNestVersionsMessage(dependencies: PackageJsonDependencies): NestDependency[];
    collectNestDependencies(dependencies: PackageJsonDependencies): NestDependency[];
    format(dependencies: NestDependency[]): NestDependency[];
    rightPad(name: string, length: number): string;
}
export {};
