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
// https://sonarsource.github.io/rspec/#/rspec/S1751
const nodes_1 = require("../utils/nodes");
const docs_url_1 = require("../utils/docs-url");
const rule = {
    meta: {
        messages: {
            refactorLoop: 'Refactor this loop to do more than one iteration.',
        },
        schema: [],
        type: 'problem',
        docs: {
            description: 'Loops with at most one iteration should be refactored',
            recommended: 'error',
            url: (0, docs_url_1.default)(__filename),
        },
    },
    // @ts-ignore The typings of @typescript-eslint/experimental-utils does not contain the 'onX' methods.
    create(context) {
        const loopingNodes = new Set();
        const loops = new Set();
        const loopsAndTheirSegments = [];
        const currentCodePaths = [];
        return {
            ForStatement(node) {
                loops.add(node);
            },
            WhileStatement(node) {
                loops.add(node);
            },
            DoWhileStatement(node) {
                loops.add(node);
            },
            onCodePathStart(codePath) {
                currentCodePaths.push(codePath);
            },
            onCodePathEnd() {
                currentCodePaths.pop();
            },
            'WhileStatement > *'(node) {
                visitLoopChild(node.parent);
            },
            'ForStatement > *'(node) {
                visitLoopChild(node.parent);
            },
            onCodePathSegmentLoop(_, toSegment, node) {
                if ((0, nodes_1.isContinueStatement)(node)) {
                    loopsAndTheirSegments.forEach(({ segments, loop }) => {
                        if (segments.includes(toSegment)) {
                            loopingNodes.add(loop);
                        }
                    });
                }
                else {
                    loopingNodes.add(node);
                }
            },
            'Program:exit'() {
                loops.forEach(loop => {
                    if (!loopingNodes.has(loop)) {
                        context.report({
                            messageId: 'refactorLoop',
                            loc: context.getSourceCode().getFirstToken(loop).loc,
                        });
                    }
                });
            },
        };
        // Required to correctly process "continue" looping.
        // When a loop has a "continue" statement, this "continue" statement triggers a "onCodePathSegmentLoop" event,
        // and the corresponding event node is that "continue" statement. Current implementation is based on the fact
        // that the "onCodePathSegmentLoop" event is triggered with a loop node. To work this special case around,
        // we visit loop children and collect corresponding path segments as these segments are "toSegment"
        // in "onCodePathSegmentLoop" event.
        function visitLoopChild(parent) {
            if (currentCodePaths.length > 0) {
                const currentCodePath = currentCodePaths[currentCodePaths.length - 1];
                loopsAndTheirSegments.push({ segments: currentCodePath.currentSegments, loop: parent });
            }
        }
    },
};
module.exports = rule;
//# sourceMappingURL=no-one-iteration-loop.js.map