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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inheritValidationMetadata = exports.inheritTransformationMetadata = exports.inheritPropertyInitializers = exports.applyIsOptionalDecorator = void 0;
__exportStar(require("./intersection-type.helper"), exports);
__exportStar(require("./mapped-type.interface"), exports);
__exportStar(require("./omit-type.helper"), exports);
__exportStar(require("./partial-type.helper"), exports);
__exportStar(require("./pick-type.helper"), exports);
var type_helpers_utils_1 = require("./type-helpers.utils");
Object.defineProperty(exports, "applyIsOptionalDecorator", { enumerable: true, get: function () { return type_helpers_utils_1.applyIsOptionalDecorator; } });
Object.defineProperty(exports, "inheritPropertyInitializers", { enumerable: true, get: function () { return type_helpers_utils_1.inheritPropertyInitializers; } });
Object.defineProperty(exports, "inheritTransformationMetadata", { enumerable: true, get: function () { return type_helpers_utils_1.inheritTransformationMetadata; } });
Object.defineProperty(exports, "inheritValidationMetadata", { enumerable: true, get: function () { return type_helpers_utils_1.inheritValidationMetadata; } });
