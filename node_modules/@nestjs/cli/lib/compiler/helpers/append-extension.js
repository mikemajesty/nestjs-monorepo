"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendTsExtension = void 0;
const path_1 = require("path");
function appendTsExtension(path) {
    return (0, path_1.extname)(path) === '.ts' ? path : path + '.ts';
}
exports.appendTsExtension = appendTsExtension;
