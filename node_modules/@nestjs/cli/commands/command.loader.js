"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLoader = void 0;
const chalk = require("chalk");
const actions_1 = require("../actions");
const ui_1 = require("../lib/ui");
const add_command_1 = require("./add.command");
const build_command_1 = require("./build.command");
const generate_command_1 = require("./generate.command");
const info_command_1 = require("./info.command");
const new_command_1 = require("./new.command");
const start_command_1 = require("./start.command");
class CommandLoader {
    static async load(program) {
        new new_command_1.NewCommand(new actions_1.NewAction()).load(program);
        new build_command_1.BuildCommand(new actions_1.BuildAction()).load(program);
        new start_command_1.StartCommand(new actions_1.StartAction()).load(program);
        new info_command_1.InfoCommand(new actions_1.InfoAction()).load(program);
        new add_command_1.AddCommand(new actions_1.AddAction()).load(program);
        await new generate_command_1.GenerateCommand(new actions_1.GenerateAction()).load(program);
        this.handleInvalidCommand(program);
    }
    static handleInvalidCommand(program) {
        program.on('command:*', () => {
            console.error(`\n${ui_1.ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`, program.args.join(' '));
            console.log(`See ${chalk.red('--help')} for a list of available commands.\n`);
            process.exit(1);
        });
    }
}
exports.CommandLoader = CommandLoader;
