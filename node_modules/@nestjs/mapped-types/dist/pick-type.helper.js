"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickType = void 0;
const type_helpers_utils_1 = require("./type-helpers.utils");
function PickType(classRef, keys) {
    const isInheritedPredicate = (propertyKey) => keys.includes(propertyKey);
    class PickClassType {
        constructor() {
            (0, type_helpers_utils_1.inheritPropertyInitializers)(this, classRef, isInheritedPredicate);
        }
    }
    (0, type_helpers_utils_1.inheritValidationMetadata)(classRef, PickClassType, isInheritedPredicate);
    (0, type_helpers_utils_1.inheritTransformationMetadata)(classRef, PickClassType, isInheritedPredicate);
    return PickClassType;
}
exports.PickType = PickType;
