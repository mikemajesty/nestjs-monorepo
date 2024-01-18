"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSourceRoot = exports.isInRootDirectory = void 0;
const core_1 = require("@angular-devkit/core");
const defaults_1 = require("../lib/defaults");
function isInRootDirectory(host, extraFiles = []) {
    const files = ['nest-cli.json', 'nest.json'].concat(extraFiles || []);
    return files.map(file => host.exists(file)).some(isPresent => isPresent);
}
exports.isInRootDirectory = isInRootDirectory;
function mergeSourceRoot(options) {
    return (host) => {
        const isInRoot = isInRootDirectory(host, ['tsconfig.json', 'package.json']);
        if (!isInRoot) {
            return host;
        }
        const defaultSourceRoot = options.sourceRoot !== undefined ? options.sourceRoot : defaults_1.DEFAULT_PATH_NAME;
        options.path =
            options.path !== undefined
                ? (0, core_1.join)((0, core_1.normalize)(defaultSourceRoot), options.path)
                : (0, core_1.normalize)(defaultSourceRoot);
        return host;
    };
}
exports.mergeSourceRoot = mergeSourceRoot;
