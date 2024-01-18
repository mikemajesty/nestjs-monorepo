"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageJsonDependency = exports.addPackageJsonDependency = exports.NodeDependencyType = void 0;
const json_file_util_1 = require("./json-file.util");
const PKG_JSON_PATH = '/package.json';
var NodeDependencyType;
(function (NodeDependencyType) {
    NodeDependencyType["Default"] = "dependencies";
    NodeDependencyType["Dev"] = "devDependencies";
    NodeDependencyType["Peer"] = "peerDependencies";
    NodeDependencyType["Optional"] = "optionalDependencies";
})(NodeDependencyType || (exports.NodeDependencyType = NodeDependencyType = {}));
const ALL_DEPENDENCY_TYPE = [
    NodeDependencyType.Default,
    NodeDependencyType.Dev,
    NodeDependencyType.Optional,
    NodeDependencyType.Peer,
];
function addPackageJsonDependency(tree, dependency, pkgJsonPath = PKG_JSON_PATH) {
    const json = new json_file_util_1.JSONFile(tree, pkgJsonPath);
    const { overwrite, type, name, version } = dependency;
    const path = [type, name];
    if (overwrite || !json.get(path)) {
        json.modify(path, version);
    }
}
exports.addPackageJsonDependency = addPackageJsonDependency;
function getPackageJsonDependency(tree, name, pkgJsonPath = PKG_JSON_PATH) {
    const json = new json_file_util_1.JSONFile(tree, pkgJsonPath);
    for (const depType of ALL_DEPENDENCY_TYPE) {
        const version = json.get([depType, name]);
        if (typeof version === 'string') {
            return {
                type: depType,
                name: name,
                version,
            };
        }
    }
    return null;
}
exports.getPackageJsonDependency = getPackageJsonDependency;
