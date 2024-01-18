"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopeEnum = void 0;
const ensure = __importStar(require("@commitlint/ensure"));
const message_1 = __importDefault(require("@commitlint/message"));
const scopeEnum = ({ scope }, when = 'always', value = []) => {
    if (!scope || !value.length) {
        return [true, ''];
    }
    // Scopes may contain slash or comma delimiters to separate them and mark them as individual segments.
    // This means that each of these segments should be tested separately with `ensure`.
    const delimiters = /\/|\\|, ?/g;
    const messageScopes = scope.split(delimiters);
    const errorMessage = ['scope must', `be one of [${value.join(', ')}]`];
    const isScopeInEnum = (scope) => ensure.enum(scope, value);
    let isValid;
    if (when === 'never') {
        isValid = !messageScopes.some(isScopeInEnum);
        errorMessage.splice(1, 0, 'not');
    }
    else {
        isValid = messageScopes.every(isScopeInEnum);
    }
    return [isValid, (0, message_1.default)(errorMessage)];
};
exports.scopeEnum = scopeEnum;
//# sourceMappingURL=scope-enum.js.map