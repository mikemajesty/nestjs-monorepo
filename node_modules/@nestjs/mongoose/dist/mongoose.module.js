"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MongooseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_core_module_1 = require("./mongoose-core.module");
const mongoose_providers_1 = require("./mongoose.providers");
let MongooseModule = exports.MongooseModule = MongooseModule_1 = class MongooseModule {
    static forRoot(uri, options = {}) {
        return {
            module: MongooseModule_1,
            imports: [mongoose_core_module_1.MongooseCoreModule.forRoot(uri, options)],
        };
    }
    static forRootAsync(options) {
        return {
            module: MongooseModule_1,
            imports: [mongoose_core_module_1.MongooseCoreModule.forRootAsync(options)],
        };
    }
    static forFeature(models = [], connectionName) {
        const providers = (0, mongoose_providers_1.createMongooseProviders)(connectionName, models);
        return {
            module: MongooseModule_1,
            providers: providers,
            exports: providers,
        };
    }
    static forFeatureAsync(factories = [], connectionName) {
        const providers = (0, mongoose_providers_1.createMongooseAsyncProviders)(connectionName, factories);
        const imports = factories.map((factory) => factory.imports || []);
        const uniqImports = new Set((0, common_1.flatten)(imports));
        return {
            module: MongooseModule_1,
            imports: [...uniqImports],
            providers: providers,
            exports: providers,
        };
    }
};
exports.MongooseModule = MongooseModule = MongooseModule_1 = __decorate([
    (0, common_1.Module)({})
], MongooseModule);
