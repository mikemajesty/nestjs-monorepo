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
// https://sonarsource.github.io/rspec/#/rspec/S1488
const nodes_1 = require("../utils/nodes");
const docs_url_1 = require("../utils/docs-url");
const rule = {
    meta: {
        messages: {
            doImmediateAction: 'Immediately {{action}} this expression instead of assigning it to the temporary variable "{{variable}}".',
        },
        schema: [],
        type: 'suggestion',
        docs: {
            description: 'Local variables should not be declared and then immediately returned or thrown',
            recommended: 'error',
            url: (0, docs_url_1.default)(__filename),
        },
        fixable: 'code',
    },
    create(context) {
        return {
            BlockStatement(node) {
                processStatements(node.body);
            },
            SwitchCase(node) {
                processStatements(node.consequent);
            },
        };
        function processStatements(statements) {
            if (statements.length > 1) {
                const last = statements[statements.length - 1];
                const returnedIdentifier = getOnlyReturnedVariable(last);
                const lastButOne = statements[statements.length - 2];
                const declaredIdentifier = getOnlyDeclaredVariable(lastButOne);
                if (returnedIdentifier && declaredIdentifier) {
                    const sameVariable = getVariables(context).find(variable => {
                        return (variable.references.find(ref => ref.identifier === returnedIdentifier) !==
                            undefined &&
                            variable.references.find(ref => ref.identifier === declaredIdentifier.id) !==
                                undefined);
                    });
                    // there must be only one "read" - in `return` or `throw`
                    if (sameVariable && sameVariable.references.filter(ref => ref.isRead()).length === 1) {
                        context.report({
                            messageId: 'doImmediateAction',
                            data: {
                                action: (0, nodes_1.isReturnStatement)(last) ? 'return' : 'throw',
                                variable: returnedIdentifier.name,
                            },
                            node: declaredIdentifier.init,
                            fix: fixer => fix(fixer, last, lastButOne, declaredIdentifier.init, returnedIdentifier),
                        });
                    }
                }
            }
        }
        // eslint-disable-next-line max-params
        function fix(fixer, last, lastButOne, expressionToReturn, returnedExpression) {
            const expressionText = context.getSourceCode().getText(expressionToReturn);
            const rangeToRemoveStart = lastButOne.range[0];
            const commentsBetweenStatements = context.getSourceCode().getCommentsAfter(lastButOne);
            const rangeToRemoveEnd = commentsBetweenStatements.length > 0
                ? commentsBetweenStatements[0].range[0]
                : last.range[0];
            return [
                fixer.removeRange([rangeToRemoveStart, rangeToRemoveEnd]),
                fixer.replaceText(returnedExpression, expressionText),
            ];
        }
        function getOnlyReturnedVariable(node) {
            return ((0, nodes_1.isReturnStatement)(node) || (0, nodes_1.isThrowStatement)(node)) &&
                node.argument &&
                (0, nodes_1.isIdentifier)(node.argument)
                ? node.argument
                : undefined;
        }
        function getOnlyDeclaredVariable(node) {
            if ((0, nodes_1.isVariableDeclaration)(node) && node.declarations.length === 1) {
                const { id, init } = node.declarations[0];
                if ((0, nodes_1.isIdentifier)(id) && init && !id.typeAnnotation) {
                    return { id, init };
                }
            }
            return undefined;
        }
        function getVariables(context) {
            const { variableScope, variables: currentScopeVariables } = context.getScope();
            if (variableScope === context.getScope()) {
                return currentScopeVariables;
            }
            else {
                return currentScopeVariables.concat(variableScope.variables);
            }
        }
    },
};
module.exports = rule;
//# sourceMappingURL=prefer-immediate-return.js.map