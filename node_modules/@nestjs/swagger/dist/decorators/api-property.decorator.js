"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseProperty = exports.ApiPropertyOptional = exports.createApiPropertyDecorator = exports.ApiProperty = void 0;
const constants_1 = require("../constants");
const enum_utils_1 = require("../utils/enum.utils");
const helpers_1 = require("./helpers");
const isEnumArray = (obj) => obj.isArray && !!obj.enum;
function ApiProperty(options = {}) {
    return createApiPropertyDecorator(options);
}
exports.ApiProperty = ApiProperty;
function createApiPropertyDecorator(options = {}, overrideExisting = true) {
    const [type, isArray] = (0, helpers_1.getTypeIsArrayTuple)(options.type, options.isArray);
    options = Object.assign(Object.assign({}, options), { type,
        isArray });
    if (isEnumArray(options)) {
        options.type = 'array';
        const enumValues = (0, enum_utils_1.getEnumValues)(options.enum);
        options.items = {
            type: (0, enum_utils_1.getEnumType)(enumValues),
            enum: enumValues
        };
        delete options.enum;
    }
    else if (options.enum) {
        const enumValues = (0, enum_utils_1.getEnumValues)(options.enum);
        options.enum = enumValues;
        options.type = (0, enum_utils_1.getEnumType)(enumValues);
    }
    if (Array.isArray(options.type)) {
        options.type = 'array';
        options.items = {
            type: 'array',
            items: {
                type: options.type[0]
            }
        };
    }
    return (0, helpers_1.createPropertyDecorator)(constants_1.DECORATORS.API_MODEL_PROPERTIES, options, overrideExisting);
}
exports.createApiPropertyDecorator = createApiPropertyDecorator;
function ApiPropertyOptional(options = {}) {
    return ApiProperty(Object.assign(Object.assign({}, options), { required: false }));
}
exports.ApiPropertyOptional = ApiPropertyOptional;
function ApiResponseProperty(options = {}) {
    return ApiProperty(Object.assign({ readOnly: true }, options));
}
exports.ApiResponseProperty = ApiResponseProperty;
