import { Logger } from '@nestjs/common';
import { ReplContext } from './repl-context';
import type { ReplFnDefinition } from './repl.interfaces';
export declare abstract class ReplFunction<ActionParams extends Array<unknown> = Array<unknown>, ActionReturn = any> {
    protected readonly ctx: ReplContext;
    /** Metadata that describes the built-in function itself. */
    abstract fnDefinition: ReplFnDefinition;
    protected readonly logger: Logger;
    constructor(ctx: ReplContext);
    /**
     * Method called when the function is invoked from the REPL by the user.
     */
    abstract action(...args: ActionParams): ActionReturn;
    /**
     * @returns A message displayed by calling `<fnName>.help`
     */
    makeHelpMessage(): string;
}
