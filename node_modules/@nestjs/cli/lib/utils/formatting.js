"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeToKebabOrSnakeCase = void 0;
/**
 *
 * @param str
 * @returns formated string
 * @description normalizes input to supported path and file name format.
 * Changes camelCase strings to kebab-case, replaces spaces with dash and keeps underscores.
 */
function normalizeToKebabOrSnakeCase(str) {
    const STRING_DASHERIZE_REGEXP = /\s/g;
    const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
    return str
        .replace(STRING_DECAMELIZE_REGEXP, '$1-$2')
        .toLowerCase()
        .replace(STRING_DASHERIZE_REGEXP, '-');
}
exports.normalizeToKebabOrSnakeCase = normalizeToKebabOrSnakeCase;
