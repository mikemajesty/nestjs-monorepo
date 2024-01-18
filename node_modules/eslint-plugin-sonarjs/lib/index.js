"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.rules = void 0;
const sonarjsRules = [
    'cognitive-complexity',
    'elseif-without-else',
    'max-switch-cases',
    'no-all-duplicated-branches',
    'no-collapsible-if',
    'no-collection-size-mischeck',
    'no-duplicate-string',
    'no-duplicated-branches',
    'no-element-overwrite',
    'no-empty-collection',
    'no-extra-arguments',
    'no-gratuitous-expressions',
    'no-identical-conditions',
    'no-identical-expressions',
    'no-identical-functions',
    'no-ignored-return',
    'no-inverted-boolean-check',
    'no-nested-switch',
    'no-nested-template-literals',
    'no-one-iteration-loop',
    'no-redundant-boolean',
    'no-redundant-jump',
    'no-same-line-conditional',
    'no-small-switch',
    'no-unused-collection',
    'no-use-of-empty-return-value',
    'no-useless-catch',
    'non-existent-operator',
    'prefer-immediate-return',
    'prefer-object-literal',
    'prefer-single-boolean-return',
    'prefer-while',
];
const sonarjsRuleModules = {};
exports.rules = sonarjsRuleModules;
const configs = {
    recommended: { plugins: ['sonarjs'], rules: {} },
};
exports.configs = configs;
sonarjsRules.forEach(rule => {
    sonarjsRuleModules[rule] = require(`./rules/${rule}`);
    const { meta: { docs: { recommended }, }, } = sonarjsRuleModules[rule];
    configs.recommended.rules[`sonarjs/${rule}`] = recommended === false ? 'off' : recommended;
});
//# sourceMappingURL=index.js.map