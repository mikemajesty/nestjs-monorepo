import type { Type } from '@nestjs/common';
import { ReplFunction } from '../repl-function';
import type { ReplFnDefinition } from '../repl.interfaces';
export declare class MethodsReplFn extends ReplFunction {
    fnDefinition: ReplFnDefinition;
    private readonly metadataScanner;
    action(token: Type<unknown> | string): void;
}
