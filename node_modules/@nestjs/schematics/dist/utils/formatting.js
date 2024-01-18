"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeToKebabOrSnakeCase = void 0;
function normalizeToKebabOrSnakeCase(str) {
    const STRING_DASHERIZE_REGEXP = /\s/g;
    const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
    return str
        .replace(STRING_DECAMELIZE_REGEXP, '$1-$2')
        .toLowerCase()
        .replace(STRING_DASHERIZE_REGEXP, '-');
}
exports.normalizeToKebabOrSnakeCase = normalizeToKebabOrSnakeCase;
