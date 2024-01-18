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
// https://sonarsource.github.io/rspec/#/rspec/S4030
const collections_1 = require("../utils/collections");
const docs_url_1 = require("../utils/docs-url");
const rule = {
    meta: {
        messages: {
            unusedCollection: "Either use this collection's contents or remove the collection.",
        },
        schema: [],
        type: 'problem',
        docs: {
            description: 'Collection and array contents should be used',
            recommended: 'error',
            url: (0, docs_url_1.default)(__filename),
        },
    },
    create(context) {
        return {
            'Program:exit': () => {
                const unusedArrays = [];
                collectUnusedCollections(context.getScope(), unusedArrays);
                unusedArrays.forEach(unusedArray => {
                    context.report({
                        messageId: 'unusedCollection',
                        node: unusedArray.identifiers[0],
                    });
                });
            },
        };
    },
};
function collectUnusedCollections(scope, unusedArray) {
    if (scope.type !== 'global') {
        scope.variables.filter(isUnusedCollection).forEach(v => {
            unusedArray.push(v);
        });
    }
    scope.childScopes.forEach(childScope => {
        collectUnusedCollections(childScope, unusedArray);
    });
}
function isExported(variable) {
    const definition = variable.defs[0];
    return definition && definition.node.parent?.parent?.type.startsWith('Export');
}
function isUnusedCollection(variable) {
    if (isExported(variable)) {
        return false;
    }
    if (variable.references.length <= 1) {
        return false;
    }
    let assignCollection = false;
    for (const ref of variable.references) {
        if (ref.isWriteOnly()) {
            if (isReferenceAssigningCollection(ref)) {
                assignCollection = true;
            }
            else {
                //One assignment is not a collection, we don't go further
                return false;
            }
        }
        else if (isRead(ref)) {
            //Unfortunately, isRead (!isWrite) from Scope.Reference consider A[1] = 1; and A.xxx(); as a read operation, we need to filter further
            return false;
        }
    }
    return assignCollection;
}
function isReferenceAssigningCollection(ref) {
    const declOrExprStmt = findFirstMatchingAncestor(ref.identifier, n => n.type === 'VariableDeclarator' || n.type === 'ExpressionStatement');
    if (declOrExprStmt) {
        if (declOrExprStmt.type === 'VariableDeclarator' && declOrExprStmt.init) {
            return isCollectionType(declOrExprStmt.init);
        }
        if (declOrExprStmt.type === 'ExpressionStatement') {
            const { expression } = declOrExprStmt;
            return (expression.type === 'AssignmentExpression' &&
                isReferenceTo(ref, expression.left) &&
                isCollectionType(expression.right));
        }
    }
    return false;
}
function isCollectionType(node) {
    if (node && node.type === 'ArrayExpression') {
        return true;
    }
    else if (node && (node.type === 'CallExpression' || node.type === 'NewExpression')) {
        return isIdentifier(node.callee, ...collections_1.collectionConstructor);
    }
    return false;
}
function isRead(ref) {
    const expressionStatement = findFirstMatchingAncestor(ref.identifier, n => n.type === 'ExpressionStatement');
    if (expressionStatement) {
        return !(isElementWrite(expressionStatement, ref) || isWritingMethodCall(expressionStatement, ref));
    }
    //All the write statement that we search are part of ExpressionStatement, if there is none, it's a read
    return true;
}
/**
 * Detect expression statements like the following:
 * myArray.push(1);
 */
function isWritingMethodCall(statement, ref) {
    if (statement.expression.type === 'CallExpression') {
        const { callee } = statement.expression;
        if (isMemberExpression(callee)) {
            const { property } = callee;
            return isReferenceTo(ref, callee.object) && isIdentifier(property, ...collections_1.writingMethods);
        }
    }
    return false;
}
function isMemberExpression(node) {
    return node.type === 'MemberExpression';
}
/**
 * Detect expression statements like the following:
 *  myArray[1] = 42;
 *  myArray[1] += 42;
 *  myObj.prop1 = 3;
 *  myObj.prop1 += 3;
 */
function isElementWrite(statement, ref) {
    if (statement.expression.type === 'AssignmentExpression') {
        const assignmentExpression = statement.expression;
        const lhs = assignmentExpression.left;
        return isMemberExpressionReference(lhs, ref);
    }
    return false;
}
function isMemberExpressionReference(lhs, ref) {
    return (lhs.type === 'MemberExpression' &&
        (isReferenceTo(ref, lhs.object) || isMemberExpressionReference(lhs.object, ref)));
}
function isIdentifier(node, ...values) {
    return node.type === 'Identifier' && values.some(value => value === node.name);
}
function isReferenceTo(ref, node) {
    return node.type === 'Identifier' && node === ref.identifier;
}
function findFirstMatchingAncestor(node, predicate) {
    return ancestorsChain(node, new Set()).find(predicate);
}
function ancestorsChain(node, boundaryTypes) {
    const chain = [];
    let currentNode = node.parent;
    while (currentNode) {
        chain.push(currentNode);
        if (boundaryTypes.has(currentNode.type)) {
            break;
        }
        currentNode = currentNode.parent;
    }
    return chain;
}
module.exports = rule;
//# sourceMappingURL=no-unused-collection.js.map