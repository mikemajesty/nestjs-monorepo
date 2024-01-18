"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const formatting_1 = require("../../utils/formatting");
const defaults_1 = require("../defaults");
function main(options) {
    options.name = (0, formatting_1.normalizeToKebabOrSnakeCase)(options.name.toString());
    const path = !options.directory || options.directory === 'undefined'
        ? options.name
        : options.directory;
    options = transform(options);
    return (0, schematics_1.mergeWith)(generate(options, path));
}
exports.main = main;
function transform(options) {
    const target = Object.assign({}, options);
    target.author = !!target.author ? target.author : defaults_1.DEFAULT_AUTHOR;
    target.description = !!target.description
        ? target.description
        : defaults_1.DEFAULT_DESCRIPTION;
    target.language = !!target.language ? target.language : defaults_1.DEFAULT_LANGUAGE;
    target.name = resolvePackageName(target.name.toString());
    target.version = !!target.version ? target.version : defaults_1.DEFAULT_VERSION;
    target.specFileSuffix = (0, formatting_1.normalizeToKebabOrSnakeCase)(options.specFileSuffix || 'spec');
    target.packageManager =
        !target.packageManager || target.packageManager === 'undefined'
            ? 'npm'
            : target.packageManager;
    target.dependencies = !!target.dependencies ? target.dependencies : '';
    target.devDependencies = !!target.devDependencies
        ? target.devDependencies
        : '';
    return target;
}
function resolvePackageName(path) {
    const { base: baseFilename, dir: dirname } = (0, path_1.parse)(path);
    if (baseFilename === '.') {
        return (0, path_1.basename)(process.cwd());
    }
    if (dirname.match(/^@[^\s]/)) {
        return `${dirname}/${baseFilename}`;
    }
    return baseFilename;
}
function generate(options, path) {
    return (0, schematics_1.apply)((0, schematics_1.url)((0, core_1.join)('./files', options.language)), [
        options.spec ? (0, schematics_1.noop)() : (0, schematics_1.filter)((path) => !path.endsWith('__specFileSuffix__.ts')),
        options.spec
            ? (0, schematics_1.noop)()
            : (0, schematics_1.filter)((path) => {
                const languageExtension = options.language || 'ts';
                const suffix = `__specFileSuffix__.${languageExtension}`;
                return !path.endsWith(suffix);
            }),
        (0, schematics_1.template)({
            ...core_1.strings,
            ...options,
        }),
        (0, schematics_1.move)(path),
    ]);
}
