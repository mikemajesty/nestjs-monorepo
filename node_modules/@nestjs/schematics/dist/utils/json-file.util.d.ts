import { JsonValue } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
export type InsertionIndex = (properties: string[]) => number;
export type JSONPath = (string | number)[];
export declare class JSONFile {
    private readonly host;
    private readonly path;
    content: string;
    constructor(host: Tree, path: string);
    private _jsonAst;
    private get JsonAst();
    get(jsonPath: JSONPath): unknown;
    modify(jsonPath: JSONPath, value: JsonValue | undefined, insertInOrder?: InsertionIndex | false): void;
    remove(jsonPath: JSONPath): void;
}
