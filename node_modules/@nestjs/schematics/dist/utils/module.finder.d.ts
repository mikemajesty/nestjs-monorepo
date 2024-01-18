import { Path } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
export interface FindOptions {
    name?: string;
    path: Path;
    kind?: string;
}
export declare class ModuleFinder {
    private tree;
    constructor(tree: Tree);
    find(options: FindOptions): Path | null;
    private findIn;
}
