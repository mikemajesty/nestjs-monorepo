"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const module_declarator_1 = require("../../../utils/module.declarator");
const module_finder_1 = require("../../../utils/module.finder");
const name_parser_1 = require("../../../utils/name.parser");
const source_root_helpers_1 = require("../../../utils/source-root.helpers");
function main(options) {
    options = transform(options);
    return (tree, context) => {
        return (0, schematics_1.branchAndMerge)((0, schematics_1.chain)([
            createAngularApplication(options),
            (0, source_root_helpers_1.mergeSourceRoot)(options),
            addDeclarationToModule(options),
            addGlobalPrefix(),
            (0, schematics_1.mergeWith)(generate(options)),
        ]))(tree, context);
    };
}
exports.main = main;
function transform(source) {
    const target = Object.assign({}, source);
    target.directory = target.name ? core_1.strings.dasherize(target.name) : 'client';
    target.name = 'Angular';
    target.metadata = 'imports';
    target.type = 'module';
    const location = new name_parser_1.NameParser().parse(target);
    target.name = core_1.strings.dasherize(location.name);
    target.path = (0, path_1.join)(core_1.strings.dasherize(location.path), target.name);
    return target;
}
function generate(options) {
    return (context) => (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
        (0, schematics_1.template)({
            ...core_1.strings,
            ...options,
        }),
        (0, schematics_1.move)(options.path),
    ])(context);
}
function createAngularApplication(options) {
    if (!options.initApp) {
        return (0, schematics_1.noop)();
    }
    return (0, schematics_1.externalSchematic)('@schematics/angular', 'ng-new', {
        name: options.directory,
        version: '8.0.0',
    });
}
function addDeclarationToModule(options) {
    return (tree) => {
        options.module = new module_finder_1.ModuleFinder(tree).find({
            name: options.name,
            path: options.path,
        });
        if (!options.module) {
            return tree;
        }
        const content = tree.read(options.module).toString();
        const declarator = new module_declarator_1.ModuleDeclarator();
        const rootPath = `${options.directory}/dist/${options.directory}`;
        const staticOptions = {
            name: 'forRoot',
            value: {
                rootPath,
            },
        };
        const declarationOptions = {
            ...options,
            staticOptions,
        };
        tree.overwrite(options.module, declarator.declare(content, declarationOptions));
        return tree;
    };
}
function addGlobalPrefix() {
    return (tree) => {
        const mainFilePath = 'src/main.ts';
        const fileRef = tree.get(mainFilePath);
        if (!fileRef) {
            return tree;
        }
        const ts = require('ts-morph');
        const tsProject = new ts.Project({
            manipulationSettings: {
                indentationText: ts.IndentationText.TwoSpaces,
            },
        });
        const tsFile = tsProject.addSourceFileAtPath(mainFilePath);
        const bootstrapFunction = tsFile.getFunction('bootstrap');
        const listenStatement = bootstrapFunction.getStatement(node => node.getText().includes('listen'));
        const setPrefixStatement = bootstrapFunction.getStatement(node => node.getText().includes('setGlobalPrefix'));
        if (!listenStatement || setPrefixStatement) {
            return tree;
        }
        const listenExprIndex = listenStatement.getChildIndex();
        bootstrapFunction.insertStatements(listenExprIndex, `app.setGlobalPrefix('api');`);
        tree.overwrite(mainFilePath, tsFile.getFullText());
        return tree;
    };
}
