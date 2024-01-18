"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerTypesMapper = void 0;
const lodash_1 = require("lodash");
class SwaggerTypesMapper {
    constructor() {
        this.keysToRemove = [
            'type',
            'isArray',
            'enum',
            'enumName',
            'items',
            '$ref',
            ...this.getSchemaOptionsKeys()
        ];
    }
    mapParamTypes(parameters) {
        return parameters.map((param) => {
            if (this.hasSchemaDefinition(param)) {
                return this.omitParamKeys(param);
            }
            const { type } = param;
            const typeName = type && (0, lodash_1.isFunction)(type)
                ? this.mapTypeToOpenAPIType(type.name)
                : this.mapTypeToOpenAPIType(type);
            const paramWithTypeMetadata = (0, lodash_1.omitBy)(Object.assign(Object.assign({}, param), { type: typeName }), lodash_1.isUndefined);
            if (this.isEnumArrayType(paramWithTypeMetadata)) {
                return this.mapEnumArrayType(paramWithTypeMetadata, this.keysToRemove);
            }
            else if (paramWithTypeMetadata.isArray) {
                return this.mapArrayType(paramWithTypeMetadata, this.keysToRemove);
            }
            return Object.assign(Object.assign({}, (0, lodash_1.omit)(param, this.keysToRemove)), { schema: (0, lodash_1.omitBy)(Object.assign(Object.assign(Object.assign({}, this.getSchemaOptions(param)), (param.schema || {})), { enum: paramWithTypeMetadata.enum, type: paramWithTypeMetadata.type, $ref: paramWithTypeMetadata.$ref }), lodash_1.isUndefined) });
        });
    }
    mapTypeToOpenAPIType(type) {
        if (!(type && type.charAt)) {
            return;
        }
        return type.charAt(0).toLowerCase() + type.slice(1);
    }
    mapEnumArrayType(param, keysToRemove) {
        return Object.assign(Object.assign({}, (0, lodash_1.omit)(param, keysToRemove)), { schema: Object.assign(Object.assign({}, this.getSchemaOptions(param)), { type: 'array', items: param.items }) });
    }
    mapArrayType(param, keysToRemove) {
        const items = param.items ||
            (0, lodash_1.omitBy)(Object.assign(Object.assign({}, (param.schema || {})), { enum: param.enum, type: this.mapTypeToOpenAPIType(param.type) }), lodash_1.isUndefined);
        return Object.assign(Object.assign({}, (0, lodash_1.omit)(param, keysToRemove)), { schema: Object.assign(Object.assign({}, this.getSchemaOptions(param)), { type: 'array', items }) });
    }
    getSchemaOptions(param) {
        const schemaKeys = this.getSchemaOptionsKeys();
        const optionsObject = schemaKeys.reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: param[key] })), {});
        return (0, lodash_1.omitBy)(optionsObject, lodash_1.isUndefined);
    }
    isEnumArrayType(param) {
        return param.isArray && param.items && param.items.enum;
    }
    hasSchemaDefinition(param) {
        return !!param.schema;
    }
    omitParamKeys(param) {
        return (0, lodash_1.omit)(param, this.keysToRemove);
    }
    getSchemaOptionsKeys() {
        return [
            'properties',
            'patternProperties',
            'additionalProperties',
            'minimum',
            'maximum',
            'maxProperties',
            'minItems',
            'minProperties',
            'maxItems',
            'minLength',
            'maxLength',
            'exclusiveMaximum',
            'exclusiveMinimum',
            'uniqueItems',
            'title',
            'format',
            'pattern',
            'nullable',
            'default'
        ];
    }
}
exports.SwaggerTypesMapper = SwaggerTypesMapper;
