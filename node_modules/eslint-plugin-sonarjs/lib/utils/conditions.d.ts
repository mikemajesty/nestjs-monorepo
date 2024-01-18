import type { TSESTree } from '@typescript-eslint/experimental-utils';
/** Returns a list of statements corresponding to a `if - else if - else` chain */
export declare function collectIfBranches(node: TSESTree.IfStatement): {
    branches: TSESTree.Statement[];
    endsWithElse: boolean;
};
/** Returns a list of `switch` clauses (both `case` and `default`) */
export declare function collectSwitchBranches(node: TSESTree.SwitchStatement): {
    branches: TSESTree.Statement[][];
    endsWithDefault: boolean;
};
/** Excludes the break statement from the list */
export declare function takeWithoutBreak(nodes: TSESTree.Statement[]): TSESTree.Statement[];
