/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { JsonArray, JsonObject, JsonValue } from '../../json';
export type ChangeListener = (path: string[], newValue: JsonValue | undefined) => void;
export declare function createVirtualAstObject<T extends object = JsonObject>(root: JsonObject | JsonArray, options?: {
    exclude?: string[];
    include?: string[];
    listener?: ChangeListener;
}): T;
