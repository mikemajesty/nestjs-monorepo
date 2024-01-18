"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectReplFn = void 0;
const repl_function_1 = require("../repl-function");
class SelectReplFn extends repl_function_1.ReplFunction {
    constructor() {
        super(...arguments);
        this.fnDefinition = {
            name: 'select',
            description: 'Allows navigating through the modules tree, for example, to pull out a specific instance from the selected module.',
            signature: '(token: DynamicModule | ClassRef) => INestApplicationContext',
        };
    }
    action(token) {
        return this.ctx.app.select(token);
    }
}
exports.SelectReplFn = SelectReplFn;
