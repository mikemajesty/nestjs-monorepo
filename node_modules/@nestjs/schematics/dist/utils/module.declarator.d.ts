import { Path } from '@angular-devkit/core';
import { ModuleImportDeclarator } from './module-import.declarator';
import { ModuleMetadataDeclarator } from './module-metadata.declarator';
export interface DeclarationOptions {
    metadata: string;
    type?: string;
    name: string;
    className?: string;
    path: Path;
    module: Path;
    symbol?: string;
    staticOptions?: {
        name: string;
        value: Record<string, any>;
    };
}
export declare class ModuleDeclarator {
    private imports;
    private metadata;
    constructor(imports?: ModuleImportDeclarator, metadata?: ModuleMetadataDeclarator);
    declare(content: string, options: DeclarationOptions): string;
    private computeSymbol;
}
