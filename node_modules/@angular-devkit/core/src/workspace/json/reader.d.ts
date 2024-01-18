/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { WorkspaceDefinition } from '../definitions';
import { WorkspaceHost } from '../host';
export interface JsonWorkspaceOptions {
    allowedProjectExtensions?: string[];
    allowedWorkspaceExtensions?: string[];
}
export declare function readJsonWorkspace(path: string, host: WorkspaceHost, options?: JsonWorkspaceOptions): Promise<WorkspaceDefinition>;
