import type { TSESTree } from '@typescript-eslint/experimental-utils';
export declare function findFirstMatchingAncestor(node: TSESTree.Node, predicate: (node: TSESTree.Node) => boolean): TSESTree.Node | undefined;
export declare function ancestorsChain(node: TSESTree.Node, boundaryTypes: Set<string>): TSESTree.Node[];
