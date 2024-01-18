"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaFactory = void 0;
const mongoose = require("mongoose");
const type_metadata_storage_1 = require("../storages/type-metadata.storage");
const definitions_factory_1 = require("./definitions.factory");
class SchemaFactory {
    static createForClass(target) {
        const schemaDefinition = definitions_factory_1.DefinitionsFactory.createForClass(target);
        const schemaMetadata = type_metadata_storage_1.TypeMetadataStorage.getSchemaMetadataByTarget(target);
        const schemaOpts = schemaMetadata?.options;
        return new mongoose.Schema(schemaDefinition, schemaOpts);
    }
}
exports.SchemaFactory = SchemaFactory;
