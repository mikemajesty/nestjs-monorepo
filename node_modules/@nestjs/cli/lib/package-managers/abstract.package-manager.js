"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPackageManager = void 0;
const chalk = require("chalk");
const fs_1 = require("fs");
const ora = require("ora");
const path_1 = require("path");
const ui_1 = require("../ui");
const formatting_1 = require("../utils/formatting");
class AbstractPackageManager {
    constructor(runner) {
        this.runner = runner;
    }
    async install(directory, packageManager) {
        const spinner = ora({
            spinner: {
                interval: 120,
                frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
            },
            text: ui_1.MESSAGES.PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS,
        });
        spinner.start();
        try {
            const commandArgs = `${this.cli.install} ${this.cli.silentFlag}`;
            const collect = true;
            const normalizedDirectory = (0, formatting_1.normalizeToKebabOrSnakeCase)(directory);
            await this.runner.run(commandArgs, collect, (0, path_1.join)(process.cwd(), normalizedDirectory));
            spinner.succeed();
            console.info();
            console.info(ui_1.MESSAGES.PACKAGE_MANAGER_INSTALLATION_SUCCEED(directory));
            console.info(ui_1.MESSAGES.GET_STARTED_INFORMATION);
            console.info();
            console.info(chalk.gray(ui_1.MESSAGES.CHANGE_DIR_COMMAND(directory)));
            console.info(chalk.gray(ui_1.MESSAGES.START_COMMAND(packageManager)));
            console.info();
        }
        catch {
            spinner.fail();
            const commandArgs = this.cli.install;
            const commandToRun = this.runner.rawFullCommand(commandArgs);
            console.error(chalk.red(ui_1.MESSAGES.PACKAGE_MANAGER_INSTALLATION_FAILED(chalk.bold(commandToRun))));
        }
    }
    async version() {
        const commandArguments = '--version';
        const collect = true;
        return this.runner.run(commandArguments, collect);
    }
    async addProduction(dependencies, tag) {
        const command = [this.cli.add, this.cli.saveFlag]
            .filter((i) => i)
            .join(' ');
        const args = dependencies
            .map((dependency) => `${dependency}@${tag}`)
            .join(' ');
        const spinner = ora({
            spinner: {
                interval: 120,
                frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
            },
            text: ui_1.MESSAGES.PACKAGE_MANAGER_PRODUCTION_INSTALLATION_IN_PROGRESS,
        });
        spinner.start();
        try {
            await this.add(`${command} ${args}`);
            spinner.succeed();
            return true;
        }
        catch {
            spinner.fail();
            return false;
        }
    }
    async addDevelopment(dependencies, tag) {
        const command = `${this.cli.add} ${this.cli.saveDevFlag}`;
        const args = dependencies
            .map((dependency) => `${dependency}@${tag}`)
            .join(' ');
        await this.add(`${command} ${args}`);
    }
    async add(commandArguments) {
        const collect = true;
        await this.runner.run(commandArguments, collect);
    }
    async getProduction() {
        const packageJsonContent = await this.readPackageJson();
        const packageJsonDependencies = packageJsonContent.dependencies;
        const dependencies = [];
        for (const [name, version] of Object.entries(packageJsonDependencies)) {
            dependencies.push({ name, version });
        }
        return dependencies;
    }
    async getDevelopment() {
        const packageJsonContent = await this.readPackageJson();
        const packageJsonDevDependencies = packageJsonContent.devDependencies;
        const dependencies = [];
        for (const [name, version] of Object.entries(packageJsonDevDependencies)) {
            dependencies.push({ name, version });
        }
        return dependencies;
    }
    async readPackageJson() {
        return new Promise((resolve, reject) => {
            (0, fs_1.readFile)((0, path_1.join)(process.cwd(), 'package.json'), (error, buffer) => {
                if (error !== undefined && error !== null) {
                    reject(error);
                }
                else {
                    resolve(JSON.parse(buffer.toString()));
                }
            });
        });
    }
    async updateProduction(dependencies) {
        const commandArguments = `${this.cli.update} ${dependencies.join(' ')}`;
        await this.update(commandArguments);
    }
    async updateDevelopment(dependencies) {
        const commandArguments = `${this.cli.update} ${dependencies.join(' ')}`;
        await this.update(commandArguments);
    }
    async update(commandArguments) {
        const collect = true;
        await this.runner.run(commandArguments, collect);
    }
    async upgradeProduction(dependencies, tag) {
        await this.deleteProduction(dependencies);
        await this.addProduction(dependencies, tag);
    }
    async upgradeDevelopment(dependencies, tag) {
        await this.deleteDevelopment(dependencies);
        await this.addDevelopment(dependencies, tag);
    }
    async deleteProduction(dependencies) {
        const command = [this.cli.remove, this.cli.saveFlag]
            .filter((i) => i)
            .join(' ');
        const args = dependencies.join(' ');
        await this.delete(`${command} ${args}`);
    }
    async deleteDevelopment(dependencies) {
        const commandArguments = `${this.cli.remove} ${this.cli.saveDevFlag} ${dependencies.join(' ')}`;
        await this.delete(commandArguments);
    }
    async delete(commandArguments) {
        const collect = true;
        await this.runner.run(commandArguments, collect);
    }
}
exports.AbstractPackageManager = AbstractPackageManager;
