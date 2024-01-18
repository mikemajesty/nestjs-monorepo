"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommand = void 0;
const remaining_flags_1 = require("../lib/utils/remaining-flags");
const abstract_command_1 = require("./abstract.command");
class AddCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('add <library>')
            .allowUnknownOption()
            .description('Adds support for an external library to your project.')
            .option('-d, --dry-run', 'Report actions that would be performed without writing out results.')
            .option('-s, --skip-install', 'Skip package installation.', false)
            .option('-p, --project [project]', 'Project in which to generate files.')
            .usage('<library> [options] [library-specific-options]')
            .action(async (library, command) => {
            const options = [];
            options.push({ name: 'dry-run', value: !!command.dryRun });
            options.push({ name: 'skip-install', value: command.skipInstall });
            options.push({
                name: 'project',
                value: command.project,
            });
            const inputs = [];
            inputs.push({ name: 'library', value: library });
            const flags = (0, remaining_flags_1.getRemainingFlags)(program);
            try {
                await this.action.handle(inputs, options, flags);
            }
            catch (err) {
                process.exit(1);
            }
        });
    }
}
exports.AddCommand = AddCommand;
