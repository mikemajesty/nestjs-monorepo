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
// https://sonarsource.github.io/rspec/#/rspec/S4144
const equivalence_1 = require("../utils/equivalence");
const locations_1 = require("../utils/locations");
const docs_url_1 = require("../utils/docs-url");
const DEFAULT_MIN_LINES = 3;
const message = 'Update this function so that its implementation is not identical to the one on line {{line}}.';
const rule = {
    meta: {
        messages: {
            identicalFunctions: message,
            sonarRuntime: '{{sonarRuntimeData}}',
        },
        type: 'problem',
        docs: {
            description: 'Functions should not have identical implementations',
            recommended: 'error',
            url: (0, docs_url_1.default)(__filename),
        },
        schema: [
            { type: 'integer', minimum: 3 },
            {
                enum: ['sonar-runtime'],
            },
        ],
    },
    create(context) {
        const functions = [];
        const minLines = typeof context.options[0] === 'number' ? context.options[0] : DEFAULT_MIN_LINES;
        return {
            FunctionDeclaration(node) {
                visitFunction(node);
            },
            'VariableDeclarator > FunctionExpression, MethodDefinition > FunctionExpression': (node) => {
                visitFunction(node);
            },
            'VariableDeclarator > ArrowFunctionExpression, MethodDefinition > ArrowFunctionExpression': (node) => {
                visitFunction(node);
            },
            'Program:exit'() {
                processFunctions();
            },
        };
        function visitFunction(node) {
            if (isBigEnough(node.body)) {
                functions.push({ function: node, parent: node.parent });
            }
        }
        function processFunctions() {
            for (let i = 1; i < functions.length; i++) {
                const duplicatingFunction = functions[i].function;
                for (let j = 0; j < i; j++) {
                    const originalFunction = functions[j].function;
                    if ((0, equivalence_1.areEquivalent)(duplicatingFunction.body, originalFunction.body, context.getSourceCode()) &&
                        originalFunction.loc) {
                        const loc = (0, locations_1.getMainFunctionTokenLocation)(duplicatingFunction, functions[i].parent, context);
                        const originalFunctionLoc = (0, locations_1.getMainFunctionTokenLocation)(originalFunction, functions[j].parent, context);
                        const secondaryLocations = [
                            (0, locations_1.issueLocation)(originalFunctionLoc, originalFunctionLoc, 'Original implementation'),
                        ];
                        (0, locations_1.report)(context, {
                            messageId: 'identicalFunctions',
                            data: {
                                line: originalFunction.loc.start.line,
                            },
                            loc,
                        }, secondaryLocations, message);
                        break;
                    }
                }
            }
        }
        function isBigEnough(node) {
            const tokens = context.getSourceCode().getTokens(node);
            if (tokens.length > 0 && tokens[0].value === '{') {
                tokens.shift();
            }
            if (tokens.length > 0 && tokens[tokens.length - 1].value === '}') {
                tokens.pop();
            }
            if (tokens.length > 0) {
                const firstLine = tokens[0].loc.start.line;
                const lastLine = tokens[tokens.length - 1].loc.end.line;
                return lastLine - firstLine + 1 >= minLines;
            }
            return false;
        }
    },
};
module.exports = rule;
//# sourceMappingURL=no-identical-functions.js.map