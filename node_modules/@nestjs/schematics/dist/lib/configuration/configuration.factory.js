"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const defaults_1 = require("../defaults");
function main(options) {
    return (0, schematics_1.mergeWith)(generate(transform(options)));
}
exports.main = main;
function transform(options) {
    const target = Object.assign({}, options);
    target.language =
        target.language !== undefined ? target.language : defaults_1.DEFAULT_LANGUAGE;
    target.collection =
        target.collection !== undefined ? target.collection : '@nestjs/schematics';
    return target;
}
function generate(options) {
    const projectOrPath = options.project ?? '.';
    return (0, schematics_1.apply)((0, schematics_1.url)((0, core_1.join)('./files', options.language)), [
        (0, schematics_1.template)({
            ...core_1.strings,
            ...options,
        }),
        (0, schematics_1.move)(projectOrPath),
    ]);
}
