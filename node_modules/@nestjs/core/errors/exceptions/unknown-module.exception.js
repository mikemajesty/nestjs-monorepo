"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownModuleException = void 0;
const runtime_exception_1 = require("./runtime.exception");
class UnknownModuleException extends runtime_exception_1.RuntimeException {
    constructor(moduleName) {
        super(`Nest could not select the given module (${moduleName ? `"${moduleName}"` : 'it'} does not exist in current context).`);
    }
}
exports.UnknownModuleException = UnknownModuleException;
