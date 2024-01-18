"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueOfPath = exports.getValueOrDefault = void 0;
function getValueOrDefault(configuration, propertyPath, appName, key, options = [], defaultValue) {
    const item = options.find((option) => option.name === key);
    const origValue = item && item.value;
    if (origValue !== undefined && origValue !== null) {
        return origValue;
    }
    if (configuration.projects && configuration.projects[appName]) {
        // Wrap the application name in double-quotes to prevent splitting it
        // into separate chunks
        appName = appName && !appName.includes('"') ? `"${appName}"` : appName;
        const perAppValue = getValueOfPath(configuration, `projects.${appName}.`.concat(propertyPath));
        if (perAppValue !== undefined) {
            return perAppValue;
        }
    }
    let value = getValueOfPath(configuration, propertyPath);
    if (value === undefined) {
        value = defaultValue;
    }
    return value;
}
exports.getValueOrDefault = getValueOrDefault;
function getValueOfPath(object, propertyPath) {
    const fragments = propertyPath.split('.');
    let propertyValue = object;
    let isConcatInProgress = false;
    let path = '';
    for (const fragment of fragments) {
        if (!propertyValue) {
            break;
        }
        /**
         * When path is escaped with "" double quotes,
         * concatenate the property path.
         * Reference: https://github.com/nestjs/nest-cli/issues/947
         */
        if (fragment.startsWith('"') && fragment.endsWith('"')) {
            path = stripDoubleQuotes(fragment);
        }
        else if (fragment.startsWith('"')) {
            path += stripDoubleQuotes(fragment) + '.';
            isConcatInProgress = true;
            continue;
        }
        else if (isConcatInProgress && !fragment.endsWith('"')) {
            path += fragment + '.';
            continue;
        }
        else if (fragment.endsWith('"')) {
            path += stripDoubleQuotes(fragment);
            isConcatInProgress = false;
        }
        else {
            path = fragment;
        }
        propertyValue = propertyValue[path];
        path = '';
    }
    return propertyValue;
}
exports.getValueOfPath = getValueOfPath;
function stripDoubleQuotes(text) {
    return text.replace(/"/g, '');
}
