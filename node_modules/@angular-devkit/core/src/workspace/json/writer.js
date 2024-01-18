"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJsonWorkspace = void 0;
const jsonc_parser_1 = require("jsonc-parser");
const metadata_1 = require("./metadata");
async function writeJsonWorkspace(workspace, host, path, options = {}) {
    const metadata = workspace[metadata_1.JsonWorkspaceSymbol];
    if (metadata) {
        if (!metadata.hasChanges) {
            return;
        }
        // update existing JSON workspace
        const data = updateJsonWorkspace(metadata);
        return host.writeFile(path ?? metadata.filePath, data);
    }
    else {
        // serialize directly
        if (!path) {
            throw new Error('path option is required');
        }
        const obj = convertJsonWorkspace(workspace, options.schema);
        const data = JSON.stringify(obj, null, 2);
        return host.writeFile(path, data);
    }
}
exports.writeJsonWorkspace = writeJsonWorkspace;
function convertJsonWorkspace(workspace, schema) {
    const obj = {
        $schema: schema || './node_modules/@angular/cli/lib/config/schema.json',
        version: 1,
        ...workspace.extensions,
        ...(isEmpty(workspace.projects)
            ? {}
            : { projects: convertJsonProjectCollection(workspace.projects) }),
    };
    return obj;
}
function convertJsonProjectCollection(collection) {
    const projects = Object.create(null);
    for (const [projectName, project] of collection) {
        projects[projectName] = convertJsonProject(project);
    }
    return projects;
}
function convertJsonProject(project) {
    let targets;
    if (project.targets.size > 0) {
        targets = Object.create(null);
        for (const [targetName, target] of project.targets) {
            targets[targetName] = convertJsonTarget(target);
        }
    }
    const obj = {
        ...project.extensions,
        root: project.root,
        ...(project.sourceRoot === undefined ? {} : { sourceRoot: project.sourceRoot }),
        ...(project.prefix === undefined ? {} : { prefix: project.prefix }),
        ...(targets === undefined ? {} : { architect: targets }),
    };
    return obj;
}
function isEmpty(obj) {
    return obj === undefined || Object.keys(obj).length === 0;
}
function convertJsonTarget(target) {
    return {
        builder: target.builder,
        ...(isEmpty(target.options) ? {} : { options: target.options }),
        ...(isEmpty(target.configurations)
            ? {}
            : { configurations: target.configurations }),
        ...(target.defaultConfiguration === undefined
            ? {}
            : { defaultConfiguration: target.defaultConfiguration }),
    };
}
function convertJsonTargetCollection(collection) {
    const targets = Object.create(null);
    for (const [projectName, target] of collection) {
        targets[projectName] = convertJsonTarget(target);
    }
    return targets;
}
function normalizeValue(value, type) {
    if (value === undefined) {
        return undefined;
    }
    switch (type) {
        case 'project':
            return convertJsonProject(value);
        case 'projectcollection':
            const projects = convertJsonProjectCollection(value);
            return isEmpty(projects) ? undefined : projects;
        case 'target':
            return convertJsonTarget(value);
        case 'targetcollection':
            const targets = convertJsonTargetCollection(value);
            return isEmpty(targets) ? undefined : targets;
        default:
            return value;
    }
}
function updateJsonWorkspace(metadata) {
    let { raw: content } = metadata;
    const { changes, hasLegacyTargetsName } = metadata;
    for (const { jsonPath, value, type } of changes.values()) {
        // Determine which key to use if (architect or targets)
        if (hasLegacyTargetsName && jsonPath[2] === 'targets') {
            jsonPath[2] = 'architect';
        }
        // TODO: `modify` re-parses the content every time.
        // See: https://github.com/microsoft/node-jsonc-parser/blob/35d94cd71bd48f9784453b2439262c938e21d49b/src/impl/edit.ts#L18
        // Ideally this should accept a string or an AST to avoid the potentially expensive repeat parsing operation.
        const edits = (0, jsonc_parser_1.modify)(content, jsonPath, normalizeValue(value, type), {
            formattingOptions: {
                insertSpaces: true,
                tabSize: 2,
            },
        });
        content = (0, jsonc_parser_1.applyEdits)(content, edits);
    }
    return content;
}
