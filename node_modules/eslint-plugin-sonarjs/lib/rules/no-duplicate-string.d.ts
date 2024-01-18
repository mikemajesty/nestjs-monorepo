import type { TSESLint } from '@typescript-eslint/experimental-utils';
declare type Options = [{
    threshold?: number;
    ignoreStrings?: string;
} | undefined, 'sonar-runtime'] | [{
    threshold?: number;
    ignoreStrings?: string;
} | undefined];
declare const rule: TSESLint.RuleModule<string, Options>;
export = rule;
