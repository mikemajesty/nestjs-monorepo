"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpReplFn = void 0;
const iterare_1 = require("iterare");
const cli_colors_util_1 = require("@nestjs/common/utils/cli-colors.util");
const repl_function_1 = require("../repl-function");
class HelpReplFn extends repl_function_1.ReplFunction {
    constructor() {
        super(...arguments);
        this.fnDefinition = {
            name: 'help',
            signature: '() => void',
            description: 'Display all available REPL native functions.',
        };
    }
    action() {
        const sortedNativeFunctions = (0, iterare_1.iterate)(this.ctx.nativeFunctions)
            .map(([, nativeFunction]) => nativeFunction.fnDefinition)
            .toArray()
            .sort((a, b) => (a.name < b.name ? -1 : 1));
        this.ctx.writeToStdout(`You can call ${cli_colors_util_1.clc.bold('.help')} on any function listed below (e.g.: ${cli_colors_util_1.clc.bold('help.help')}):\n\n` +
            sortedNativeFunctions.map(HelpReplFn.buildHelpMessage).join('\n') +
            // Without the following LF the last item won't be displayed
            '\n');
    }
}
exports.HelpReplFn = HelpReplFn;
HelpReplFn.buildHelpMessage = ({ name, description }) => cli_colors_util_1.clc.cyanBright(name) +
    (description ? ` ${cli_colors_util_1.clc.bold('-')} ${description}` : '');
