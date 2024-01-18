"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionFactory = void 0;
const runners_1 = require("../runners");
const collection_1 = require("./collection");
const custom_collection_1 = require("./custom.collection");
const nest_collection_1 = require("./nest.collection");
class CollectionFactory {
    static create(collection) {
        const schematicRunner = runners_1.RunnerFactory.create(runners_1.Runner.SCHEMATIC);
        if (collection === collection_1.Collection.NESTJS) {
            return new nest_collection_1.NestCollection(schematicRunner);
        }
        else {
            return new custom_collection_1.CustomCollection(collection, schematicRunner);
        }
    }
}
exports.CollectionFactory = CollectionFactory;
