"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseObjectFactory = void 0;
const lodash_1 = require("lodash");
const is_built_in_type_util_1 = require("../utils/is-built-in-type.util");
const mimetype_content_wrapper_1 = require("./mimetype-content-wrapper");
const model_properties_accessor_1 = require("./model-properties-accessor");
const response_object_mapper_1 = require("./response-object-mapper");
const schema_object_factory_1 = require("./schema-object-factory");
const swagger_types_mapper_1 = require("./swagger-types-mapper");
class ResponseObjectFactory {
    constructor() {
        this.mimetypeContentWrapper = new mimetype_content_wrapper_1.MimetypeContentWrapper();
        this.modelPropertiesAccessor = new model_properties_accessor_1.ModelPropertiesAccessor();
        this.swaggerTypesMapper = new swagger_types_mapper_1.SwaggerTypesMapper();
        this.schemaObjectFactory = new schema_object_factory_1.SchemaObjectFactory(this.modelPropertiesAccessor, this.swaggerTypesMapper);
        this.responseObjectMapper = new response_object_mapper_1.ResponseObjectMapper();
    }
    create(response, produces, schemas) {
        const { type, isArray } = response;
        response = (0, lodash_1.omit)(response, ['isArray']);
        if (!type) {
            return this.responseObjectMapper.wrapSchemaWithContent(response, produces);
        }
        if ((0, is_built_in_type_util_1.isBuiltInType)(type)) {
            const typeName = type && (0, lodash_1.isFunction)(type) ? type.name : type;
            const swaggerType = this.swaggerTypesMapper.mapTypeToOpenAPIType(typeName);
            if (isArray) {
                const content = this.mimetypeContentWrapper.wrap(produces, {
                    schema: {
                        type: 'array',
                        items: {
                            type: swaggerType
                        }
                    }
                });
                return Object.assign(Object.assign({}, response), content);
            }
            const content = this.mimetypeContentWrapper.wrap(produces, {
                schema: {
                    type: swaggerType
                }
            });
            return Object.assign(Object.assign({}, response), content);
        }
        const name = this.schemaObjectFactory.exploreModelSchema(type, schemas);
        if (isArray) {
            return this.responseObjectMapper.toArrayRefObject(response, name, produces);
        }
        return this.responseObjectMapper.toRefObject(response, name, produces);
    }
}
exports.ResponseObjectFactory = ResponseObjectFactory;
