"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const pluralize = require("pluralize");
const __1 = require("../..");
const dependencies_utils_1 = require("../../utils/dependencies.utils");
const formatting_1 = require("../../utils/formatting");
const name_parser_1 = require("../../utils/name.parser");
const source_root_helpers_1 = require("../../utils/source-root.helpers");
function main(options) {
    options = transform(options);
    return (tree, context) => {
        return (0, schematics_1.branchAndMerge)((0, schematics_1.chain)([
            addMappedTypesDependencyIfApplies(options),
            (0, source_root_helpers_1.mergeSourceRoot)(options),
            addDeclarationToModule(options),
            (0, schematics_1.mergeWith)(generate(options)),
        ]))(tree, context);
    };
}
exports.main = main;
function transform(options) {
    const target = Object.assign({}, options);
    if (!target.name) {
        throw new schematics_1.SchematicsException('Option (name) is required.');
    }
    target.metadata = 'imports';
    const location = new name_parser_1.NameParser().parse(target);
    target.name = (0, formatting_1.normalizeToKebabOrSnakeCase)(location.name);
    target.path = (0, formatting_1.normalizeToKebabOrSnakeCase)(location.path);
    target.language = target.language !== undefined ? target.language : 'ts';
    if (target.language === 'js') {
        throw new Error('The "resource" schematic does not support JavaScript language (only TypeScript is supported).');
    }
    target.specFileSuffix = (0, formatting_1.normalizeToKebabOrSnakeCase)(options.specFileSuffix || 'spec');
    target.path = target.flat
        ? target.path
        : (0, core_1.join)(target.path, target.name);
    target.isSwaggerInstalled = options.isSwaggerInstalled ?? false;
    return target;
}
function generate(options) {
    return (context) => (0, schematics_1.apply)((0, schematics_1.url)((0, core_1.join)('./files', options.language)), [
        (0, schematics_1.filter)((path) => {
            if (path.endsWith('.dto.ts')) {
                return (options.type !== 'graphql-code-first' &&
                    options.type !== 'graphql-schema-first' &&
                    options.crud);
            }
            if (path.endsWith('.input.ts')) {
                return ((options.type === 'graphql-code-first' ||
                    options.type === 'graphql-schema-first') &&
                    options.crud);
            }
            if (path.endsWith('.resolver.ts') ||
                path.endsWith('.resolver.__specFileSuffix__.ts')) {
                return (options.type === 'graphql-code-first' ||
                    options.type === 'graphql-schema-first');
            }
            if (path.endsWith('.graphql')) {
                return options.type === 'graphql-schema-first' && options.crud;
            }
            if (path.endsWith('controller.ts') ||
                path.endsWith('.controller.__specFileSuffix__.ts')) {
                return options.type === 'microservice' || options.type === 'rest';
            }
            if (path.endsWith('.gateway.ts') || path.endsWith('.gateway.__specFileSuffix__.ts')) {
                return options.type === 'ws';
            }
            if (path.includes('@ent')) {
                return options.crud;
            }
            return true;
        }),
        options.spec
            ? (0, schematics_1.noop)()
            : (0, schematics_1.filter)((path) => {
                const suffix = `.__specFileSuffix__.ts`;
                return !path.endsWith(suffix);
            }),
        (0, schematics_1.template)({
            ...core_1.strings,
            ...options,
            lowercased: (name) => {
                const classifiedName = (0, strings_1.classify)(name);
                return (classifiedName.charAt(0).toLowerCase() + classifiedName.slice(1));
            },
            singular: (name) => pluralize.singular(name),
            ent: (name) => name + '.entity',
        }),
        (0, schematics_1.move)(options.path),
    ])(context);
}
function addDeclarationToModule(options) {
    return (tree) => {
        if (options.skipImport !== undefined && options.skipImport) {
            return tree;
        }
        options.module = new __1.ModuleFinder(tree).find({
            name: options.name,
            path: options.path,
        });
        if (!options.module) {
            return tree;
        }
        const content = tree.read(options.module).toString();
        const declarator = new __1.ModuleDeclarator();
        tree.overwrite(options.module, declarator.declare(content, {
            ...options,
            type: 'module',
        }));
        return tree;
    };
}
function addMappedTypesDependencyIfApplies(options) {
    return (host, context) => {
        try {
            if (options.type === 'graphql-code-first') {
                return;
            }
            if (options.type === 'rest') {
                const nodeDependencyRef = (0, dependencies_utils_1.getPackageJsonDependency)(host, '@nestjs/swagger');
                if (nodeDependencyRef) {
                    options.isSwaggerInstalled = true;
                    return;
                }
            }
            const nodeDependencyRef = (0, dependencies_utils_1.getPackageJsonDependency)(host, '@nestjs/mapped-types');
            if (!nodeDependencyRef) {
                (0, dependencies_utils_1.addPackageJsonDependency)(host, {
                    type: dependencies_utils_1.NodeDependencyType.Default,
                    name: '@nestjs/mapped-types',
                    version: '*',
                });
                context.addTask(new tasks_1.NodePackageInstallTask());
            }
        }
        catch (err) {
        }
    };
}
