"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseObjectMapper = void 0;
const lodash_1 = require("lodash");
const utils_1 = require("../utils");
const mimetype_content_wrapper_1 = require("./mimetype-content-wrapper");
class ResponseObjectMapper {
    constructor() {
        this.mimetypeContentWrapper = new mimetype_content_wrapper_1.MimetypeContentWrapper();
    }
    toArrayRefObject(response, name, produces) {
        return Object.assign(Object.assign({}, response), this.mimetypeContentWrapper.wrap(produces, {
            schema: {
                type: 'array',
                items: {
                    $ref: (0, utils_1.getSchemaPath)(name)
                }
            }
        }));
    }
    toRefObject(response, name, produces) {
        return Object.assign(Object.assign({}, response), this.mimetypeContentWrapper.wrap(produces, {
            schema: {
                $ref: (0, utils_1.getSchemaPath)(name)
            }
        }));
    }
    wrapSchemaWithContent(response, produces) {
        if (!response.schema) {
            return response;
        }
        const content = this.mimetypeContentWrapper.wrap(produces, {
            schema: response.schema
        });
        return Object.assign(Object.assign({}, (0, lodash_1.omit)(response, 'schema')), content);
    }
}
exports.ResponseObjectMapper = ResponseObjectMapper;
