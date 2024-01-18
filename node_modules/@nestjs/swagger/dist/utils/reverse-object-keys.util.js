"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseObjectKeys = void 0;
function reverseObjectKeys(originalObject) {
    const reversedObject = {};
    const keys = Object.keys(originalObject).reverse();
    for (const key of keys) {
        reversedObject[key] = originalObject[key];
    }
    return reversedObject;
}
exports.reverseObjectKeys = reverseObjectKeys;
