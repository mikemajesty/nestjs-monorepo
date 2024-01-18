"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugReplFn = void 0;
const cli_colors_util_1 = require("@nestjs/common/utils/cli-colors.util");
const repl_function_1 = require("../repl-function");
class DebugReplFn extends repl_function_1.ReplFunction {
    constructor() {
        super(...arguments);
        this.fnDefinition = {
            name: 'debug',
            description: 'Print all registered modules as a list together with their controllers and providers.\nIf the argument is passed in, for example, "debug(MyModule)" then it will only print components of this specific module.',
            signature: '(moduleCls?: ClassRef | string) => void',
        };
    }
    action(moduleCls) {
        this.ctx.writeToStdout('\n');
        if (moduleCls) {
            const token = typeof moduleCls === 'function' ? moduleCls.name : moduleCls;
            const moduleEntry = this.ctx.debugRegistry[token];
            if (!moduleEntry) {
                return this.logger.error(`"${token}" has not been found in the modules registry`);
            }
            this.printCtrlsAndProviders(token, moduleEntry);
        }
        else {
            Object.keys(this.ctx.debugRegistry).forEach(moduleKey => {
                this.printCtrlsAndProviders(moduleKey, this.ctx.debugRegistry[moduleKey]);
            });
        }
        this.ctx.writeToStdout('\n');
    }
    printCtrlsAndProviders(moduleName, moduleDebugEntry) {
        this.ctx.writeToStdout(`${cli_colors_util_1.clc.green(moduleName)}:\n`);
        this.printCollection('controllers', moduleDebugEntry['controllers']);
        this.printCollection('providers', moduleDebugEntry['providers']);
    }
    printCollection(title, collectionValue) {
        const collectionEntries = Object.keys(collectionValue);
        if (collectionEntries.length <= 0) {
            return;
        }
        this.ctx.writeToStdout(` ${cli_colors_util_1.clc.yellow(`- ${title}`)}:\n`);
        collectionEntries.forEach(provider => this.ctx.writeToStdout(`  ${cli_colors_util_1.clc.green('◻')} ${provider}\n`));
    }
}
exports.DebugReplFn = DebugReplFn;
