"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ancestorsChain = exports.findFirstMatchingAncestor = void 0;
function findFirstMatchingAncestor(node, predicate) {
    return ancestorsChain(node, new Set()).find(predicate);
}
exports.findFirstMatchingAncestor = findFirstMatchingAncestor;
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
exports.ancestorsChain = ancestorsChain;
//# sourceMappingURL=utils-parent.js.map