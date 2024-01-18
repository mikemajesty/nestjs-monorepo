/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { JSONPath, Node } from 'jsonc-parser';
import { JsonValue } from '../../json';
import { ProjectDefinition, TargetDefinition, WorkspaceDefinition } from '../definitions';
export declare const JsonWorkspaceSymbol: unique symbol;
export interface JsonWorkspaceDefinition extends WorkspaceDefinition {
    [JsonWorkspaceSymbol]: JsonWorkspaceMetadata;
}
interface ChangeValues {
    json: JsonValue;
    project: ProjectDefinition;
    target: TargetDefinition;
    projectcollection: Iterable<[string, ProjectDefinition]>;
    targetcollection: Iterable<[string, TargetDefinition]>;
}
export interface JsonChange {
    value?: unknown;
    type?: keyof ChangeValues;
    jsonPath: string[];
}
export declare class JsonWorkspaceMetadata {
    readonly filePath: string;
    private readonly ast;
    readonly raw: string;
    readonly changes: Map<string, JsonChange>;
    hasLegacyTargetsName: boolean;
    constructor(filePath: string, ast: Node, raw: string);
    get hasChanges(): boolean;
    get changeCount(): number;
    getNodeValueFromAst(path: JSONPath): unknown;
    findChangesForPath(path: string): JsonChange | undefined;
    addChange<T extends keyof ChangeValues = keyof ChangeValues>(jsonPath: string[], value: ChangeValues[T] | undefined, type?: T): void;
}
export {};
