"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuilder = void 0;
const get_value_or_default_1 = require("./get-value-or-default");
/**
 * Returns the builder to use for the given application.
 * @param configuration Configuration object.
 * @param cmdOptions Command line options.
 * @param appName Application name.
 * @returns The builder to use.
 */
function getBuilder(configuration, cmdOptions, appName) {
    const builderValue = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.builder', appName, 'builder', cmdOptions, 'tsc');
    return typeof builderValue === 'string'
        ? {
            type: builderValue,
        }
        : builderValue;
}
exports.getBuilder = getBuilder;
