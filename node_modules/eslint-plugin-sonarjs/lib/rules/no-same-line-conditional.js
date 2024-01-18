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
// https://sonarsource.github.io/rspec/#/rspec/S3972
const docs_url_1 = require("../utils/docs-url");
const locations_1 = require("../utils/locations");
const message = 'Move this "if" to a new line or add the missing "else".';
const rule = {
    meta: {
        messages: {
            sameLineCondition: message,
            sonarRuntime: '{{sonarRuntimeData}}',
            suggestAddingElse: 'Add "else" keyword',
            suggestAddingNewline: 'Move this "if" to a new line',
        },
        type: 'problem',
        hasSuggestions: true,
        docs: {
            description: 'Conditionals should start on new lines',
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
        function checkStatements(statements) {
            const sourceCode = context.getSourceCode();
            const siblingIfStatements = getSiblingIfStatements(statements);
            siblingIfStatements.forEach(siblingIfStatement => {
                const precedingIf = siblingIfStatement.first;
                const followingIf = siblingIfStatement.following;
                if (!!precedingIf.loc &&
                    !!followingIf.loc &&
                    precedingIf.loc.end.line === followingIf.loc.start.line &&
                    precedingIf.loc.start.line !== followingIf.loc.end.line) {
                    const precedingIfLastToken = sourceCode.getLastToken(precedingIf);
                    const followingIfToken = sourceCode.getFirstToken(followingIf);
                    (0, locations_1.report)(context, {
                        messageId: 'sameLineCondition',
                        loc: followingIfToken.loc,
                        suggest: [
                            {
                                messageId: 'suggestAddingElse',
                                fix: fixer => fixer.insertTextBefore(followingIfToken, 'else '),
                            },
                            {
                                messageId: 'suggestAddingNewline',
                                fix: fixer => fixer.replaceTextRange([precedingIf.range[1], followingIf.range[0]], '\n' + ' '.repeat(precedingIf.loc.start.column)),
                            },
                        ],
                    }, [(0, locations_1.issueLocation)(precedingIfLastToken.loc)], message);
                }
            });
        }
        return {
            Program: (node) => checkStatements(node.body),
            BlockStatement: (node) => checkStatements(node.body),
            SwitchCase: (node) => checkStatements(node.consequent),
        };
    },
};
function getSiblingIfStatements(statements) {
    return statements.reduce((siblingsArray, statement, currentIndex) => {
        const previousStatement = statements[currentIndex - 1];
        if (statement.type === 'IfStatement' &&
            !!previousStatement &&
            previousStatement.type === 'IfStatement') {
            return [{ first: previousStatement, following: statement }, ...siblingsArray];
        }
        return siblingsArray;
    }, []);
}
module.exports = rule;
//# sourceMappingURL=no-same-line-conditional.js.map