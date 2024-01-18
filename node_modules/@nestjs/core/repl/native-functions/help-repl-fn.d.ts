import { ReplFunction } from '../repl-function';
import type { ReplFnDefinition } from '../repl.interfaces';
export declare class HelpReplFn extends ReplFunction {
    fnDefinition: ReplFnDefinition;
    static buildHelpMessage: ({ name, description }: ReplFnDefinition) => string;
    action(): void;
}
