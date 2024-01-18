"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingFlags = void 0;
function getRemainingFlags(cli) {
    const rawArgs = [...cli.rawArgs];
    return rawArgs
        .splice(Math.max(rawArgs.findIndex((item) => item.startsWith('--')), 0))
        .filter((item, index, array) => {
        // If the option is consumed by commander.js, then we skip it
        if (cli.options.find((o) => o.short === item || o.long === item)) {
            return false;
        }
        // If it's an argument of an option consumed by commander.js, then we
        // skip it too
        const prevKeyRaw = array[index - 1];
        if (prevKeyRaw) {
            const previousKey = camelCase(prevKeyRaw.replace(/--/g, '').replace('no', ''));
            if (cli[previousKey] === item) {
                return false;
            }
        }
        return true;
    });
}
exports.getRemainingFlags = getRemainingFlags;
/**
 * Camel-case the given `flag`
 *
 * @param {String} flag
 * @return {String}
 * @api private
 */
function camelCase(flag) {
    return flag.split('-').reduce((str, word) => {
        return str + word[0].toUpperCase() + word.slice(1);
    });
}
