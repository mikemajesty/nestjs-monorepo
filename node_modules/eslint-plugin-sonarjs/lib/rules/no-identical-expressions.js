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
// https://sonarsource.github.io/rspec/#/rspec/S1764
const nodes_1 = require("../utils/nodes");
const equivalence_1 = require("../utils/equivalence");
const locations_1 = require("../utils/locations");
const docs_url_1 = require("../utils/docs-url");
const EQUALITY_OPERATOR_TOKEN_KINDS = new Set(['==', '===', '!=', '!==']);
// consider only binary expressions with these operators
const RELEVANT_OPERATOR_TOKEN_KINDS = new Set([
    '&&',
    '||',
    '/',
    '-',
    '<<',
    '>>',
    '<',
    '<=',
    '>',
    '>=',
]);
function hasRelevantOperator(node) {
    return (RELEVANT_OPERATOR_TOKEN_KINDS.has(node.operator) ||
        (EQUALITY_OPERATOR_TOKEN_KINDS.has(node.operator) && !hasIdentifierOperands(node)));
}
function hasIdentifierOperands(node) {
    return (0, nodes_1.isIdentifier)(node.left) && (0, nodes_1.isIdentifier)(node.right);
}
function isOneOntoOneShifting(node) {
    return (node.operator === '<<' &&
        (0, nodes_1.isLiteral)(node.left) &&
        (node.left.value === 1 || node.left.value === 1n));
}
const message = 'Correct one of the identical sub-expressions on both sides of operator "{{operator}}"';
const rule = {
    meta: {
        messages: {
            correctIdenticalSubExpressions: message,
            sonarRuntime: '{{sonarRuntimeData}}',
        },
        type: 'problem',
        docs: {
            description: 'Identical expressions should not be used on both sides of a binary operator',
            recommended: 'error',
            url: (0, docs_url_1.default)(__filename),
        },
        schema: [
            {
                // internal parameter
                enum: ['sonar-runtime'],
            },
        ],
    },
    create(context) {
        return {
            LogicalExpression(node) {
                check(node);
            },
            BinaryExpression(node) {
                check(node);
            },
        };
        function check(expr) {
            if (hasRelevantOperator(expr) &&
                !isOneOntoOneShifting(expr) &&
                (0, equivalence_1.areEquivalent)(expr.left, expr.right, context.getSourceCode())) {
                const secondaryLocations = [];
                if (expr.left.loc) {
                    secondaryLocations.push((0, locations_1.issueLocation)(expr.left.loc));
                }
                (0, locations_1.report)(context, {
                    messageId: 'correctIdenticalSubExpressions',
                    data: {
                        operator: expr.operator,
                    },
                    node: isSonarRuntime() ? expr.right : expr,
                }, secondaryLocations, message);
            }
        }
        function isSonarRuntime() {
            return context.options[context.options.length - 1] === 'sonar-runtime';
        }
    },
};
module.exports = rule;
//# sourceMappingURL=no-identical-expressions.js.map