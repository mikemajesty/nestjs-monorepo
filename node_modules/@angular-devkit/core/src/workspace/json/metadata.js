"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonWorkspaceMetadata = exports.JsonWorkspaceSymbol = void 0;
const jsonc_parser_1 = require("jsonc-parser");
exports.JsonWorkspaceSymbol = Symbol.for('@angular/core:workspace-json');
function escapeKey(key) {
    return key.replace('~', '~0').replace('/', '~1');
}
class JsonWorkspaceMetadata {
    filePath;
    ast;
    raw;
    changes = new Map();
    hasLegacyTargetsName = true;
    constructor(filePath, ast, raw) {
        this.filePath = filePath;
        this.ast = ast;
        this.raw = raw;
    }
    get hasChanges() {
        return this.changes.size > 0;
    }
    get changeCount() {
        return this.changes.size;
    }
    getNodeValueFromAst(path) {
        const node = (0, jsonc_parser_1.findNodeAtLocation)(this.ast, path);
        return node && (0, jsonc_parser_1.getNodeValue)(node);
    }
    findChangesForPath(path) {
        return this.changes.get(path);
    }
    addChange(jsonPath, value, type) {
        let currentPath = '';
        for (let index = 0; index < jsonPath.length - 1; index++) {
            currentPath = currentPath + '/' + escapeKey(jsonPath[index]);
            if (this.changes.has(currentPath)) {
                // Ignore changes on children as parent is updated.
                return;
            }
        }
        const pathKey = '/' + jsonPath.map((k) => escapeKey(k)).join('/');
        for (const key of this.changes.keys()) {
            if (key.startsWith(pathKey + '/')) {
                // changes on the same or child paths are redundant.
                this.changes.delete(key);
            }
        }
        this.changes.set(pathKey, { jsonPath, type, value });
    }
}
exports.JsonWorkspaceMetadata = JsonWorkspaceMetadata;
