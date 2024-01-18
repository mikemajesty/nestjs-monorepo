"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalPrefix = void 0;
function getGlobalPrefix(app) {
    const internalConfigRef = app.config;
    return (internalConfigRef && internalConfigRef.getGlobalPrefix()) || '';
}
exports.getGlobalPrefix = getGlobalPrefix;
