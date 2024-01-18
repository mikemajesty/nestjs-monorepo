import type { TSESLint, TSESTree } from '@typescript-eslint/experimental-utils';
export declare function isIdentifier(node: TSESTree.Node, ...values: string[]): node is TSESTree.Identifier;
export declare function isReferenceTo(ref: TSESLint.Scope.Reference, node: TSESTree.Node): boolean;
