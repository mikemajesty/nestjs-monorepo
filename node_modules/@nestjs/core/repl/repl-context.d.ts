import { INestApplicationContext, InjectionToken, Logger } from '@nestjs/common';
import { ReplFunction } from './repl-function';
import type { ReplFunctionClass } from './repl.interfaces';
type ModuleKey = string;
export type ModuleDebugEntry = {
    controllers: Record<string, InjectionToken>;
    providers: Record<string, InjectionToken>;
};
type ReplScope = Record<string, any>;
export declare class ReplContext {
    readonly app: INestApplicationContext;
    readonly logger: Logger;
    debugRegistry: Record<ModuleKey, ModuleDebugEntry>;
    readonly globalScope: ReplScope;
    readonly nativeFunctions: Map<string, ReplFunction<unknown[], any>>;
    private readonly container;
    constructor(app: INestApplicationContext, nativeFunctionsClassRefs?: ReplFunctionClass[]);
    writeToStdout(text: string): void;
    private initializeContext;
    private introspectCollection;
    private stringifyToken;
    private addNativeFunction;
    private registerFunctionIntoGlobalScope;
    private initializeNativeFunctions;
}
export {};
