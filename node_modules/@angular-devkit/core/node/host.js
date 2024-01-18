"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeJsSyncHost = exports.NodeJsAsyncHost = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const rxjs_1 = require("rxjs");
const src_1 = require("../src");
async function exists(path) {
    try {
        await node_fs_1.promises.access(path, node_fs_1.constants.F_OK);
        return true;
    }
    catch {
        return false;
    }
}
// This will only be initialized if the watch() method is called.
// Otherwise chokidar appears only in type positions, and shouldn't be referenced
// in the JavaScript output.
let FSWatcher;
function loadFSWatcher() {
    if (!FSWatcher) {
        try {
            FSWatcher = require('chokidar').FSWatcher;
        }
        catch (e) {
            if (e.code !== 'MODULE_NOT_FOUND') {
                throw new Error('As of angular-devkit version 8.0, the "chokidar" package ' +
                    'must be installed in order to use watch() features.');
            }
            throw e;
        }
    }
}
/**
 * An implementation of the Virtual FS using Node as the background. There are two versions; one
 * synchronous and one asynchronous.
 */
class NodeJsAsyncHost {
    get capabilities() {
        return { synchronous: false };
    }
    write(path, content) {
        return (0, rxjs_1.from)(node_fs_1.promises.mkdir((0, src_1.getSystemPath)((0, src_1.dirname)(path)), { recursive: true })).pipe((0, rxjs_1.mergeMap)(() => node_fs_1.promises.writeFile((0, src_1.getSystemPath)(path), new Uint8Array(content))));
    }
    read(path) {
        return (0, rxjs_1.from)(node_fs_1.promises.readFile((0, src_1.getSystemPath)(path))).pipe((0, rxjs_1.map)((buffer) => new Uint8Array(buffer).buffer));
    }
    delete(path) {
        return (0, rxjs_1.from)(node_fs_1.promises.rm((0, src_1.getSystemPath)(path), { force: true, recursive: true, maxRetries: 3 }));
    }
    rename(from, to) {
        return (0, rxjs_1.from)(node_fs_1.promises.rename((0, src_1.getSystemPath)(from), (0, src_1.getSystemPath)(to)));
    }
    list(path) {
        return (0, rxjs_1.from)(node_fs_1.promises.readdir((0, src_1.getSystemPath)(path))).pipe((0, rxjs_1.map)((names) => names.map((name) => (0, src_1.fragment)(name))));
    }
    exists(path) {
        return (0, rxjs_1.from)(exists((0, src_1.getSystemPath)(path)));
    }
    isDirectory(path) {
        return this.stat(path).pipe((0, rxjs_1.map)((stat) => stat.isDirectory()));
    }
    isFile(path) {
        return this.stat(path).pipe((0, rxjs_1.map)((stat) => stat.isFile()));
    }
    // Some hosts may not support stat.
    stat(path) {
        return (0, rxjs_1.from)(node_fs_1.promises.stat((0, src_1.getSystemPath)(path)));
    }
    // Some hosts may not support watching.
    watch(path, _options) {
        return new rxjs_1.Observable((obs) => {
            loadFSWatcher();
            const watcher = new FSWatcher({ persistent: true });
            watcher.add((0, src_1.getSystemPath)(path));
            watcher
                .on('change', (path) => {
                obs.next({
                    path: (0, src_1.normalize)(path),
                    time: new Date(),
                    type: 0 /* virtualFs.HostWatchEventType.Changed */,
                });
            })
                .on('add', (path) => {
                obs.next({
                    path: (0, src_1.normalize)(path),
                    time: new Date(),
                    type: 1 /* virtualFs.HostWatchEventType.Created */,
                });
            })
                .on('unlink', (path) => {
                obs.next({
                    path: (0, src_1.normalize)(path),
                    time: new Date(),
                    type: 2 /* virtualFs.HostWatchEventType.Deleted */,
                });
            });
            return () => {
                void watcher.close();
            };
        }).pipe((0, rxjs_1.publish)(), (0, rxjs_1.refCount)());
    }
}
exports.NodeJsAsyncHost = NodeJsAsyncHost;
/**
 * An implementation of the Virtual FS using Node as the backend, synchronously.
 */
class NodeJsSyncHost {
    get capabilities() {
        return { synchronous: true };
    }
    write(path, content) {
        return new rxjs_1.Observable((obs) => {
            (0, node_fs_1.mkdirSync)((0, src_1.getSystemPath)((0, src_1.dirname)(path)), { recursive: true });
            (0, node_fs_1.writeFileSync)((0, src_1.getSystemPath)(path), new Uint8Array(content));
            obs.next();
            obs.complete();
        });
    }
    read(path) {
        return new rxjs_1.Observable((obs) => {
            const buffer = (0, node_fs_1.readFileSync)((0, src_1.getSystemPath)(path));
            obs.next(new Uint8Array(buffer).buffer);
            obs.complete();
        });
    }
    delete(path) {
        return new rxjs_1.Observable((obs) => {
            (0, node_fs_1.rmSync)((0, src_1.getSystemPath)(path), { force: true, recursive: true, maxRetries: 3 });
            obs.complete();
        });
    }
    rename(from, to) {
        return new rxjs_1.Observable((obs) => {
            const toSystemPath = (0, src_1.getSystemPath)(to);
            (0, node_fs_1.mkdirSync)((0, node_path_1.dirname)(toSystemPath), { recursive: true });
            (0, node_fs_1.renameSync)((0, src_1.getSystemPath)(from), toSystemPath);
            obs.next();
            obs.complete();
        });
    }
    list(path) {
        return new rxjs_1.Observable((obs) => {
            const names = (0, node_fs_1.readdirSync)((0, src_1.getSystemPath)(path));
            obs.next(names.map((name) => (0, src_1.fragment)(name)));
            obs.complete();
        });
    }
    exists(path) {
        return new rxjs_1.Observable((obs) => {
            obs.next((0, node_fs_1.existsSync)((0, src_1.getSystemPath)(path)));
            obs.complete();
        });
    }
    isDirectory(path) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.stat(path).pipe((0, rxjs_1.map)((stat) => stat.isDirectory()));
    }
    isFile(path) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.stat(path).pipe((0, rxjs_1.map)((stat) => stat.isFile()));
    }
    // Some hosts may not support stat.
    stat(path) {
        return new rxjs_1.Observable((obs) => {
            obs.next((0, node_fs_1.statSync)((0, src_1.getSystemPath)(path)));
            obs.complete();
        });
    }
    // Some hosts may not support watching.
    watch(path, _options) {
        return new rxjs_1.Observable((obs) => {
            loadFSWatcher();
            const watcher = new FSWatcher({ persistent: false });
            watcher.add((0, src_1.getSystemPath)(path));
            watcher
                .on('change', (path) => {
                obs.next({
                    path: (0, src_1.normalize)(path),
                    time: new Date(),
                    type: 0 /* virtualFs.HostWatchEventType.Changed */,
                });
            })
                .on('add', (path) => {
                obs.next({
                    path: (0, src_1.normalize)(path),
                    time: new Date(),
                    type: 1 /* virtualFs.HostWatchEventType.Created */,
                });
            })
                .on('unlink', (path) => {
                obs.next({
                    path: (0, src_1.normalize)(path),
                    time: new Date(),
                    type: 2 /* virtualFs.HostWatchEventType.Deleted */,
                });
            });
            return () => {
                void watcher.close();
            };
        }).pipe((0, rxjs_1.publish)(), (0, rxjs_1.refCount)());
    }
}
exports.NodeJsSyncHost = NodeJsSyncHost;
