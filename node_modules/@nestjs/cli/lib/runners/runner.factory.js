"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnerFactory = void 0;
const chalk = require("chalk");
const npm_runner_1 = require("./npm.runner");
const runner_1 = require("./runner");
const schematic_runner_1 = require("./schematic.runner");
const yarn_runner_1 = require("./yarn.runner");
const pnpm_runner_1 = require("./pnpm.runner");
class RunnerFactory {
    static create(runner) {
        switch (runner) {
            case runner_1.Runner.SCHEMATIC:
                return new schematic_runner_1.SchematicRunner();
            case runner_1.Runner.NPM:
                return new npm_runner_1.NpmRunner();
            case runner_1.Runner.YARN:
                return new yarn_runner_1.YarnRunner();
            case runner_1.Runner.PNPM:
                return new pnpm_runner_1.PnpmRunner();
            default:
                console.info(chalk.yellow(`[WARN] Unsupported runner: ${runner}`));
        }
    }
}
exports.RunnerFactory = RunnerFactory;
