"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVariableDeclaration = exports.isThrowStatement = exports.isReturnStatement = exports.isObjectExpression = exports.isModuleDeclaration = exports.isMemberExpression = exports.isLogicalExpression = exports.isLiteral = exports.isIfStatement = exports.isIdentifier = exports.isFunctionExpression = exports.isFunctionDeclaration = exports.isExpressionStatement = exports.isContinueStatement = exports.isConditionalExpression = exports.isCallExpression = exports.isBooleanLiteral = exports.isBlockStatement = exports.isBinaryExpression = exports.isAssignmentExpression = exports.isArrowFunctionExpression = void 0;
const MODULE_DECLARATION_NODES = [
    'ImportDeclaration',
    'ExportNamedDeclaration',
    'ExportDefaultDeclaration',
    'ExportAllDeclaration',
];
function isArrowFunctionExpression(node) {
    return node !== undefined && node.type === 'ArrowFunctionExpression';
}
exports.isArrowFunctionExpression = isArrowFunctionExpression;
function isAssignmentExpression(node) {
    return node !== undefined && node.type === 'AssignmentExpression';
}
exports.isAssignmentExpression = isAssignmentExpression;
function isBinaryExpression(node) {
    return node !== undefined && node.type === 'BinaryExpression';
}
exports.isBinaryExpression = isBinaryExpression;
function isBlockStatement(node) {
    return node !== undefined && node.type === 'BlockStatement';
}
exports.isBlockStatement = isBlockStatement;
function isBooleanLiteral(node) {
    return isLiteral(node) && typeof node.value === 'boolean';
}
exports.isBooleanLiteral = isBooleanLiteral;
function isCallExpression(node) {
    return node !== undefined && node.type === 'CallExpression';
}
exports.isCallExpression = isCallExpression;
function isConditionalExpression(node) {
    return node !== undefined && node.type === 'ConditionalExpression';
}
exports.isConditionalExpression = isConditionalExpression;
function isContinueStatement(node) {
    return node !== undefined && node.type === 'ContinueStatement';
}
exports.isContinueStatement = isContinueStatement;
function isExpressionStatement(node) {
    return node !== undefined && node.type === 'ExpressionStatement';
}
exports.isExpressionStatement = isExpressionStatement;
function isFunctionDeclaration(node) {
    return node !== undefined && node.type === 'FunctionDeclaration';
}
exports.isFunctionDeclaration = isFunctionDeclaration;
function isFunctionExpression(node) {
    return node !== undefined && node.type === 'FunctionExpression';
}
exports.isFunctionExpression = isFunctionExpression;
function isIdentifier(node) {
    return node !== undefined && node.type === 'Identifier';
}
exports.isIdentifier = isIdentifier;
function isIfStatement(node) {
    return node !== undefined && node.type === 'IfStatement';
}
exports.isIfStatement = isIfStatement;
function isLiteral(node) {
    return node !== undefined && node.type === 'Literal';
}
exports.isLiteral = isLiteral;
function isLogicalExpression(node) {
    return node !== undefined && node.type === 'LogicalExpression';
}
exports.isLogicalExpression = isLogicalExpression;
function isMemberExpression(node) {
    return node !== undefined && node.type === 'MemberExpression';
}
exports.isMemberExpression = isMemberExpression;
function isModuleDeclaration(node) {
    return node !== undefined && MODULE_DECLARATION_NODES.includes(node.type);
}
exports.isModuleDeclaration = isModuleDeclaration;
function isObjectExpression(node) {
    return node !== undefined && node.type === 'ObjectExpression';
}
exports.isObjectExpression = isObjectExpression;
function isReturnStatement(node) {
    return node !== undefined && node.type === 'ReturnStatement';
}
exports.isReturnStatement = isReturnStatement;
function isThrowStatement(node) {
    return node !== undefined && node.type === 'ThrowStatement';
}
exports.isThrowStatement = isThrowStatement;
function isVariableDeclaration(node) {
    return node !== undefined && node.type === 'VariableDeclaration';
}
exports.isVariableDeclaration = isVariableDeclaration;
//# sourceMappingURL=nodes.js.map