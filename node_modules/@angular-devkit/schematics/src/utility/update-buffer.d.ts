/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BaseException } from '@angular-devkit/core';
import MagicString from 'magic-string';
export declare class IndexOutOfBoundException extends BaseException {
    constructor(index: number, min: number, max?: number);
}
/**
 * Base class for an update buffer implementation that allows buffers to be inserted to the _right
 * or _left, or deleted, while keeping indices to the original buffer.
 */
export declare abstract class UpdateBufferBase {
    protected _originalContent: Buffer;
    constructor(_originalContent: Buffer);
    abstract get length(): number;
    abstract get original(): Buffer;
    abstract toString(encoding?: string): string;
    abstract generate(): Buffer;
    abstract insertLeft(index: number, content: Buffer, assert?: boolean): void;
    abstract insertRight(index: number, content: Buffer, assert?: boolean): void;
    abstract remove(index: number, length: number): void;
    /**
     * Creates an UpdateBufferBase instance.
     *
     * @param contentPath The path of the update buffer instance.
     * @param originalContent The original content of the update buffer instance.
     * @returns An UpdateBufferBase instance.
     */
    static create(contentPath: string, originalContent: Buffer): UpdateBufferBase;
}
/**
 * An utility class that allows buffers to be inserted to the _right or _left, or deleted, while
 * keeping indices to the original buffer.
 */
export declare class UpdateBuffer extends UpdateBufferBase {
    protected _mutatableContent: MagicString;
    protected _assertIndex(index: number): void;
    get length(): number;
    get original(): Buffer;
    toString(): string;
    generate(): Buffer;
    insertLeft(index: number, content: Buffer): void;
    insertRight(index: number, content: Buffer): void;
    remove(index: number, length: number): void;
}
