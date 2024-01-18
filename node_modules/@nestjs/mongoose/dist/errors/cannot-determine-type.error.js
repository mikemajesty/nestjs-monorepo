"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotDetermineTypeError = void 0;
class CannotDetermineTypeError extends Error {
    constructor(hostClass, propertyKey) {
        super(`Cannot determine a type for the "${hostClass}.${propertyKey}" field (union/intersection/ambiguous type was used). Make sure your property is decorated with a "@Prop({ type: TYPE_HERE })" decorator.`);
    }
}
exports.CannotDetermineTypeError = CannotDetermineTypeError;
