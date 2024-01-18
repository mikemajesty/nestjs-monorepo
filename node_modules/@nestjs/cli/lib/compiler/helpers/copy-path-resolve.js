"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyPathResolve = void 0;
const path = require("path");
/**
 * Helper function for returning a copy destination filename
 *
 * @description used in `assets-manager.ts` (copy from `copyfiles`)
 * @see https://github.com/calvinmetcalf/copyfiles/blob/master/index.js#L22
 */
function copyPathResolve(filePath, outDir, up) {
    return path.join(outDir, dealWith(filePath, up));
}
exports.copyPathResolve = copyPathResolve;
function dealWith(inPath, up) {
    if (!up) {
        return inPath;
    }
    if (depth(inPath) < up) {
        throw new Error('cant go up that far');
    }
    return path.join(...path.normalize(inPath).split(path.sep).slice(up));
}
function depth(string) {
    return path.normalize(string).split(path.sep).length - 1;
}
