import type { Type } from '@nestjs/common';
import { ReplFunction } from '../repl-function';
import type { ReplFnDefinition } from '../repl.interfaces';
export declare class GetReplFn extends ReplFunction {
    fnDefinition: ReplFnDefinition;
    action(token: string | symbol | Function | Type<any>): any;
}
