"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOptionsInjectionToken = void 0;
const random_string_generator_util_1 = require("../../utils/random-string-generator.util");
function generateOptionsInjectionToken() {
    const hash = (0, random_string_generator_util_1.randomStringGenerator)();
    return `CONFIGURABLE_MODULE_OPTIONS[${hash}]`;
}
exports.generateOptionsInjectionToken = generateOptionsInjectionToken;
