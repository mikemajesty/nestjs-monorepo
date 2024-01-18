"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicRunner = void 0;
const abstract_runner_1 = require("./abstract.runner");
class SchematicRunner extends abstract_runner_1.AbstractRunner {
    constructor() {
        super(`node`, [`"${SchematicRunner.findClosestSchematicsBinary()}"`]);
    }
    static getModulePaths() {
        return module.paths;
    }
    static findClosestSchematicsBinary() {
        try {
            return require.resolve('@angular-devkit/schematics-cli/bin/schematics.js', { paths: this.getModulePaths() });
        }
        catch {
            throw new Error("'schematics' binary path could not be found!");
        }
    }
}
exports.SchematicRunner = SchematicRunner;
