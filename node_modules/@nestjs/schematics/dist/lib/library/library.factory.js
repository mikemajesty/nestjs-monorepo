"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const jsonc_parser_1 = require("jsonc-parser");
const formatting_1 = require("../../utils/formatting");
const defaults_1 = require("../defaults");
const readers_1 = require("../readers");
function main(options) {
    options = transform(options);
    return (0, schematics_1.chain)([
        addLibraryToCliOptions(options.path, options.name),
        updatePackageJson(options),
        updateJestEndToEnd(options),
        updateTsConfig(options.name, options.prefix, options.path),
        (0, schematics_1.branchAndMerge)((0, schematics_1.mergeWith)(generate(options))),
    ]);
}
exports.main = main;
function getDefaultLibraryPrefix(defaultLibraryPrefix = '@app') {
    const fileSystemReader = new readers_1.FileSystemReader(process.cwd());
    const content = fileSystemReader.readSyncAnyOf([
        'nest-cli.json',
        '.nestcli.json',
        '.nest-cli.json',
        'nest.json',
    ]);
    try {
        const nestJson = JSON.parse(content || '{}');
        if (nestJson.hasOwnProperty('defaultLibraryPrefix')) {
            return nestJson['defaultLibraryPrefix'];
        }
    }
    catch (e) {
    }
    return defaultLibraryPrefix;
}
function transform(options) {
    const target = Object.assign({}, options);
    const defaultSourceRoot = options.rootDir !== undefined ? options.rootDir : defaults_1.DEFAULT_LIB_PATH;
    if (!target.name) {
        throw new schematics_1.SchematicsException('Option (name) is required.');
    }
    target.language = !!target.language ? target.language : defaults_1.DEFAULT_LANGUAGE;
    target.name = (0, formatting_1.normalizeToKebabOrSnakeCase)(target.name);
    target.path =
        target.path !== undefined
            ? (0, core_1.join)((0, core_1.normalize)(defaultSourceRoot), target.path)
            : (0, core_1.normalize)(defaultSourceRoot);
    target.prefix = target.prefix || getDefaultLibraryPrefix();
    return target;
}
function updatePackageJson(options) {
    return (host) => {
        if (!host.exists('package.json')) {
            return host;
        }
        const distRoot = (0, core_1.join)(options.path, options.name, 'src');
        const packageKey = options.prefix
            ? options.prefix + '/' + options.name
            : options.name;
        return updateJsonFile(host, 'package.json', (packageJson) => {
            updateNpmScripts(packageJson.scripts, options);
            updateJestConfig(packageJson.jest, options, packageKey, distRoot);
        });
    };
}
function updateJestConfig(jestOptions, options, packageKey, distRoot) {
    if (!jestOptions) {
        return;
    }
    if (jestOptions.rootDir === defaults_1.DEFAULT_PATH_NAME) {
        jestOptions.rootDir = '.';
        jestOptions.coverageDirectory = './coverage';
    }
    const defaultSourceRoot = options.rootDir !== undefined ? options.rootDir : defaults_1.DEFAULT_LIB_PATH;
    const jestSourceRoot = `<rootDir>/${defaultSourceRoot}/`;
    if (!jestOptions.roots) {
        jestOptions.roots = ['<rootDir>/src/', jestSourceRoot];
    }
    else if (jestOptions.roots.indexOf(jestSourceRoot) < 0) {
        jestOptions.roots.push(jestSourceRoot);
    }
    if (!jestOptions.moduleNameMapper) {
        jestOptions.moduleNameMapper = {};
    }
    const packageKeyRegex = '^' + packageKey + '(|/.*)$';
    const packageRoot = (0, core_1.join)('<rootDir>', distRoot);
    jestOptions.moduleNameMapper[packageKeyRegex] = (0, core_1.join)(packageRoot, '$1');
}
function updateNpmScripts(scripts, options) {
    if (!scripts) {
        return;
    }
    const defaultFormatScriptName = 'format';
    if (!scripts[defaultFormatScriptName]) {
        return;
    }
    if (scripts[defaultFormatScriptName] &&
        scripts[defaultFormatScriptName].indexOf(defaults_1.DEFAULT_PATH_NAME) >= 0) {
        const defaultSourceRoot = options.rootDir !== undefined ? options.rootDir : defaults_1.DEFAULT_LIB_PATH;
        scripts[defaultFormatScriptName] = `prettier --write "src/**/*.ts" "test/**/*.ts" "${defaultSourceRoot}/**/*.ts"`;
    }
}
function updateJestEndToEnd(options) {
    return (host) => {
        const pathToFile = (0, core_1.join)('test', 'jest-e2e.json');
        if (!host.exists(pathToFile)) {
            return host;
        }
        const distRoot = (0, core_1.join)(options.path, options.name, 'src');
        const packageKey = options.prefix
            ? options.prefix + '/' + options.name
            : options.name;
        return updateJsonFile(host, pathToFile, (jestOptions) => {
            if (!jestOptions.moduleNameMapper) {
                jestOptions.moduleNameMapper = {};
            }
            const deepPackagePath = packageKey + '/(.*)';
            const packageRoot = '<rootDir>/../' + distRoot;
            jestOptions.moduleNameMapper[deepPackagePath] = packageRoot + '/$1';
            jestOptions.moduleNameMapper[packageKey] = packageRoot;
        });
    };
}
function updateJsonFile(host, path, callback) {
    const source = host.read(path);
    if (source) {
        const sourceText = source.toString('utf-8');
        const json = (0, jsonc_parser_1.parse)(sourceText);
        callback(json);
        host.overwrite(path, JSON.stringify(json, null, 2));
    }
    return host;
}
function updateTsConfig(packageName, packagePrefix, root) {
    return (host) => {
        if (!host.exists('tsconfig.json')) {
            return host;
        }
        const distRoot = (0, core_1.join)(root, packageName, 'src');
        const packageKey = packagePrefix
            ? packagePrefix + '/' + packageName
            : packageName;
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
            if (!tsconfig.compilerOptions.paths[packageKey]) {
                tsconfig.compilerOptions.paths[packageKey] = [];
            }
            tsconfig.compilerOptions.paths[packageKey].push(distRoot);
            const deepPackagePath = packageKey + '/*';
            if (!tsconfig.compilerOptions.paths[deepPackagePath]) {
                tsconfig.compilerOptions.paths[deepPackagePath] = [];
            }
            tsconfig.compilerOptions.paths[deepPackagePath].push(distRoot + '/*');
        });
    };
}
function addLibraryToCliOptions(projectRoot, projectName) {
    const rootPath = (0, core_1.join)(projectRoot, projectName);
    const project = {
        type: defaults_1.PROJECT_TYPE.LIBRARY,
        root: rootPath,
        entryFile: 'index',
        sourceRoot: (0, core_1.join)(rootPath, 'src'),
        compilerOptions: {
            tsConfigPath: (0, core_1.join)(rootPath, 'tsconfig.lib.json'),
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
            if (!optionsFile.projects) {
                optionsFile.projects = {};
            }
            if (!optionsFile.compilerOptions) {
                optionsFile.compilerOptions = {};
            }
            if (optionsFile.compilerOptions.webpack === undefined) {
                optionsFile.compilerOptions.webpack = true;
            }
            if (optionsFile.projects[projectName]) {
                throw new schematics_1.SchematicsException(`Project "${projectName}" exists in this workspace already.`);
            }
            optionsFile.projects[projectName] = project;
        });
    };
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
