"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const type_metadata_storage_1 = require("../storages/type-metadata.storage");
function Schema(options) {
    return (target) => {
        type_metadata_storage_1.TypeMetadataStorage.addSchemaMetadata({
            target,
            options,
        });
    };
}
exports.Schema = Schema;
