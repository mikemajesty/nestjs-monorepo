"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOUND_NO_ISSUES_GENERATING_METADATA = exports.FOUND_NO_ISSUES_METADATA_GENERATION_SKIPPED = exports.INITIALIZING_TYPE_CHECKER = exports.TSC_LOG_SUCCESS_PREFIX = exports.TSC_LOG_ERROR_PREFIX = exports.TSC_LOG_PREFIX = exports.SWC_LOG_PREFIX = exports.TSC_COMPILATION_STARTED_MESSAGE = exports.TSC_NO_ERRORS_MESSAGE = void 0;
const chalk = require("chalk");
exports.TSC_NO_ERRORS_MESSAGE = 'Found 0 errors. Watching for file changes.';
exports.TSC_COMPILATION_STARTED_MESSAGE = 'Starting compilation in watch mode...';
exports.SWC_LOG_PREFIX = chalk.cyan('> ') + chalk.bgCyan.bold(' SWC ');
exports.TSC_LOG_PREFIX = chalk.cyan('> ') + chalk.bgCyan.bold(' TSC ');
exports.TSC_LOG_ERROR_PREFIX = chalk.red('> ') + chalk.bgRed.bold(' TSC ');
exports.TSC_LOG_SUCCESS_PREFIX = chalk.green('> ') + chalk.bgGreen.bold(' TSC ');
exports.INITIALIZING_TYPE_CHECKER = chalk.bgCyan.bold(' TSC ') + chalk.cyan(' Initializing type checker...');
exports.FOUND_NO_ISSUES_METADATA_GENERATION_SKIPPED = exports.TSC_LOG_SUCCESS_PREFIX + chalk.green(' Found 0 issues.');
exports.FOUND_NO_ISSUES_GENERATING_METADATA = exports.TSC_LOG_SUCCESS_PREFIX +
    chalk.green(' Found 0 issues. Generating metadata...');
