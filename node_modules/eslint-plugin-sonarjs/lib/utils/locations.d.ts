import type { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';
declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare type MutableReportDescriptor = Writeable<TSESLint.ReportDescriptor<string>>;
export interface IssueLocation {
    column: number;
    line: number;
    endColumn: number;
    endLine: number;
    message?: string;
    data?: Record<string, unknown>;
}
export interface EncodedMessage {
    message: string;
    cost?: number;
    secondaryLocations: IssueLocation[];
}
/**
 * Returns a location of the "main" function token:
 * - function name for a function declaration, method or accessor
 * - "function" keyword for a function expression
 * - "=>" for an arrow function
 */
export declare function getMainFunctionTokenLocation<T = string>(fn: TSESTree.FunctionLike, parent: TSESTree.Node | undefined, context: TSESLint.RuleContext<string, T[]>): TSESTree.SourceLocation;
/**
 * Wrapper for `context.report`, supporting secondary locations and cost.
 * Encode those extra information in the issue message when rule is executed
 * in Sonar* environment.
 */
export declare function report<T = string>(context: TSESLint.RuleContext<string, T[]>, reportDescriptor: MutableReportDescriptor, secondaryLocations: IssueLocation[], message: string, cost?: number): void;
/**
 * Converts `SourceLocation` range into `IssueLocation`
 */
export declare function issueLocation(startLoc: TSESTree.SourceLocation, endLoc?: TSESTree.SourceLocation, message?: string, data?: Record<string, unknown>): IssueLocation;
export declare function toSecondaryLocation(locationHolder: TSESLint.AST.Token | TSESTree.Node, message?: string): IssueLocation;
export declare function getFirstTokenAfter<T = string>(node: TSESTree.Node, context: TSESLint.RuleContext<string, T[]>): TSESLint.AST.Token | null;
export declare function getFirstToken<T = string>(node: TSESTree.Node, context: TSESLint.RuleContext<string, T[]>): TSESLint.AST.Token;
export {};
