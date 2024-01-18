"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoAction = void 0;
const chalk = require("chalk");
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const package_managers_1 = require("../lib/package-managers");
const ui_1 = require("../lib/ui");
const abstract_action_1 = require("./abstract.action");
const os_info_utils_1 = require("../lib/utils/os-info.utils");
class InfoAction extends abstract_action_1.AbstractAction {
    constructor() {
        super(...arguments);
        // Nest dependencies whitelist used to compare minor version
        this.warningMessageDependenciesWhiteList = [
            '@nestjs/core',
            '@nestjs/common',
            '@nestjs/schematics',
            '@nestjs/platform-express',
            '@nestjs/platform-fastify',
            '@nestjs/platform-socket.io',
            '@nestjs/platform-ws',
            '@nestjs/websockets',
        ];
    }
    async handle() {
        this.manager = await package_managers_1.PackageManagerFactory.find();
        this.displayBanner();
        await this.displaySystemInformation();
        await this.displayNestInformation();
    }
    displayBanner() {
        console.info(chalk.red(ui_1.BANNER));
    }
    async displaySystemInformation() {
        console.info(chalk.green('[System Information]'));
        console.info('OS Version     :', chalk.blue((0, os_info_utils_1.default)((0, os_1.platform)(), (0, os_1.release)()), (0, os_1.release)()));
        console.info('NodeJS Version :', chalk.blue(process.version));
        await this.displayPackageManagerVersion();
    }
    async displayPackageManagerVersion() {
        try {
            const version = await this.manager.version();
            console.info(`${this.manager.name} Version    :`, chalk.blue(version), '\n');
        }
        catch {
            console.error(`${this.manager.name} Version    :`, chalk.red('Unknown'), '\n');
        }
    }
    async displayNestInformation() {
        this.displayCliVersion();
        console.info(chalk.green('[Nest Platform Information]'));
        await this.displayNestInformationFromPackage();
    }
    async displayNestInformationFromPackage() {
        try {
            const dependencies = this.readProjectPackageDependencies();
            this.displayNestVersions(dependencies);
        }
        catch (err) {
            console.error(chalk.red(ui_1.MESSAGES.NEST_INFORMATION_PACKAGE_MANAGER_FAILED));
        }
    }
    displayCliVersion() {
        console.info(chalk.green('[Nest CLI]'));
        console.info('Nest CLI Version :', chalk.blue(JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../package.json')).toString())
            .version), '\n');
    }
    readProjectPackageDependencies() {
        const buffer = (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'package.json'));
        const pack = JSON.parse(buffer.toString());
        const dependencies = { ...pack.dependencies, ...pack.devDependencies };
        Object.keys(dependencies).forEach((key) => {
            dependencies[key] = {
                version: dependencies[key],
            };
        });
        return dependencies;
    }
    displayNestVersions(dependencies) {
        const nestDependencies = this.buildNestVersionsMessage(dependencies);
        nestDependencies.forEach((dependency) => console.info(dependency.name, chalk.blue(dependency.value)));
        this.displayWarningMessage(nestDependencies);
    }
    displayWarningMessage(nestDependencies) {
        try {
            const warnings = this.buildNestVersionsWarningMessage(nestDependencies);
            const minorVersions = Object.keys(warnings);
            if (minorVersions.length > 0) {
                console.info('\r');
                console.info(chalk.yellow('[Warnings]'));
                console.info('The following packages are not in the same minor version');
                console.info('This could lead to runtime errors');
                minorVersions.forEach((version) => {
                    console.info(chalk.bold(`* Under version ${version}`));
                    warnings[version].forEach(({ packageName, value }) => {
                        console.info(`- ${packageName} ${value}`);
                    });
                });
            }
        }
        catch {
            console.info('\t');
            console.error(chalk.red(ui_1.MESSAGES.NEST_INFORMATION_PACKAGE_WARNING_FAILED(this.warningMessageDependenciesWhiteList)));
        }
    }
    buildNestVersionsWarningMessage(nestDependencies) {
        const unsortedWarnings = nestDependencies.reduce((acc, { name, packageName, value }) => {
            if (!this.warningMessageDependenciesWhiteList.includes(packageName)) {
                return acc;
            }
            const cleanedValue = value.replace(/[^\d.]/g, '');
            const [major, minor] = cleanedValue.split('.');
            const minorVersion = `${major}.${minor}`;
            acc[minorVersion] = [
                ...(acc[minorVersion] || []),
                { name, packageName, value },
            ];
            return acc;
        }, {});
        const unsortedMinorVersions = Object.keys(unsortedWarnings);
        if (unsortedMinorVersions.length <= 1) {
            return {};
        }
        const sortedMinorVersions = unsortedMinorVersions.sort((versionA, versionB) => {
            const numA = parseFloat(versionA);
            const numB = parseFloat(versionB);
            if (isNaN(numA) && isNaN(numB)) {
                // If both are not valid numbers, maintain the current order.
                return 0;
            }
            // NaN is considered greater than any number, so if numA is NaN, place it later.
            return isNaN(numA) ? 1 : isNaN(numB) ? -1 : numB - numA;
        });
        return sortedMinorVersions.reduce((warnings, minorVersion) => {
            warnings[minorVersion] = unsortedWarnings[minorVersion];
            return warnings;
        }, {});
    }
    buildNestVersionsMessage(dependencies) {
        const nestDependencies = this.collectNestDependencies(dependencies);
        return this.format(nestDependencies);
    }
    collectNestDependencies(dependencies) {
        const nestDependencies = [];
        Object.keys(dependencies).forEach((key) => {
            if (key.indexOf('@nestjs') > -1) {
                const depPackagePath = require.resolve(key + '/package.json', {
                    paths: [process.cwd()],
                });
                const depPackage = (0, fs_1.readFileSync)(depPackagePath).toString();
                const value = JSON.parse(depPackage).version;
                nestDependencies.push({
                    name: `${key.replace(/@nestjs\//, '').replace(/@.*/, '')} version`,
                    value: value || dependencies[key].version,
                    packageName: key,
                });
            }
        });
        return nestDependencies;
    }
    format(dependencies) {
        const sorted = dependencies.sort((dependencyA, dependencyB) => dependencyB.name.length - dependencyA.name.length);
        const length = sorted[0].name.length;
        sorted.forEach((dependency) => {
            if (dependency.name.length < length) {
                dependency.name = this.rightPad(dependency.name, length);
            }
            dependency.name = dependency.name.concat(' :');
            dependency.value = dependency.value.replace(/(\^|\~)/, '');
        });
        return sorted;
    }
    rightPad(name, length) {
        while (name.length < length) {
            name = name.concat(' ');
        }
        return name;
    }
}
exports.InfoAction = InfoAction;
