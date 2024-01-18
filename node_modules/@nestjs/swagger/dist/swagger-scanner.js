"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerScanner = void 0;
const constants_1 = require("@nestjs/common/constants");
const lodash_1 = require("lodash");
const model_properties_accessor_1 = require("./services/model-properties-accessor");
const schema_object_factory_1 = require("./services/schema-object-factory");
const swagger_types_mapper_1 = require("./services/swagger-types-mapper");
const swagger_explorer_1 = require("./swagger-explorer");
const swagger_transformer_1 = require("./swagger-transformer");
const get_global_prefix_1 = require("./utils/get-global-prefix");
const strip_last_slash_util_1 = require("./utils/strip-last-slash.util");
class SwaggerScanner {
    constructor() {
        this.transformer = new swagger_transformer_1.SwaggerTransformer();
        this.schemaObjectFactory = new schema_object_factory_1.SchemaObjectFactory(new model_properties_accessor_1.ModelPropertiesAccessor(), new swagger_types_mapper_1.SwaggerTypesMapper());
        this.explorer = new swagger_explorer_1.SwaggerExplorer(this.schemaObjectFactory);
    }
    scanApplication(app, options) {
        const { deepScanRoutes, include: includedModules = [], extraModels = [], ignoreGlobalPrefix = false, operationIdFactory } = options;
        const container = app.container;
        const internalConfigRef = app.config;
        const modules = this.getModules(container.getModules(), includedModules);
        const globalPrefix = !ignoreGlobalPrefix
            ? (0, strip_last_slash_util_1.stripLastSlash)((0, get_global_prefix_1.getGlobalPrefix)(app))
            : '';
        const denormalizedPaths = modules.map(({ controllers, metatype, imports }) => {
            let result = [];
            if (deepScanRoutes) {
                const isGlobal = (module) => !container.isGlobalModule(module);
                Array.from(imports.values())
                    .filter(isGlobal)
                    .forEach(({ metatype, controllers }) => {
                    const modulePath = this.getModulePathMetadata(container, metatype);
                    result = result.concat(this.scanModuleControllers(controllers, modulePath, globalPrefix, internalConfigRef, operationIdFactory));
                });
            }
            const modulePath = this.getModulePathMetadata(container, metatype);
            result = result.concat(this.scanModuleControllers(controllers, modulePath, globalPrefix, internalConfigRef, operationIdFactory));
            return this.transformer.unescapeColonsInPath(app, result);
        });
        const schemas = this.explorer.getSchemas();
        this.addExtraModels(schemas, extraModels);
        return Object.assign(Object.assign({}, this.transformer.normalizePaths((0, lodash_1.flatten)(denormalizedPaths))), { components: {
                schemas: schemas
            } });
    }
    scanModuleControllers(controller, modulePath, globalPrefix, applicationConfig, operationIdFactory) {
        const denormalizedArray = [...controller.values()].map((ctrl) => this.explorer.exploreController(ctrl, applicationConfig, modulePath, globalPrefix, operationIdFactory));
        return (0, lodash_1.flatten)(denormalizedArray);
    }
    getModules(modulesContainer, include) {
        if (!include || (0, lodash_1.isEmpty)(include)) {
            return [...modulesContainer.values()];
        }
        return [...modulesContainer.values()].filter(({ metatype }) => include.some((item) => item === metatype));
    }
    addExtraModels(schemas, extraModels) {
        extraModels.forEach((item) => {
            this.schemaObjectFactory.exploreModelSchema(item, schemas);
        });
    }
    getModulePathMetadata(container, metatype) {
        const modulesContainer = container.getModules();
        const modulePath = Reflect.getMetadata(constants_1.MODULE_PATH + modulesContainer.applicationId, metatype);
        return modulePath !== null && modulePath !== void 0 ? modulePath : Reflect.getMetadata(constants_1.MODULE_PATH, metatype);
    }
}
exports.SwaggerScanner = SwaggerScanner;
