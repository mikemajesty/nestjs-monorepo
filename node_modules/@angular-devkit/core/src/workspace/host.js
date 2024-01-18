"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkspaceHost = void 0;
const rxjs_1 = require("rxjs");
const virtual_fs_1 = require("../virtual-fs");
function createWorkspaceHost(host) {
    const workspaceHost = {
        async readFile(path) {
            const data = await (0, rxjs_1.lastValueFrom)(host.read((0, virtual_fs_1.normalize)(path)));
            return virtual_fs_1.virtualFs.fileBufferToString(data);
        },
        async writeFile(path, data) {
            return (0, rxjs_1.lastValueFrom)(host.write((0, virtual_fs_1.normalize)(path), virtual_fs_1.virtualFs.stringToFileBuffer(data)));
        },
        async isDirectory(path) {
            try {
                return await (0, rxjs_1.lastValueFrom)(host.isDirectory((0, virtual_fs_1.normalize)(path)));
            }
            catch {
                // some hosts throw if path does not exist
                return false;
            }
        },
        async isFile(path) {
            try {
                return await (0, rxjs_1.lastValueFrom)(host.isFile((0, virtual_fs_1.normalize)(path)));
            }
            catch {
                // some hosts throw if path does not exist
                return false;
            }
        },
    };
    return workspaceHost;
}
exports.createWorkspaceHost = createWorkspaceHost;
