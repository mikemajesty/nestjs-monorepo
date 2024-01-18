"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBuffer = exports.UpdateBufferBase = exports.IndexOutOfBoundException = void 0;
const core_1 = require("@angular-devkit/core");
const magic_string_1 = __importDefault(require("magic-string"));
const node_util_1 = require("node:util");
class IndexOutOfBoundException extends core_1.BaseException {
    constructor(index, min, max = Infinity) {
        super(`Index ${index} outside of range [${min}, ${max}].`);
    }
}
exports.IndexOutOfBoundException = IndexOutOfBoundException;
/**
 * Base class for an update buffer implementation that allows buffers to be inserted to the _right
 * or _left, or deleted, while keeping indices to the original buffer.
 */
class UpdateBufferBase {
    _originalContent;
    constructor(_originalContent) {
        this._originalContent = _originalContent;
    }
    /**
     * Creates an UpdateBufferBase instance.
     *
     * @param contentPath The path of the update buffer instance.
     * @param originalContent The original content of the update buffer instance.
     * @returns An UpdateBufferBase instance.
     */
    static create(contentPath, originalContent) {
        try {
            // We only support utf8 encoding.
            new node_util_1.TextDecoder('utf8', { fatal: true }).decode(originalContent);
            return new UpdateBuffer(originalContent);
        }
        catch (e) {
            if (e instanceof TypeError) {
                throw new Error(`Failed to decode "${contentPath}" as UTF-8 text.`);
            }
            throw e;
        }
    }
}
exports.UpdateBufferBase = UpdateBufferBase;
/**
 * An utility class that allows buffers to be inserted to the _right or _left, or deleted, while
 * keeping indices to the original buffer.
 */
class UpdateBuffer extends UpdateBufferBase {
    _mutatableContent = new magic_string_1.default(this._originalContent.toString());
    _assertIndex(index) {
        if (index < 0 || index > this._originalContent.length) {
            throw new IndexOutOfBoundException(index, 0, this._originalContent.length);
        }
    }
    get length() {
        return this._mutatableContent.length();
    }
    get original() {
        return this._originalContent;
    }
    toString() {
        return this._mutatableContent.toString();
    }
    generate() {
        return Buffer.from(this.toString());
    }
    insertLeft(index, content) {
        this._assertIndex(index);
        this._mutatableContent.appendLeft(index, content.toString());
    }
    insertRight(index, content) {
        this._assertIndex(index);
        this._mutatableContent.appendRight(index, content.toString());
    }
    remove(index, length) {
        this._assertIndex(index);
        this._mutatableContent.remove(index, index + length);
    }
}
exports.UpdateBuffer = UpdateBuffer;
