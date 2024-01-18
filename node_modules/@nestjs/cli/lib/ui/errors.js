"use strict";
// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI_ERRORS = void 0;
exports.CLI_ERRORS = {
    MISSING_TYPESCRIPT: (path) => `Could not find TypeScript configuration file "${path}". Please, ensure that you are running this command in the appropriate directory (inside Nest workspace).`,
    WRONG_PLUGIN: (name) => `The "${name}" plugin is not compatible with Nest CLI. Neither "after()" nor "before()" nor "afterDeclarations()" function have been provided.`,
};
