"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendMetadata = void 0;
require("reflect-metadata");
function extendMetadata(metadata, metakey, target) {
    const existingMetadata = Reflect.getMetadata(metakey, target);
    if (!existingMetadata) {
        return metadata;
    }
    return existingMetadata.concat(metadata);
}
exports.extendMetadata = extendMetadata;
