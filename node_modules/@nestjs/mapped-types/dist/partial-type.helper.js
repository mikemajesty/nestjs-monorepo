"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialType = void 0;
const type_helpers_utils_1 = require("./type-helpers.utils");
function PartialType(classRef) {
    class PartialClassType {
        constructor() {
            (0, type_helpers_utils_1.inheritPropertyInitializers)(this, classRef);
        }
    }
    const propertyKeys = (0, type_helpers_utils_1.inheritValidationMetadata)(classRef, PartialClassType);
    (0, type_helpers_utils_1.inheritTransformationMetadata)(classRef, PartialClassType);
    if (propertyKeys) {
        propertyKeys.forEach((key) => {
            (0, type_helpers_utils_1.applyIsOptionalDecorator)(PartialClassType, key);
        });
    }
    Object.defineProperty(PartialClassType, 'name', {
        value: `Partial${classRef.name}`,
    });
    return PartialClassType;
}
exports.PartialType = PartialType;
