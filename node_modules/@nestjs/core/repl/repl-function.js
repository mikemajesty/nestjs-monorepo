"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplFunction = void 0;
const cli_colors_util_1 = require("@nestjs/common/utils/cli-colors.util");
class ReplFunction {
    constructor(ctx) {
        this.ctx = ctx;
        this.logger = ctx.logger;
    }
    /**
     * @returns A message displayed by calling `<fnName>.help`
     */
    makeHelpMessage() {
        const { description, name, signature } = this.fnDefinition;
        const fnSignatureWithName = `${name}${signature}`;
        return `${cli_colors_util_1.clc.yellow(description)}\n${cli_colors_util_1.clc.magentaBright('Interface:')} ${cli_colors_util_1.clc.bold(fnSignatureWithName)}\n`;
    }
}
exports.ReplFunction = ReplFunction;
