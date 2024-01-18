"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCollection = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const abstract_collection_1 = require("./abstract.collection");
class CustomCollection extends abstract_collection_1.AbstractCollection {
    getSchematics() {
        const collectionPackagePath = (0, path_1.dirname)(require.resolve(this.collection));
        const collectionPath = (0, path_1.join)(collectionPackagePath, 'collection.json');
        const collection = JSON.parse((0, fs_1.readFileSync)(collectionPath, 'utf8'));
        const schematics = Object.entries(collection.schematics).map(([name, value]) => {
            const schematic = value;
            const description = schematic.description;
            const alias = schematic?.aliases?.length ? schematic.aliases[0] : '';
            return { name, description, alias };
        });
        return schematics;
    }
}
exports.CustomCollection = CustomCollection;
