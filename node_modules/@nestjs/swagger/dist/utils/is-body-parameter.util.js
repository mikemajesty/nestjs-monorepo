"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBodyParameter = void 0;
function isBodyParameter(param) {
    return param.in === 'body';
}
exports.isBodyParameter = isBodyParameter;
