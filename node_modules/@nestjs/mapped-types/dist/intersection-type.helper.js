"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntersectionType = void 0;
const type_helpers_utils_1 = require("./type-helpers.utils");
function IntersectionType(...classRefs) {
    class IntersectionClassType {
        constructor() {
            classRefs.forEach((classRef) => {
                (0, type_helpers_utils_1.inheritPropertyInitializers)(this, classRef);
            });
        }
    }
    classRefs.forEach((classRef) => {
        (0, type_helpers_utils_1.inheritValidationMetadata)(classRef, IntersectionClassType);
        (0, type_helpers_utils_1.inheritTransformationMetadata)(classRef, IntersectionClassType);
    });
    const intersectedNames = classRefs.reduce((prev, ref) => prev + ref.name, '');
    Object.defineProperty(IntersectionClassType, 'name', {
        value: `Intersection${intersectedNames}`,
    });
    return IntersectionClassType;
}
exports.IntersectionType = IntersectionType;
