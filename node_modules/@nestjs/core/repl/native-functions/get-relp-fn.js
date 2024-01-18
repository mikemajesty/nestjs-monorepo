"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReplFn = void 0;
const repl_function_1 = require("../repl-function");
class GetReplFn extends repl_function_1.ReplFunction {
    constructor() {
        super(...arguments);
        this.fnDefinition = {
            name: 'get',
            signature: '(token: InjectionToken) => any',
            description: 'Retrieves an instance of either injectable or controller, otherwise, throws exception.',
            aliases: ['$'],
        };
    }
    action(token) {
        return this.ctx.app.get(token);
    }
}
exports.GetReplFn = GetReplFn;
