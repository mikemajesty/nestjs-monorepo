import type { TSESLint } from '@typescript-eslint/experimental-utils';
declare const sonarjsRuleModules: {
    [key: string]: any;
};
declare const configs: {
    recommended: TSESLint.Linter.Config & {
        plugins: string[];
    };
};
export { sonarjsRuleModules as rules, configs };
