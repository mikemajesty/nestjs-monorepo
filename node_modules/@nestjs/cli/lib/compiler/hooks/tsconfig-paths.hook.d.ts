import * as ts from 'typescript';
export declare function tsconfigPathsBeforeHookFactory(compilerOptions: ts.CompilerOptions): (ctx: ts.TransformationContext) => ts.Transformer<any>;
