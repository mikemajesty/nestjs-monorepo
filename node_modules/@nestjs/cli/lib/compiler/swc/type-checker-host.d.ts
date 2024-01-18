import * as ts from 'typescript';
export interface TypeCheckerHostRunOptions {
    watch?: boolean;
    onTypeCheck?: (program: ts.Program) => void;
    onProgramInit?: (program: ts.Program) => void;
}
export declare class TypeCheckerHost {
    private readonly typescriptLoader;
    private readonly tsConfigProvider;
    run(tsconfigPath: string | undefined, options: TypeCheckerHostRunOptions): void;
    private runInWatchMode;
    private runOnce;
    private createWatchCompilerHost;
}
