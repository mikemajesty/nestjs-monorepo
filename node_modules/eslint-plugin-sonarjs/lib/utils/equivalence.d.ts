import type { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';
/**
 * Equivalence is implemented by comparing node types and their tokens.
 * Classic implementation would recursively compare children,
 * but "estree" doesn't provide access to children when node type is unknown
 */
export declare function areEquivalent(first: TSESTree.Node | TSESTree.Node[], second: TSESTree.Node | TSESTree.Node[], sourceCode: TSESLint.SourceCode): boolean;
