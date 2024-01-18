import * as ts from 'typescript';
export type DeepPluginMeta = ts.ObjectLiteralExpression | {
    [key: string]: DeepPluginMeta;
};
export interface ReadonlyVisitor {
    key: string;
    typeImports: Record<string, string>;
    visit(program: unknown, sf: unknown): unknown;
    collect(): Record<string, Array<unknown>>;
}
