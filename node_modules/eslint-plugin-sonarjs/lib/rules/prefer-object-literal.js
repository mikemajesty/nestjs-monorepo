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
// https://sonarsource.github.io/rspec/#/rspec/S2428
const nodes_1 = require("../utils/nodes");
const equivalence_1 = require("../utils/equivalence");
const docs_url_1 = require("../utils/docs-url");
const rule = {
    meta: {
        messages: {
            declarePropertiesInsideObject: 'Declare one or more properties of this object inside of the object literal syntax instead of using separate statements.',
        },
        schema: [],
        type: 'suggestion',
        docs: {
            description: 'Object literal syntax should be used',
            recommended: 'error',
            url: (0, docs_url_1.default)(__filename),
        },
    },
    create(context) {
        return {
            BlockStatement: (node) => checkObjectInitialization(node.body, context),
            Program: (node) => {
                const statements = node.body.filter((statement) => !(0, nodes_1.isModuleDeclaration)(statement));
                checkObjectInitialization(statements, context);
            },
        };
    },
};
function checkObjectInitialization(statements, context) {
    let index = 0;
    while (index < statements.length - 1) {
        const objectDeclaration = getObjectDeclaration(statements[index]);
        // eslint-disable-next-line sonarjs/no-collapsible-if
        if (objectDeclaration && (0, nodes_1.isIdentifier)(objectDeclaration.id)) {
            const nextStmt = statements[index + 1];
            if (isPropertyAssignment(nextStmt, objectDeclaration.id, context.getSourceCode())) {
                context.report({ messageId: 'declarePropertiesInsideObject', node: objectDeclaration });
            }
        }
        index++;
    }
}
function getObjectDeclaration(statement) {
    if ((0, nodes_1.isVariableDeclaration)(statement)) {
        return statement.declarations.find(declaration => !!declaration.init && isEmptyObjectExpression(declaration.init));
    }
    return undefined;
}
function isEmptyObjectExpression(expression) {
    return (0, nodes_1.isObjectExpression)(expression) && expression.properties.length === 0;
}
function isPropertyAssignment(statement, objectIdentifier, sourceCode) {
    if ((0, nodes_1.isExpressionStatement)(statement) && (0, nodes_1.isAssignmentExpression)(statement.expression)) {
        const { left, right } = statement.expression;
        if ((0, nodes_1.isMemberExpression)(left)) {
            return (!left.computed &&
                isSingleLineExpression(right, sourceCode) &&
                (0, equivalence_1.areEquivalent)(left.object, objectIdentifier, sourceCode) &&
                !isCircularReference(left, right, sourceCode));
        }
    }
    return false;
    function isSingleLineExpression(expression, sourceCode) {
        const first = sourceCode.getFirstToken(expression).loc;
        const last = sourceCode.getLastToken(expression).loc;
        return first.start.line === last.end.line;
    }
    function isCircularReference(left, right, sourceCode) {
        return (0, equivalence_1.areEquivalent)(left.object, right, sourceCode);
    }
}
module.exports = rule;
//# sourceMappingURL=prefer-object-literal.js.map