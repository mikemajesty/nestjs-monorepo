"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsReplFn = void 0;
const cli_colors_util_1 = require("@nestjs/common/utils/cli-colors.util");
const metadata_scanner_1 = require("../../metadata-scanner");
const repl_function_1 = require("../repl-function");
class MethodsReplFn extends repl_function_1.ReplFunction {
    constructor() {
        super(...arguments);
        this.fnDefinition = {
            name: 'methods',
            description: 'Display all public methods available on a given provider or controller.',
            signature: '(token: ClassRef | string) => void',
        };
        this.metadataScanner = new metadata_scanner_1.MetadataScanner();
    }
    action(token) {
        const proto = typeof token !== 'function'
            ? Object.getPrototypeOf(this.ctx.app.get(token))
            : token?.prototype;
        const methods = this.metadataScanner.getAllMethodNames(proto);
        this.ctx.writeToStdout('\n');
        this.ctx.writeToStdout(`${cli_colors_util_1.clc.green('Methods')}:\n`);
        methods.forEach(methodName => this.ctx.writeToStdout(` ${cli_colors_util_1.clc.yellow('◻')} ${methodName}\n`));
        this.ctx.writeToStdout('\n');
    }
}
exports.MethodsReplFn = MethodsReplFn;
