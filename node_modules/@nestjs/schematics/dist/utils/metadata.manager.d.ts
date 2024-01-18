import { DeclarationOptions } from './module.declarator';
export declare class MetadataManager {
    private content;
    constructor(content: string);
    insert(metadata: string, symbol: string, staticOptions?: DeclarationOptions['staticOptions']): string | undefined;
    private getDecoratorMetadata;
    private getSourceNodes;
    private insertMetadataToEmptyModuleDecorator;
    private insertNewMetadataToDecorator;
    private insertSymbolToMetadata;
    private mergeSymbolAndExpr;
    private addBlankLines;
}
