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
// https://sonarsource.github.io/rspec/#/rspec/S4143
const equivalence_1 = require("../utils/equivalence");
const nodes_1 = require("../utils/nodes");
const locations_1 = require("../utils/locations");
const docs_url_1 = require("../utils/docs-url");
const message = 'Verify this is the index that was intended; "{{index}}" was already set on line {{line}}.';
const rule = {
    meta: {
        messages: {
            verifyIntendedIndex: message,
            sonarRuntime: '{{sonarRuntimeData}}',
        },
        type: 'problem',
        docs: {
            description: 'Collection elements should not be replaced unconditionally',
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
            SwitchCase(node) {
                const switchCase = node;
                checkStatements(switchCase.consequent);
            },
            BlockStatement(node) {
                const block = node;
                checkStatements(block.body);
            },
            Program(node) {
                const program = node;
                checkStatements(program.body);
            },
        };
        function checkStatements(statements) {
            const usedKeys = new Map();
            let collection;
            statements.forEach(statement => {
                const keyWriteUsage = getKeyWriteUsage(statement);
                if (keyWriteUsage) {
                    if (collection &&
                        !(0, equivalence_1.areEquivalent)(keyWriteUsage.collectionNode, collection, context.getSourceCode())) {
                        usedKeys.clear();
                    }
                    const sameKeyWriteUsage = usedKeys.get(keyWriteUsage.indexOrKey);
                    if (sameKeyWriteUsage && sameKeyWriteUsage.node.loc) {
                        const sameKeyWriteUsageLoc = sameKeyWriteUsage.node.loc;
                        const secondaryLocations = [
                            (0, locations_1.issueLocation)(sameKeyWriteUsageLoc, sameKeyWriteUsageLoc, 'Original value'),
                        ];
                        (0, locations_1.report)(context, {
                            node: keyWriteUsage.node,
                            messageId: 'verifyIntendedIndex',
                            data: {
                                index: keyWriteUsage.indexOrKey,
                                line: sameKeyWriteUsage.node.loc.start.line,
                            },
                        }, secondaryLocations, message);
                    }
                    usedKeys.set(keyWriteUsage.indexOrKey, keyWriteUsage);
                    collection = keyWriteUsage.collectionNode;
                }
                else {
                    usedKeys.clear();
                }
            });
        }
        function getKeyWriteUsage(node) {
            if ((0, nodes_1.isExpressionStatement)(node)) {
                return arrayKeyWriteUsage(node.expression) || mapOrSetKeyWriteUsage(node.expression);
            }
            return undefined;
        }
        function arrayKeyWriteUsage(node) {
            // a[b] = ...
            if (isSimpleAssignment(node) && (0, nodes_1.isMemberExpression)(node.left) && node.left.computed) {
                const { left, right } = node;
                const index = extractIndex(left.property);
                if (index !== undefined && !isUsed(left.object, right)) {
                    return {
                        collectionNode: left.object,
                        indexOrKey: index,
                        node,
                    };
                }
            }
            return undefined;
        }
        function mapOrSetKeyWriteUsage(node) {
            if ((0, nodes_1.isCallExpression)(node) && (0, nodes_1.isMemberExpression)(node.callee)) {
                const propertyAccess = node.callee;
                if ((0, nodes_1.isIdentifier)(propertyAccess.property)) {
                    const methodName = propertyAccess.property.name;
                    const addMethod = methodName === 'add' && node.arguments.length === 1;
                    const setMethod = methodName === 'set' && node.arguments.length === 2;
                    if (addMethod || setMethod) {
                        const key = extractIndex(node.arguments[0]);
                        if (key) {
                            return {
                                collectionNode: propertyAccess.object,
                                indexOrKey: key,
                                node,
                            };
                        }
                    }
                }
            }
            return undefined;
        }
        function extractIndex(node) {
            if ((0, nodes_1.isLiteral)(node)) {
                const { value } = node;
                return typeof value === 'number' || typeof value === 'string' ? String(value) : undefined;
            }
            else if ((0, nodes_1.isIdentifier)(node)) {
                return node.name;
            }
            return undefined;
        }
        function isUsed(value, expression) {
            const valueTokens = context.getSourceCode().getTokens(value);
            const expressionTokens = context.getSourceCode().getTokens(expression);
            const foundUsage = expressionTokens.find((token, index) => {
                if (eq(token, valueTokens[0])) {
                    for (let expressionIndex = index, valueIndex = 0; expressionIndex < expressionTokens.length && valueIndex < valueTokens.length; expressionIndex++, valueIndex++) {
                        if (!eq(expressionTokens[expressionIndex], valueTokens[valueIndex])) {
                            break;
                        }
                        else if (valueIndex === valueTokens.length - 1) {
                            return true;
                        }
                    }
                }
                return false;
            });
            return foundUsage !== undefined;
        }
    },
};
function eq(token1, token2) {
    return token1.value === token2.value;
}
function isSimpleAssignment(node) {
    return (0, nodes_1.isAssignmentExpression)(node) && node.operator === '=';
}
module.exports = rule;
//# sourceMappingURL=no-element-overwrite.js.map