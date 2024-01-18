"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultTsconfigPath = void 0;
const fs = require("fs");
const path_1 = require("path");
const TSCONFIG_BUILD_JSON = 'tsconfig.build.json';
const TSCONFIG_JSON = 'tsconfig.json';
function getDefaultTsconfigPath() {
    return fs.existsSync((0, path_1.join)(process.cwd(), TSCONFIG_BUILD_JSON))
        ? TSCONFIG_BUILD_JSON
        : TSCONFIG_JSON;
}
exports.getDefaultTsconfigPath = getDefaultTsconfigPath;
