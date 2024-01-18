import type { DynamicModule, INestApplicationContext, Type } from '@nestjs/common';
import { ReplFunction } from '../repl-function';
import type { ReplFnDefinition } from '../repl.interfaces';
export declare class SelectReplFn extends ReplFunction {
    fnDefinition: ReplFnDefinition;
    action(token: DynamicModule | Type<unknown>): INestApplicationContext;
}
