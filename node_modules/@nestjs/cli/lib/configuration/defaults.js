"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultGitIgnore = exports.defaultOutDir = exports.defaultWebpackConfigFilename = exports.defaultTsconfigFilename = exports.defaultConfiguration = void 0;
const get_default_tsconfig_path_1 = require("../utils/get-default-tsconfig-path");
exports.defaultConfiguration = {
    language: 'ts',
    sourceRoot: 'src',
    collection: '@nestjs/schematics',
    entryFile: 'main',
    exec: 'node',
    projects: {},
    monorepo: false,
    compilerOptions: {
        builder: {
            type: 'tsc',
            options: {
                configPath: (0, get_default_tsconfig_path_1.getDefaultTsconfigPath)(),
            },
        },
        webpack: false,
        plugins: [],
        assets: [],
        manualRestart: false,
    },
    generateOptions: {},
};
exports.defaultTsconfigFilename = (0, get_default_tsconfig_path_1.getDefaultTsconfigPath)();
exports.defaultWebpackConfigFilename = 'webpack.config.js';
exports.defaultOutDir = 'dist';
exports.defaultGitIgnore = `# compiled output
/dist
/node_modules

# Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store

# Tests
/coverage
/.nyc_output

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json`;
