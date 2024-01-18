"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePath = void 0;
const pathLib = require("path");
function resolvePath(path) {
    return path ? pathLib.resolve(path) : path;
}
exports.resolvePath = resolvePath;
