"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const testing_module_builder_1 = require("./testing-module.builder");
class Test {
    static createTestingModule(metadata) {
        return new testing_module_builder_1.TestingModuleBuilder(this.metadataScanner, metadata);
    }
}
exports.Test = Test;
Test.metadataScanner = new metadata_scanner_1.MetadataScanner();
