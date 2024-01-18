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
// https://sonarsource.github.io/rspec/#/rspec/S1192
const docs_url_1 = require("../utils/docs-url");
const locations_1 = require("../utils/locations");
// Number of times a literal must be duplicated to trigger an issue
const DEFAULT_THRESHOLD = 3;
const DEFAULT_IGNORE_STRINGS = 'application/json';
const MIN_LENGTH = 10;
const NO_SEPARATOR_REGEXP = /^\w*$/;
const EXCLUDED_CONTEXTS = [
    'ImportDeclaration',
    'ImportExpression',
    'JSXAttribute',
    'ExportAllDeclaration',
    'ExportNamedDeclaration',
];
const message = 'Define a constant instead of duplicating this literal {{times}} times.';
const rule = {
    meta: {
        messages: {
            defineConstant: message,
            sonarRuntime: '{{sonarRuntimeData}}',
        },
        type: 'suggestion',
        docs: {
            description: 'String literals should not be duplicated',
            recommended: 'error',
            url: (0, docs_url_1.default)(__filename),
        },
        schema: [
            {
                type: 'object',
                properties: {
                    threshold: { type: 'integer', minimum: 2 },
                    ignoreStrings: { type: 'string', default: DEFAULT_IGNORE_STRINGS },
                },
            },
            { enum: ['sonar-runtime'] /* internal parameter for rules having secondary locations */ },
        ],
    },
    create(context) {
        const literalsByValue = new Map();
        const { threshold, ignoreStrings } = extractOptions(context);
        const whitelist = ignoreStrings.split(',');
        return {
            Literal: (node) => {
                const literal = node;
                const { parent } = literal;
                if (typeof literal.value === 'string' &&
                    parent &&
                    !['ExpressionStatement', 'TSLiteralType'].includes(parent.type)) {
                    const stringContent = literal.value.trim();
                    if (!whitelist.includes(literal.value) &&
                        !isExcludedByUsageContext(context, literal) &&
                        stringContent.length >= MIN_LENGTH &&
                        !stringContent.match(NO_SEPARATOR_REGEXP)) {
                        const sameStringLiterals = literalsByValue.get(stringContent) || [];
                        sameStringLiterals.push(literal);
                        literalsByValue.set(stringContent, sameStringLiterals);
                    }
                }
            },
            'Program:exit'() {
                literalsByValue.forEach(literals => {
                    if (literals.length >= threshold) {
                        const [primaryNode, ...secondaryNodes] = literals;
                        const secondaryIssues = secondaryNodes.map(node => (0, locations_1.issueLocation)(node.loc, node.loc, 'Duplication'));
                        (0, locations_1.report)(context, {
                            messageId: 'defineConstant',
                            node: primaryNode,
                            data: { times: literals.length.toString() },
                        }, secondaryIssues, message);
                    }
                });
            },
        };
    },
};
function isExcludedByUsageContext(context, literal) {
    const parent = literal.parent;
    const parentType = parent.type;
    return (EXCLUDED_CONTEXTS.includes(parentType) ||
        isRequireContext(parent, context) ||
        isObjectPropertyKey(parent, literal));
}
function isRequireContext(parent, context) {
    return (parent.type === 'CallExpression' && context.getSourceCode().getText(parent.callee) === 'require');
}
function isObjectPropertyKey(parent, literal) {
    return parent.type === 'Property' && parent.key === literal;
}
function extractOptions(context) {
    let threshold = DEFAULT_THRESHOLD;
    let ignoreStrings = DEFAULT_IGNORE_STRINGS;
    const options = context.options[0];
    if (typeof options?.threshold === 'number') {
        threshold = options.threshold;
    }
    if (typeof options?.ignoreStrings === 'string') {
        ignoreStrings = options.ignoreStrings;
    }
    return { threshold, ignoreStrings };
}
module.exports = rule;
//# sourceMappingURL=no-duplicate-string.js.map