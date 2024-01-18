"use strict";
const nodes_1 = require("../utils/nodes");
const docs_url_1 = require("../utils/docs-url");
const rule = {
    meta: {
        messages: {
            replaceIfThenElseByReturn: 'Replace this if-then-else flow by a single return statement.',
            suggest: 'Replace with single return statement',
            suggestCast: 'Replace with single return statement using "!!" cast',
            suggestBoolean: 'Replace with single return statement without cast (condition should be boolean!)',
        },
        schema: [],
        type: 'suggestion',
        hasSuggestions: true,
        docs: {
            description: 'Return of boolean expressions should not be wrapped into an "if-then-else" statement',
            recommended: 'error',
            url: (0, docs_url_1.default)(__filename),
        },
    },
    create(context) {
        return {
            IfStatement(node) {
                if (
                // ignore `else if`
                !(0, nodes_1.isIfStatement)(node.parent) &&
                    returnsBoolean(node.consequent) &&
                    alternateReturnsBoolean(node)) {
                    context.report({
                        messageId: 'replaceIfThenElseByReturn',
                        node,
                        suggest: getSuggestion(node),
                    });
                }
            },
        };
        function alternateReturnsBoolean(node) {
            if (node.alternate) {
                return returnsBoolean(node.alternate);
            }
            const { parent } = node;
            if (parent?.type === 'BlockStatement') {
                const ifStmtIndex = parent.body.findIndex(stmt => stmt === node);
                return isSimpleReturnBooleanLiteral(parent.body[ifStmtIndex + 1]);
            }
            return false;
        }
        function returnsBoolean(statement) {
            return (statement !== undefined &&
                (isBlockReturningBooleanLiteral(statement) || isSimpleReturnBooleanLiteral(statement)));
        }
        function isBlockReturningBooleanLiteral(statement) {
            return ((0, nodes_1.isBlockStatement)(statement) &&
                statement.body.length === 1 &&
                isSimpleReturnBooleanLiteral(statement.body[0]));
        }
        function isSimpleReturnBooleanLiteral(statement) {
            // `statement.argument` can be `null`, replace it with `undefined` in this case
            return (0, nodes_1.isReturnStatement)(statement) && (0, nodes_1.isBooleanLiteral)(statement.argument || undefined);
        }
        function getSuggestion(ifStmt) {
            const getFix = (condition) => {
                return (fixer) => {
                    const singleReturn = `return ${condition};`;
                    if (ifStmt.alternate) {
                        return fixer.replaceText(ifStmt, singleReturn);
                    }
                    else {
                        const parent = ifStmt.parent;
                        const ifStmtIndex = parent.body.findIndex(stmt => stmt === ifStmt);
                        const returnStmt = parent.body[ifStmtIndex + 1];
                        const range = [ifStmt.range[0], returnStmt.range[1]];
                        return fixer.replaceTextRange(range, singleReturn);
                    }
                };
            };
            const shouldNegate = isReturningFalse(ifStmt.consequent);
            const shouldCast = !isBooleanExpression(ifStmt.test);
            const testText = context.getSourceCode().getText(ifStmt.test);
            if (shouldNegate) {
                return [{ messageId: 'suggest', fix: getFix(`!(${testText})`) }];
            }
            else if (!shouldCast) {
                return [{ messageId: 'suggest', fix: getFix(testText) }];
            }
            else {
                return [
                    { messageId: 'suggestCast', fix: getFix(`!!(${testText})`) },
                    { messageId: 'suggestBoolean', fix: getFix(testText) },
                ];
            }
        }
        function isReturningFalse(stmt) {
            const returnStmt = (stmt.type === 'BlockStatement' ? stmt.body[0] : stmt);
            return returnStmt.argument.value === false;
        }
        function isBooleanExpression(expr) {
            return ((expr.type === 'UnaryExpression' || expr.type === 'BinaryExpression') &&
                ['!', '==', '===', '!=', '!==', '<', '<=', '>', '>=', 'in', 'instanceof'].includes(expr.operator));
        }
    },
};
module.exports = rule;
//# sourceMappingURL=prefer-single-boolean-return.js.map