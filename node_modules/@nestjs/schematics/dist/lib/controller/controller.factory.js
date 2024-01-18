"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const formatting_1 = require("../../utils/formatting");
const module_declarator_1 = require("../../utils/module.declarator");
const module_finder_1 = require("../../utils/module.finder");
const name_parser_1 = require("../../utils/name.parser");
const source_root_helpers_1 = require("../../utils/source-root.helpers");
const defaults_1 = require("../defaults");
const ELEMENT_METADATA = 'controllers';
const ELEMENT_TYPE = 'controller';
function main(options) {
    options = transform(options);
    return (tree, context) => {
        return (0, schematics_1.branchAndMerge)((0, schematics_1.chain)([
            (0, source_root_helpers_1.mergeSourceRoot)(options),
            (0, schematics_1.mergeWith)(generate(options)),
            addDeclarationToModule(options),
        ]))(tree, context);
    };
}
exports.main = main;
function transform(source) {
    const target = Object.assign({}, source);
    target.metadata = ELEMENT_METADATA;
    target.type = ELEMENT_TYPE;
    const location = new name_parser_1.NameParser().parse(target);
    target.name = (0, formatting_1.normalizeToKebabOrSnakeCase)(location.name);
    target.path = (0, formatting_1.normalizeToKebabOrSnakeCase)(location.path);
    target.language =
        target.language !== undefined ? target.language : defaults_1.DEFAULT_LANGUAGE;
    target.specFileSuffix = (0, formatting_1.normalizeToKebabOrSnakeCase)(source.specFileSuffix || 'spec');
    target.path = target.flat
        ? target.path
        : (0, core_1.join)(target.path, target.name);
    return target;
}
function generate(options) {
    return (context) => (0, schematics_1.apply)((0, schematics_1.url)((0, core_1.join)('./files', options.language)), [
        options.spec
            ? (0, schematics_1.noop)()
            : (0, schematics_1.filter)((path) => {
                const languageExtension = options.language || 'ts';
                const suffix = `.__specFileSuffix__.${languageExtension}`;
                return !path.endsWith(suffix);
            }),
        (0, schematics_1.template)({
            ...core_1.strings,
            ...options,
        }),
        (0, schematics_1.move)(options.path),
    ])(context);
}
function addDeclarationToModule(options) {
    return (tree) => {
        if (options.skipImport !== undefined && options.skipImport) {
            return tree;
        }
        options.module = new module_finder_1.ModuleFinder(tree).find({
            name: options.name,
            path: options.path,
        });
        if (!options.module) {
            return tree;
        }
        const content = tree.read(options.module).toString();
        const declarator = new module_declarator_1.ModuleDeclarator();
        tree.overwrite(options.module, declarator.declare(content, options));
        return tree;
    };
}
