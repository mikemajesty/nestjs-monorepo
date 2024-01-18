"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refs = exports.getSchemaPath = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
function getSchemaPath(model) {
    const modelName = (0, shared_utils_1.isString)(model) ? model : model && model.name;
    return `#/components/schemas/${modelName}`;
}
exports.getSchemaPath = getSchemaPath;
function refs(...models) {
    return models.map((item) => ({
        $ref: getSchemaPath(item.name)
    }));
}
exports.refs = refs;
