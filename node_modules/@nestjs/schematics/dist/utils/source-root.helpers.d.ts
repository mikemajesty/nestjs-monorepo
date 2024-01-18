import { Rule, Tree } from '@angular-devkit/schematics';
export declare function isInRootDirectory(host: Tree, extraFiles?: string[]): boolean;
export declare function mergeSourceRoot<T extends {
    sourceRoot?: string;
    path?: string;
} = any>(options: T): Rule;
