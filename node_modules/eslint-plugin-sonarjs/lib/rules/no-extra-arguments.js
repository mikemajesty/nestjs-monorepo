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
// https://sonarsource.github.io/rspec/#/rspec/S930
const nodes_1 = require("../utils/nodes");
const locations_1 = require("../utils/locations");
const docs_url_1 = require("../utils/docs-url");
const message = 'This function expects {{expectedArguments}}, but {{providedArguments}} provided.';
const rule = {
    meta: {
        messages: {
            tooManyArguments: message,
            sonarRuntime: '{{sonarRuntimeData}}',
        },
        type: 'problem',
        docs: {
            description: 'Function calls should not pass extra arguments',
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
        const callExpressionsToCheck = [];
        const usingArguments = new Set();
        const emptyFunctions = new Set();
        return {
            // eslint-disable-next-line sonarjs/cognitive-complexity
            CallExpression(node) {
                const callExpr = node;
                if ((0, nodes_1.isIdentifier)(callExpr.callee)) {
                    const reference = context
                        .getScope()
                        .references.find(ref => ref.identifier === callExpr.callee);
                    const definition = reference && getSingleDefinition(reference);
                    if (definition) {
                        if (definition.type === 'FunctionName') {
                            checkFunction(callExpr, definition.node);
                        }
                        else if (definition.type === 'Variable') {
                            const { init } = definition.node;
                            if (init && ((0, nodes_1.isFunctionExpression)(init) || (0, nodes_1.isArrowFunctionExpression)(init))) {
                                checkFunction(callExpr, init);
                            }
                        }
                    }
                }
                else if ((0, nodes_1.isArrowFunctionExpression)(callExpr.callee) ||
                    (0, nodes_1.isFunctionExpression)(callExpr.callee)) {
                    // IIFE
                    checkFunction(callExpr, callExpr.callee);
                }
            },
            ':function'(node) {
                const fn = node;
                if ((0, nodes_1.isBlockStatement)(fn.body) && fn.body.body.length === 0 && fn.params.length === 0) {
                    emptyFunctions.add(node);
                }
            },
            'FunctionDeclaration > BlockStatement Identifier'(node) {
                checkArguments(node);
            },
            'FunctionExpression > BlockStatement Identifier'(node) {
                checkArguments(node);
            },
            'Program:exit'() {
                callExpressionsToCheck.forEach(({ callExpr, functionNode }) => {
                    if (!usingArguments.has(functionNode) && !emptyFunctions.has(functionNode)) {
                        reportIssue(callExpr, functionNode);
                    }
                });
            },
        };
        function getSingleDefinition(reference) {
            if (reference && reference.resolved) {
                const variable = reference.resolved;
                if (variable.defs.length === 1) {
                    return variable.defs[0];
                }
            }
            return undefined;
        }
        function checkArguments(identifier) {
            if (identifier.name === 'arguments') {
                const reference = context.getScope().references.find(ref => ref.identifier === identifier);
                const definition = reference && getSingleDefinition(reference);
                // special `arguments` variable has no definition
                if (!definition) {
                    const ancestors = context.getAncestors().reverse();
                    const fn = ancestors.find(node => (0, nodes_1.isFunctionDeclaration)(node) || (0, nodes_1.isFunctionExpression)(node));
                    if (fn) {
                        usingArguments.add(fn);
                    }
                }
            }
        }
        function checkFunction(callExpr, functionNode) {
            const hasRest = functionNode.params.some(param => param.type === 'RestElement');
            if (!hasRest && callExpr.arguments.length > functionNode.params.length) {
                callExpressionsToCheck.push({ callExpr, functionNode });
            }
        }
        function reportIssue(callExpr, functionNode) {
            const paramLength = functionNode.params.length;
            const argsLength = callExpr.arguments.length;
            // prettier-ignore
            const expectedArguments = 
            // eslint-disable-next-line no-nested-ternary
            paramLength === 0 ? "no arguments" :
                paramLength === 1 ? "1 argument" :
                    `${paramLength} arguments`;
            // prettier-ignore
            const providedArguments = 
            // eslint-disable-next-line no-nested-ternary
            argsLength === 0 ? "none was" :
                argsLength === 1 ? "1 was" :
                    `${argsLength} were`;
            (0, locations_1.report)(context, {
                messageId: 'tooManyArguments',
                data: {
                    expectedArguments,
                    providedArguments,
                },
                node: callExpr.callee,
            }, getSecondaryLocations(callExpr, functionNode), message);
        }
        function getSecondaryLocations(callExpr, functionNode) {
            const paramLength = functionNode.params.length;
            const secondaryLocations = [];
            if (paramLength > 0) {
                const startLoc = functionNode.params[0].loc;
                const endLoc = functionNode.params[paramLength - 1].loc;
                secondaryLocations.push((0, locations_1.issueLocation)(startLoc, endLoc, 'Formal parameters'));
            }
            else {
                // as we're not providing parent node, `getMainFunctionTokenLocation` may return `undefined`
                const fnToken = (0, locations_1.getMainFunctionTokenLocation)(functionNode, undefined, context);
                if (fnToken) {
                    secondaryLocations.push((0, locations_1.issueLocation)(fnToken, fnToken, 'Formal parameters'));
                }
            }
            // find actual extra arguments to highlight
            callExpr.arguments.forEach((argument, index) => {
                if (index >= paramLength) {
                    secondaryLocations.push((0, locations_1.toSecondaryLocation)(argument, 'Extra argument'));
                }
            });
            return secondaryLocations;
        }
    },
};
module.exports = rule;
//# sourceMappingURL=no-extra-arguments.js.map