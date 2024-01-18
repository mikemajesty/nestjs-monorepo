"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoCommand = void 0;
const abstract_command_1 = require("./abstract.command");
class InfoCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('info')
            .alias('i')
            .description('Display Nest project details.')
            .action(async () => {
            await this.action.handle();
        });
    }
}
exports.InfoCommand = InfoCommand;
