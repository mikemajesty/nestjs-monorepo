/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { JsonValue, Path, PathFragment } from '@angular-devkit/core';
import { Action } from './action';
export declare enum MergeStrategy {
    AllowOverwriteConflict = 2,
    AllowCreationConflict = 4,
    AllowDeleteConflict = 8,
    Default = 0,
    Error = 1,
    ContentOnly = 2,
    Overwrite = 14
}
export declare const FileVisitorCancelToken: symbol;
export type FileVisitor = FilePredicate<void>;
export interface FileEntry {
    readonly path: Path;
    readonly content: Buffer;
}
export interface DirEntry {
    readonly parent: DirEntry | null;
    readonly path: Path;
    readonly subdirs: PathFragment[];
    readonly subfiles: PathFragment[];
    dir(name: PathFragment): DirEntry;
    file(name: PathFragment): FileEntry | null;
    visit(visitor: FileVisitor): void;
}
export interface FilePredicate<T> {
    (path: Path, entry?: Readonly<FileEntry> | null): T;
}
export declare const TreeSymbol: symbol;
export interface Tree {
    branch(): Tree;
    merge(other: Tree, strategy?: MergeStrategy): void;
    readonly root: DirEntry;
    read(path: string): Buffer | null;
    /**
     * Reads a file from the Tree as a UTF-8 encoded text file.
     *
     * @param path The path of the file to read.
     * @returns A string containing the contents of the file.
     * @throws {@link FileDoesNotExistException} if the file is not found.
     * @throws An error if the file contains invalid UTF-8 characters.
     */
    readText(path: string): string;
    /**
     * Reads and parses a file from the Tree as a UTF-8 encoded JSON file.
     * Supports parsing JSON (RFC 8259) with the following extensions:
     * * Single-line and multi-line JavaScript comments
     * * Trailing commas within objects and arrays
     *
     * @param path The path of the file to read.
     * @returns A JsonValue containing the parsed contents of the file.
     * @throws {@link FileDoesNotExistException} if the file is not found.
     * @throws An error if the file contains invalid UTF-8 characters.
     * @throws An error if the file contains malformed JSON.
     */
    readJson(path: string): JsonValue;
    exists(path: string): boolean;
    get(path: string): FileEntry | null;
    getDir(path: string): DirEntry;
    visit(visitor: FileVisitor): void;
    overwrite(path: string, content: Buffer | string): void;
    beginUpdate(path: string): UpdateRecorder;
    commitUpdate(record: UpdateRecorder): void;
    create(path: string, content: Buffer | string): void;
    delete(path: string): void;
    rename(from: string, to: string): void;
    apply(action: Action, strategy?: MergeStrategy): void;
    readonly actions: Action[];
}
export interface UpdateRecorder {
    insertLeft(index: number, content: Buffer | string): UpdateRecorder;
    insertRight(index: number, content: Buffer | string): UpdateRecorder;
    remove(index: number, length: number): UpdateRecorder;
}
