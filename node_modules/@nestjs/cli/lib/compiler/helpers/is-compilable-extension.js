"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCompilableExtension = void 0;
const path_1 = require("path");
function isCompilableExtension(filename, allowedExtension) {
    const ext = (0, path_1.extname)(filename);
    return allowedExtension.includes(ext);
}
exports.isCompilableExtension = isCompilableExtension;
