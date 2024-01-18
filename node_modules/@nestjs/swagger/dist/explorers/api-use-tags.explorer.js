"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exploreApiTagsMetadata = exports.exploreGlobalApiTagsMetadata = void 0;
const constants_1 = require("../constants");
const exploreGlobalApiTagsMetadata = (metatype) => {
    const tags = Reflect.getMetadata(constants_1.DECORATORS.API_TAGS, metatype);
    return tags ? { tags } : undefined;
};
exports.exploreGlobalApiTagsMetadata = exploreGlobalApiTagsMetadata;
const exploreApiTagsMetadata = (instance, prototype, method) => Reflect.getMetadata(constants_1.DECORATORS.API_TAGS, method);
exports.exploreApiTagsMetadata = exploreApiTagsMetadata;
