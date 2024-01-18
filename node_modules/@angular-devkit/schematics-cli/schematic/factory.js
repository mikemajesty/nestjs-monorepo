"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
function default_1(options) {
    const schematicsVersion = require('@angular-devkit/schematics/package.json').version;
    const coreVersion = require('@angular-devkit/core/package.json').version;
    return (_, context) => {
        context.addTask(new tasks_1.NodePackageInstallTask(options.name));
        return (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.partitionApplyMerge)((p) => !/\/src\/.*?\/files\//.test(p), (0, schematics_1.template)({
                ...options,
                coreVersion,
                schematicsVersion,
                dot: '.',
                dasherize: core_1.strings.dasherize,
            })),
            (0, schematics_1.move)(options.name),
        ]));
    };
}
exports.default = default_1;
