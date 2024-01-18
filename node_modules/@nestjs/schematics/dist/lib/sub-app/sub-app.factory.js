"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const fs_1 = require("fs");
const comment_json_1 = require("comment-json");
const formatting_1 = require("../../utils/formatting");
const defaults_1 = require("../defaults");
function main(options) {
    const appName = getAppNameFromPackageJson();
    options = transform(options);
    return (0, schematics_1.chain)([
        updateTsConfig(),
        updatePackageJson(options, appName),
        (tree, context) => isMonorepo(tree)
            ? (0, schematics_1.noop)()(tree, context)
            : (0, schematics_1.chain)([
                (0, schematics_1.branchAndMerge)((0, schematics_1.mergeWith)(generateWorkspace(options, appName))),
                moveDefaultAppToApps(options.path, appName, options.sourceRoot),
            ])(tree, context),
        addAppsToCliOptions(options.path, options.name, appName),
        (0, schematics_1.branchAndMerge)((0, schematics_1.mergeWith)(generate(options))),
    ]);
}
exports.main = main;
function getAppNameFromPackageJson() {
    try {
        if (!(0, fs_1.existsSync)('./package.json')) {
            return defaults_1.DEFAULT_DIR_ENTRY_APP;
        }
        const packageJson = JSON.parse(stripBom((0, fs_1.readFileSync)('./package.json', 'utf-8')));
        if (!packageJson.name) {
            return defaults_1.DEFAULT_DIR_ENTRY_APP;
        }
        let name = packageJson.name;
        name = name.replace(/[^\w.]+/g, '-').replace(/\-+/g, '-');
        return name[0] === '-' ? name.substr(1) : name;
    }
    catch {
        return defaults_1.DEFAULT_DIR_ENTRY_APP;
    }
}
function stripBom(value) {
    if (value.charCodeAt(0) === 0xfeff) {
        return value.slice(1);
    }
    return value;
}
function transform(options) {
    const target = Object.assign({}, options);
    const defaultSourceRoot = options.rootDir !== undefined ? options.rootDir : defaults_1.DEFAULT_APPS_PATH;
    if (!target.name) {
        target.name = defaults_1.DEFAULT_APP_NAME;
    }
    target.language = !!target.language ? target.language : defaults_1.DEFAULT_LANGUAGE;
    target.name = (0, formatting_1.normalizeToKebabOrSnakeCase)(target.name);
    target.path =
        target.path !== undefined
            ? (0, core_1.join)((0, core_1.normalize)(defaultSourceRoot), target.path)
            : (0, core_1.normalize)(defaultSourceRoot);
    return target;
}
function isMonorepo(host) {
    const nestFileExists = host.exists('nest.json');
    const nestCliFileExists = host.exists('nest-cli.json');
    if (!nestFileExists && !nestCliFileExists) {
        return false;
    }
    const filename = nestCliFileExists ? 'nest-cli.json' : 'nest.json';
    const source = host.read(filename);
    if (!source) {
        return false;
    }
    const sourceText = source.toString('utf-8');
    const optionsObj = (0, comment_json_1.parse)(sourceText);
    return !!optionsObj.monorepo;
}
function updateJsonFile(host, path, callback) {
    const source = host.read(path);
    if (source) {
        const sourceText = source.toString('utf-8');
        const json = (0, comment_json_1.parse)(sourceText);
        callback(json);
        host.overwrite(path, (0, comment_json_1.stringify)(json, null, 2));
    }
    return host;
}
function updateTsConfig() {
    return (host) => {
        if (!host.exists('tsconfig.json')) {
            return host;
        }
        return updateJsonFile(host, 'tsconfig.json', (tsconfig) => {
            if (!tsconfig.compilerOptions) {
                tsconfig.compilerOptions = {};
            }
            if (!tsconfig.compilerOptions.baseUrl) {
                tsconfig.compilerOptions.baseUrl = './';
            }
            if (!tsconfig.compilerOptions.paths) {
                tsconfig.compilerOptions.paths = {};
            }
        });
    };
}
function updatePackageJson(options, defaultAppName) {
    return (host) => {
        if (!host.exists('package.json')) {
            return host;
        }
        return updateJsonFile(host, 'package.json', (packageJson) => {
            updateNpmScripts(packageJson.scripts, options, defaultAppName);
            updateJestOptions(packageJson.jest, options);
        });
    };
}
function updateNpmScripts(scripts, options, defaultAppName) {
    if (!scripts) {
        return;
    }
    const defaultFormatScriptName = 'format';
    const defaultStartScriptName = 'start:prod';
    const defaultTestScriptName = 'test:e2e';
    if (!scripts[defaultTestScriptName] &&
        !scripts[defaultFormatScriptName] &&
        !scripts[defaultStartScriptName]) {
        return;
    }
    if (scripts[defaultTestScriptName] &&
        scripts[defaultTestScriptName].indexOf(options.path) < 0) {
        const defaultTestDir = 'test';
        const newTestDir = (0, core_1.join)(options.path, defaultAppName, defaultTestDir);
        scripts[defaultTestScriptName] = scripts[defaultTestScriptName].replace(defaultTestDir, newTestDir);
    }
    if (scripts[defaultFormatScriptName] &&
        scripts[defaultFormatScriptName].indexOf(defaults_1.DEFAULT_PATH_NAME) >= 0) {
        const defaultSourceRoot = options.rootDir !== undefined ? options.rootDir : defaults_1.DEFAULT_APPS_PATH;
        scripts[defaultFormatScriptName] = `prettier --write "${defaultSourceRoot}/**/*.ts" "${defaults_1.DEFAULT_LIB_PATH}/**/*.ts"`;
    }
    if (scripts[defaultStartScriptName] &&
        scripts[defaultStartScriptName].indexOf('dist/main') >= 0) {
        const defaultSourceRoot = options.rootDir !== undefined ? options.rootDir : defaults_1.DEFAULT_APPS_PATH;
        scripts[defaultStartScriptName] = `node dist/${defaultSourceRoot}/${defaultAppName}/main`;
    }
}
function updateJestOptions(jestOptions, options) {
    if (!jestOptions) {
        return;
    }
    if (jestOptions.rootDir === defaults_1.DEFAULT_PATH_NAME) {
        jestOptions.rootDir = '.';
        jestOptions.coverageDirectory = './coverage';
    }
    const defaultSourceRoot = options.rootDir !== undefined ? options.rootDir : defaults_1.DEFAULT_APPS_PATH;
    const jestSourceRoot = `<rootDir>/${defaultSourceRoot}/`;
    if (!jestOptions.roots) {
        jestOptions.roots = [jestSourceRoot];
    }
    else if (jestOptions.roots.indexOf(jestSourceRoot) < 0) {
        jestOptions.roots.push(jestSourceRoot);
        const originalSourceRoot = `<rootDir>/src/`;
        const originalSourceRootIndex = jestOptions.roots.indexOf(originalSourceRoot);
        if (originalSourceRootIndex >= 0) {
            jestOptions.roots.splice(originalSourceRootIndex, 1);
        }
    }
}
function moveDefaultAppToApps(projectRoot, appName, sourceRoot = defaults_1.DEFAULT_PATH_NAME) {
    return (host) => {
        if (process.env.NODE_ENV === defaults_1.TEST_ENV) {
            return host;
        }
        const appDestination = (0, core_1.join)(projectRoot, appName);
        moveDirectoryTo(sourceRoot, appDestination, host);
        moveDirectoryTo('test', appDestination, host);
        return host;
    };
}
function moveDirectoryTo(srcDir, destination, tree) {
    let srcDirExists = false;
    tree.getDir(srcDir).visit((filePath, file) => {
        srcDirExists = true;
        const newFilePath = (0, core_1.join)(destination, filePath);
        tree.create(newFilePath, file.content);
    });
    if (srcDirExists) {
        tree.delete(srcDir);
    }
}
function addAppsToCliOptions(projectRoot, projectName, appName) {
    const rootPath = (0, core_1.join)(projectRoot, projectName);
    const project = {
        type: defaults_1.PROJECT_TYPE.APPLICATION,
        root: rootPath,
        entryFile: 'main',
        sourceRoot: (0, core_1.join)(rootPath, defaults_1.DEFAULT_PATH_NAME),
        compilerOptions: {
            tsConfigPath: (0, core_1.join)(rootPath, 'tsconfig.app.json'),
        },
    };
    return (host) => {
        const nestFileExists = host.exists('nest.json');
        let nestCliFileExists = host.exists('nest-cli.json');
        if (!nestCliFileExists && !nestFileExists) {
            host.create('nest-cli.json', '{}');
            nestCliFileExists = true;
        }
        return updateJsonFile(host, nestCliFileExists ? 'nest-cli.json' : 'nest.json', (optionsFile) => {
            updateMainAppOptions(optionsFile, projectRoot, appName);
            if (!optionsFile.projects) {
                optionsFile.projects = {};
            }
            if (optionsFile.projects[projectName]) {
                throw new schematics_1.SchematicsException(`Project "${projectName}" exists in this workspace already.`);
            }
            optionsFile.projects[projectName] = project;
        });
    };
}
function updateMainAppOptions(optionsFile, projectRoot, appName) {
    if (optionsFile.monorepo) {
        return;
    }
    const rootFilePath = (0, core_1.join)(projectRoot, appName);
    const tsConfigPath = (0, core_1.join)(rootFilePath, 'tsconfig.app.json');
    optionsFile.monorepo = true;
    optionsFile.root = rootFilePath;
    optionsFile.sourceRoot = (0, core_1.join)(projectRoot, appName, optionsFile.sourceRoot || defaults_1.DEFAULT_PATH_NAME);
    if (!optionsFile.compilerOptions) {
        optionsFile.compilerOptions = {};
    }
    optionsFile.compilerOptions.webpack = true;
    optionsFile.compilerOptions.tsConfigPath = tsConfigPath;
    if (!optionsFile.projects) {
        optionsFile.projects = {};
    }
    optionsFile.projects[appName] = {
        type: defaults_1.PROJECT_TYPE.APPLICATION,
        root: rootFilePath,
        entryFile: optionsFile.entryFile || 'main',
        sourceRoot: (0, core_1.join)(rootFilePath, defaults_1.DEFAULT_PATH_NAME),
        compilerOptions: {
            tsConfigPath,
        },
    };
}
function generateWorkspace(options, appName) {
    const path = (0, core_1.join)(options.path, appName);
    return (0, schematics_1.apply)((0, schematics_1.url)((0, core_1.join)('./workspace', options.language)), [
        (0, schematics_1.template)({
            ...core_1.strings,
            ...options,
            name: appName,
        }),
        (0, schematics_1.move)(path),
    ]);
}
function generate(options) {
    const path = (0, core_1.join)(options.path, options.name);
    return (0, schematics_1.apply)((0, schematics_1.url)((0, core_1.join)('./files', options.language)), [
        (0, schematics_1.template)({
            ...core_1.strings,
            ...options,
        }),
        (0, schematics_1.move)(path),
    ]);
}
