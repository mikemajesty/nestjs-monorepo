"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeRelPath = void 0;
function normalizeRelPath(input) {
    const output = input.replace(/\/\/+/g, '/');
    return output;
}
exports.normalizeRelPath = normalizeRelPath;
