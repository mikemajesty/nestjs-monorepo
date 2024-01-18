"use strict";
/*
 * eslint-plugin-sonarjs
 * Copyright (C) 2018-2021 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
// https://sonarsource.github.io/rspec/#/rspec/S3923
const nodes_1 = require("../utils/nodes");
const equivalence_1 = require("../utils/equivalence");
const conditions_1 = require("../utils/conditions");
const docs_url_1 = require("../utils/docs-url");
const rule = {
    meta: {
        messages: {
            removeOrEditConditionalStructure: "Remove this conditional structure or edit its code blocks so that they're not all the same.",
            returnsTheSameValue: 'This conditional operation returns the same value whether the condition is "true" or "false".',
        },
        schema: [],
        type: 'problem',
        docs: {
            description: 'All branches in a conditional structure should not have exactly the same implementation',
            recommended: 'error',
            url: (0, docs_url_1.default)(__filename),
        },
    },
    create(context) {
        return {
            IfStatement(node) {
                const ifStmt = node;
                // don't visit `else if` statements
                if (!(0, nodes_1.isIfStatement)(node.parent)) {
                    const { branches, endsWithElse } = (0, conditions_1.collectIfBranches)(ifStmt);
                    if (endsWithElse && allDuplicated(branches)) {
                        context.report({ messageId: 'removeOrEditConditionalStructure', node: ifStmt });
                    }
                }
            },
            SwitchStatement(node) {
                const switchStmt = node;
                const { branches, endsWithDefault } = (0, conditions_1.collectSwitchBranches)(switchStmt);
                if (endsWithDefault && allDuplicated(branches)) {
                    context.report({ messageId: 'removeOrEditConditionalStructure', node: switchStmt });
                }
            },
            ConditionalExpression(node) {
                const conditional = node;
                const branches = [conditional.consequent, conditional.alternate];
                if (allDuplicated(branches)) {
                    context.report({ messageId: 'returnsTheSameValue', node: conditional });
                }
            },
        };
        function allDuplicated(branches) {
            return (branches.length > 1 &&
                branches.slice(1).every((branch, index) => {
                    return (0, equivalence_1.areEquivalent)(branch, branches[index], context.getSourceCode());
                }));
        }
    },
};
module.exports = rule;
//# sourceMappingURL=no-all-duplicated-branches.js.map