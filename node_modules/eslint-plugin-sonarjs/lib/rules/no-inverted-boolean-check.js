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
// https://sonarsource.github.io/rspec/#/rspec/S1940
const nodes_1 = require("../utils/nodes");
const docs_url_1 = require("../utils/docs-url");
const invertedOperators = {
    '==': '!=',
    '!=': '==',
    '===': '!==',
    '!==': '===',
    '>': '<=',
    '<': '>=',
    '>=': '<',
    '<=': '>',
};
const rule = {
    meta: {
        messages: {
            useOppositeOperator: 'Use the opposite operator ({{invertedOperator}}) instead.',
            suggestOperationInversion: 'Invert inner operation (apply if NaN is not expected)',
        },
        schema: [],
        type: 'suggestion',
        docs: {
            description: 'Boolean checks should not be inverted',
            recommended: false,
            url: (0, docs_url_1.default)(__filename),
        },
        hasSuggestions: true,
        fixable: 'code',
    },
    create(context) {
        return {
            UnaryExpression: (node) => visitUnaryExpression(node, context),
        };
    },
};
function visitUnaryExpression(unaryExpression, context) {
    if (unaryExpression.operator === '!' && (0, nodes_1.isBinaryExpression)(unaryExpression.argument)) {
        const condition = unaryExpression.argument;
        const invertedOperator = invertedOperators[condition.operator];
        if (invertedOperator) {
            const left = context.getSourceCode().getText(condition.left);
            const right = context.getSourceCode().getText(condition.right);
            const [start, end] = unaryExpression.parent?.type === 'UnaryExpression' ? ['(', ')'] : ['', ''];
            context.report({
                messageId: 'useOppositeOperator',
                suggest: [
                    {
                        messageId: 'suggestOperationInversion',
                        fix: fixer => fixer.replaceText(unaryExpression, `${start}${left} ${invertedOperator} ${right}${end}`),
                    },
                ],
                data: { invertedOperator },
                node: unaryExpression,
            });
        }
    }
}
module.exports = rule;
//# sourceMappingURL=no-inverted-boolean-check.js.map