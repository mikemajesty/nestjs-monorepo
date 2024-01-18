import type { Type } from '@nestjs/common';
import { ReplFunction } from '../repl-function';
import type { ReplFnDefinition } from '../repl.interfaces';
export declare class DebugReplFn extends ReplFunction {
    fnDefinition: ReplFnDefinition;
    action(moduleCls?: Type<unknown> | string): void;
    private printCtrlsAndProviders;
    private printCollection;
}
