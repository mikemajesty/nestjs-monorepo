"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveReplFn = void 0;
const repl_function_1 = require("../repl-function");
class ResolveReplFn extends repl_function_1.ReplFunction {
    constructor() {
        super(...arguments);
        this.fnDefinition = {
            name: 'resolve',
            description: 'Resolves transient or request-scoped instance of either injectable or controller, otherwise, throws exception.',
            signature: '(token: InjectionToken, contextId: any) => Promise<any>',
        };
    }
    action(token, contextId) {
        return this.ctx.app.resolve(token, contextId);
    }
}
exports.ResolveReplFn = ResolveReplFn;
