"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildCommand = void 0;
const ui_1 = require("../lib/ui");
const abstract_command_1 = require("./abstract.command");
class BuildCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('build [app]')
            .option('-c, --config [path]', 'Path to nest-cli configuration file.')
            .option('-p, --path [path]', 'Path to tsconfig file.')
            .option('-w, --watch', 'Run in watch mode (live-reload).')
            .option('-b, --builder [name]', 'Builder to be used (tsc, webpack, swc).')
            .option('--watchAssets', 'Watch non-ts (e.g., .graphql) files mode.')
            .option('--webpack', 'Use webpack for compilation (deprecated option, use --builder instead).')
            .option('--type-check', 'Enable type checking (when SWC is used).')
            .option('--webpackPath [path]', 'Path to webpack configuration.')
            .option('--tsc', 'Use typescript compiler for compilation.')
            .option('--preserveWatchOutput', 'Use "preserveWatchOutput" option when using tsc watch mode.')
            .description('Build Nest application.')
            .action(async (app, command) => {
            const options = [];
            options.push({
                name: 'config',
                value: command.config,
            });
            const isWebpackEnabled = command.tsc ? false : command.webpack;
            options.push({ name: 'webpack', value: isWebpackEnabled });
            options.push({ name: 'watch', value: !!command.watch });
            options.push({ name: 'watchAssets', value: !!command.watchAssets });
            options.push({
                name: 'path',
                value: command.path,
            });
            options.push({
                name: 'webpackPath',
                value: command.webpackPath,
            });
            const availableBuilders = ['tsc', 'webpack', 'swc'];
            if (command.builder && !availableBuilders.includes(command.builder)) {
                console.error(ui_1.ERROR_PREFIX +
                    ` Invalid builder option: ${command.builder}. Available builders: ${availableBuilders.join(', ')}`);
                return;
            }
            options.push({
                name: 'builder',
                value: command.builder,
            });
            if (command.typeCheck && command.builder !== 'swc') {
                console.warn(ui_1.INFO_PREFIX +
                    ` "typeCheck" will not have any effect when "builder" is not "swc".`);
            }
            options.push({
                name: 'typeCheck',
                value: command.typeCheck,
            });
            options.push({
                name: 'preserveWatchOutput',
                value: !!command.preserveWatchOutput &&
                    !!command.watch &&
                    !isWebpackEnabled,
            });
            const inputs = [];
            inputs.push({ name: 'app', value: app });
            await this.action.handle(inputs, options);
        });
    }
}
exports.BuildCommand = BuildCommand;
