"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestDependencyManager = void 0;
const ora = require("ora");
const ui_1 = require("../ui");
class NestDependencyManager {
    constructor(packageManager) {
        this.packageManager = packageManager;
    }
    async read() {
        const production = await this.packageManager.getProduction();
        return production
            .filter((dependency) => dependency.name.indexOf('@nestjs') > -1)
            .map((dependency) => dependency.name);
    }
    async update(force, tag = 'latest') {
        const spinner = ora({
            spinner: {
                interval: 120,
                frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
            },
            text: ui_1.MESSAGES.PACKAGE_MANAGER_UPDATE_IN_PROGRESS,
        });
        spinner.start();
        const dependencies = await this.read();
        if (force) {
            await this.packageManager.upgradeProduction(dependencies, tag);
        }
        else {
            await this.packageManager.updateProduction(dependencies);
        }
        spinner.succeed();
    }
}
exports.NestDependencyManager = NestDependencyManager;
