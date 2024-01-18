"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTargetEqual = void 0;
function isTargetEqual(a, b) {
    return a.target === b.target || (a.target.prototype ?
        isTargetEqual({ target: a.target.__proto__ }, b) :
        false);
}
exports.isTargetEqual = isTargetEqual;
