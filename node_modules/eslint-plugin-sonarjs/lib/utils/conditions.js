"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeWithoutBreak = exports.collectSwitchBranches = exports.collectIfBranches = void 0;
const nodes_1 = require("./nodes");
/** Returns a list of statements corresponding to a `if - else if - else` chain */
function collectIfBranches(node) {
    const branches = [node.consequent];
    let endsWithElse = false;
    let statement = node.alternate;
    while (statement) {
        if ((0, nodes_1.isIfStatement)(statement)) {
            branches.push(statement.consequent);
            statement = statement.alternate;
        }
        else {
            branches.push(statement);
            endsWithElse = true;
            break;
        }
    }
    return { branches, endsWithElse };
}
exports.collectIfBranches = collectIfBranches;
/** Returns a list of `switch` clauses (both `case` and `default`) */
function collectSwitchBranches(node) {
    let endsWithDefault = false;
    const branches = node.cases
        .filter((clause, index) => {
        if (!clause.test) {
            endsWithDefault = true;
        }
        // if a branch has no implementation, it's fall-through and it should not be considered
        // the only exception is the last case
        const isLast = index === node.cases.length - 1;
        return isLast || clause.consequent.length > 0;
    })
        .map(clause => takeWithoutBreak(clause.consequent));
    return { branches, endsWithDefault };
}
exports.collectSwitchBranches = collectSwitchBranches;
/** Excludes the break statement from the list */
function takeWithoutBreak(nodes) {
    return nodes.length > 0 && nodes[nodes.length - 1].type === 'BreakStatement'
        ? nodes.slice(0, -1)
        : nodes;
}
exports.takeWithoutBreak = takeWithoutBreak;
//# sourceMappingURL=conditions.js.map