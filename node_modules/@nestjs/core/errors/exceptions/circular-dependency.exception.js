"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularDependencyException = void 0;
const runtime_exception_1 = require("./runtime.exception");
class CircularDependencyException extends runtime_exception_1.RuntimeException {
    constructor(context) {
        const ctx = context ? ` inside ${context}` : ``;
        super(`A circular dependency has been detected${ctx}. Please, make sure that each side of a bidirectional relationships are decorated with "forwardRef()". Note that circular relationships between custom providers (e.g., factories) are not supported since functions cannot be called more than once.`);
    }
}
exports.CircularDependencyException = CircularDependencyException;
