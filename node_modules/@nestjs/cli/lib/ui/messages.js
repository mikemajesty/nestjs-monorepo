"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = void 0;
const chalk = require("chalk");
const emojis_1 = require("./emojis");
exports.MESSAGES = {
    PROJECT_SELECTION_QUESTION: 'Which project would you like to generate to?',
    LIBRARY_PROJECT_SELECTION_QUESTION: 'Which project would you like to add the library to?',
    DRY_RUN_MODE: 'Command has been executed in dry run mode, nothing changed!',
    PROJECT_INFORMATION_START: `${emojis_1.EMOJIS.ZAP}  We will scaffold your app in a few seconds..`,
    RUNNER_EXECUTION_ERROR: (command) => `\nFailed to execute command: ${command}`,
    PACKAGE_MANAGER_QUESTION: `Which package manager would you ${emojis_1.EMOJIS.HEART}  to use?`,
    PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS: `Installation in progress... ${emojis_1.EMOJIS.COFFEE}`,
    PACKAGE_MANAGER_UPDATE_IN_PROGRESS: `Installation in progress... ${emojis_1.EMOJIS.COFFEE}`,
    PACKAGE_MANAGER_UPGRADE_IN_PROGRESS: `Installation in progress... ${emojis_1.EMOJIS.COFFEE}`,
    PACKAGE_MANAGER_PRODUCTION_INSTALLATION_IN_PROGRESS: `Package installation in progress... ${emojis_1.EMOJIS.COFFEE}`,
    GIT_INITIALIZATION_ERROR: 'Git repository has not been initialized',
    PACKAGE_MANAGER_INSTALLATION_SUCCEED: (name) => name !== '.'
        ? `${emojis_1.EMOJIS.ROCKET}  Successfully created project ${chalk.green(name)}`
        : `${emojis_1.EMOJIS.ROCKET}  Successfully created a new project`,
    GET_STARTED_INFORMATION: `${emojis_1.EMOJIS.POINT_RIGHT}  Get started with the following commands:`,
    CHANGE_DIR_COMMAND: (name) => `$ cd ${name}`,
    START_COMMAND: (name) => `$ ${name} run start`,
    PACKAGE_MANAGER_INSTALLATION_FAILED: (commandToRunManually) => `${emojis_1.EMOJIS.SCREAM}  Packages installation failed!\nIn case you don't see any errors above, consider manually running the failed command ${commandToRunManually} to see more details on why it errored out.`,
    // tslint:disable-next-line:max-line-length
    NEST_INFORMATION_PACKAGE_MANAGER_FAILED: `${emojis_1.EMOJIS.SMIRK}  cannot read your project package.json file, are you inside your project directory?`,
    NEST_INFORMATION_PACKAGE_WARNING_FAILED: (nestDependencies) => `${emojis_1.EMOJIS.SMIRK}  failed to compare dependencies versions, please check that following packages are in the same minor version : \n ${nestDependencies.join('\n')}`,
    LIBRARY_INSTALLATION_FAILED_BAD_PACKAGE: (name) => `Unable to install library ${name} because package did not install. Please check package name.`,
    LIBRARY_INSTALLATION_FAILED_NO_LIBRARY: 'No library found.',
    LIBRARY_INSTALLATION_STARTS: 'Starting library setup...',
};
