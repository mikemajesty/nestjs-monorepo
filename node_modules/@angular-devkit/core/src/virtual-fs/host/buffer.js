"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileBuffer = exports.fileBufferToString = exports.stringToFileBuffer = void 0;
const node_util_1 = require("node:util");
function stringToFileBuffer(str) {
    return new node_util_1.TextEncoder().encode(str).buffer;
}
exports.stringToFileBuffer = stringToFileBuffer;
function fileBufferToString(fileBuffer) {
    if (fileBuffer.toString.length === 1) {
        return fileBuffer.toString('utf-8');
    }
    return new node_util_1.TextDecoder('utf-8').decode(new Uint8Array(fileBuffer));
}
exports.fileBufferToString = fileBufferToString;
/** @deprecated use `stringToFileBuffer` instead. */
const fileBuffer = (strings, ...values) => {
    return stringToFileBuffer(String.raw(strings, ...values));
};
exports.fileBuffer = fileBuffer;
