"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathIsFileException = exports.PathIsDirectoryException = exports.FileAlreadyExistException = exports.FileDoesNotExistException = exports.UnknownException = exports.BaseException = void 0;
class BaseException extends Error {
    constructor(message = '') {
        super(message);
    }
}
exports.BaseException = BaseException;
class UnknownException extends BaseException {
    constructor(message) {
        super(message);
    }
}
exports.UnknownException = UnknownException;
// Exceptions
class FileDoesNotExistException extends BaseException {
    constructor(path) {
        super(`Path "${path}" does not exist.`);
    }
}
exports.FileDoesNotExistException = FileDoesNotExistException;
class FileAlreadyExistException extends BaseException {
    constructor(path) {
        super(`Path "${path}" already exist.`);
    }
}
exports.FileAlreadyExistException = FileAlreadyExistException;
class PathIsDirectoryException extends BaseException {
    constructor(path) {
        super(`Path "${path}" is a directory.`);
    }
}
exports.PathIsDirectoryException = PathIsDirectoryException;
class PathIsFileException extends BaseException {
    constructor(path) {
        super(`Path "${path}" is a file.`);
    }
}
exports.PathIsFileException = PathIsFileException;
