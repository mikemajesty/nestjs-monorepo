"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerExplorer = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("@nestjs/common/constants");
const interfaces_1 = require("@nestjs/common/interfaces");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const core_1 = require("@nestjs/core");
const route_path_factory_1 = require("@nestjs/core/router/route-path-factory");
const lodash_1 = require("lodash");
const pathToRegexp = require("path-to-regexp");
const constants_2 = require("./constants");
const api_exclude_controller_explorer_1 = require("./explorers/api-exclude-controller.explorer");
const api_exclude_endpoint_explorer_1 = require("./explorers/api-exclude-endpoint.explorer");
const api_extra_models_explorer_1 = require("./explorers/api-extra-models.explorer");
const api_headers_explorer_1 = require("./explorers/api-headers.explorer");
const api_operation_explorer_1 = require("./explorers/api-operation.explorer");
const api_parameters_explorer_1 = require("./explorers/api-parameters.explorer");
const api_response_explorer_1 = require("./explorers/api-response.explorer");
const api_security_explorer_1 = require("./explorers/api-security.explorer");
const api_use_tags_explorer_1 = require("./explorers/api-use-tags.explorer");
const mimetype_content_wrapper_1 = require("./services/mimetype-content-wrapper");
const is_body_parameter_util_1 = require("./utils/is-body-parameter.util");
const merge_and_uniq_util_1 = require("./utils/merge-and-uniq.util");
class SwaggerExplorer {
    constructor(schemaObjectFactory) {
        this.schemaObjectFactory = schemaObjectFactory;
        this.mimetypeContentWrapper = new mimetype_content_wrapper_1.MimetypeContentWrapper();
        this.metadataScanner = new core_1.MetadataScanner();
        this.schemas = {};
        this.operationIdFactory = (controllerKey, methodKey) => (controllerKey ? `${controllerKey}_${methodKey}` : methodKey);
    }
    exploreController(wrapper, applicationConfig, modulePath, globalPrefix, operationIdFactory) {
        this.routePathFactory = new route_path_factory_1.RoutePathFactory(applicationConfig);
        if (operationIdFactory) {
            this.operationIdFactory = operationIdFactory;
        }
        const { instance, metatype } = wrapper;
        const prototype = Object.getPrototypeOf(instance);
        const documentResolvers = {
            root: [
                this.exploreRoutePathAndMethod,
                api_operation_explorer_1.exploreApiOperationMetadata,
                api_parameters_explorer_1.exploreApiParametersMetadata.bind(null, this.schemas)
            ],
            security: [api_security_explorer_1.exploreApiSecurityMetadata],
            tags: [api_use_tags_explorer_1.exploreApiTagsMetadata],
            responses: [api_response_explorer_1.exploreApiResponseMetadata.bind(null, this.schemas)]
        };
        return this.generateDenormalizedDocument(metatype, prototype, instance, documentResolvers, applicationConfig, modulePath, globalPrefix);
    }
    getSchemas() {
        return this.schemas;
    }
    generateDenormalizedDocument(metatype, prototype, instance, documentResolvers, applicationConfig, modulePath, globalPrefix) {
        const self = this;
        const excludeController = (0, api_exclude_controller_explorer_1.exploreApiExcludeControllerMetadata)(metatype);
        if (excludeController) {
            return [];
        }
        const globalMetadata = this.exploreGlobalMetadata(metatype);
        const ctrlExtraModels = (0, api_extra_models_explorer_1.exploreGlobalApiExtraModelsMetadata)(metatype);
        this.registerExtraModels(ctrlExtraModels);
        const denormalizedPaths = this.metadataScanner.scanFromPrototype(instance, prototype, (name) => {
            const targetCallback = prototype[name];
            const excludeEndpoint = (0, api_exclude_endpoint_explorer_1.exploreApiExcludeEndpointMetadata)(instance, prototype, targetCallback);
            if (excludeEndpoint && excludeEndpoint.disable) {
                return;
            }
            const ctrlExtraModels = (0, api_extra_models_explorer_1.exploreApiExtraModelsMetadata)(instance, prototype, targetCallback);
            this.registerExtraModels(ctrlExtraModels);
            const methodMetadata = (0, lodash_1.mapValues)(documentResolvers, (explorers) => explorers.reduce((metadata, fn) => {
                const exploredMetadata = fn.call(self, instance, prototype, targetCallback, metatype, globalPrefix, modulePath, applicationConfig);
                if (!exploredMetadata) {
                    return metadata;
                }
                if (!(0, lodash_1.isArray)(exploredMetadata)) {
                    if (Array.isArray(metadata)) {
                        return metadata.map((item) => (Object.assign(Object.assign({}, item), exploredMetadata)));
                    }
                    return Object.assign(Object.assign({}, metadata), exploredMetadata);
                }
                return (0, lodash_1.isArray)(metadata)
                    ? [...metadata, ...exploredMetadata]
                    : exploredMetadata;
            }, {}));
            if (Array.isArray(methodMetadata.root)) {
                return methodMetadata.root.map((endpointMetadata) => {
                    endpointMetadata = (0, lodash_1.cloneDeep)(Object.assign(Object.assign({}, methodMetadata), { root: endpointMetadata }));
                    const mergedMethodMetadata = this.mergeMetadata(globalMetadata, (0, lodash_1.omitBy)(endpointMetadata, lodash_1.isEmpty));
                    return this.migrateOperationSchema(Object.assign(Object.assign({ responses: {} }, (0, lodash_1.omit)(globalMetadata, 'chunks')), mergedMethodMetadata), prototype, targetCallback);
                });
            }
            const mergedMethodMetadata = this.mergeMetadata(globalMetadata, (0, lodash_1.omitBy)(methodMetadata, lodash_1.isEmpty));
            return [
                this.migrateOperationSchema(Object.assign(Object.assign({ responses: {} }, (0, lodash_1.omit)(globalMetadata, 'chunks')), mergedMethodMetadata), prototype, targetCallback)
            ];
        });
        return (0, lodash_1.flatten)(denormalizedPaths).filter((path) => { var _a; return (_a = path.root) === null || _a === void 0 ? void 0 : _a.path; });
    }
    exploreGlobalMetadata(metatype) {
        const globalExplorers = [
            api_use_tags_explorer_1.exploreGlobalApiTagsMetadata,
            api_security_explorer_1.exploreGlobalApiSecurityMetadata,
            api_response_explorer_1.exploreGlobalApiResponseMetadata.bind(null, this.schemas),
            api_headers_explorer_1.exploreGlobalApiHeaderMetadata
        ];
        const globalMetadata = globalExplorers
            .map((explorer) => explorer.call(explorer, metatype))
            .filter((val) => !(0, shared_utils_1.isUndefined)(val))
            .reduce((curr, next) => {
            if (next.depth) {
                return Object.assign(Object.assign({}, curr), { chunks: (curr.chunks || []).concat(next) });
            }
            return Object.assign(Object.assign({}, curr), next);
        }, {});
        return globalMetadata;
    }
    exploreRoutePathAndMethod(instance, prototype, method, metatype, globalPrefix, modulePath, applicationConfig) {
        const methodPath = Reflect.getMetadata(constants_1.PATH_METADATA, method);
        if ((0, shared_utils_1.isUndefined)(methodPath)) {
            return undefined;
        }
        const requestMethod = Reflect.getMetadata(constants_1.METHOD_METADATA, method);
        const methodVersion = Reflect.getMetadata(constants_1.VERSION_METADATA, method);
        const versioningOptions = applicationConfig.getVersioning();
        const controllerVersion = this.getVersionMetadata(metatype, versioningOptions);
        const versionOrVersions = methodVersion !== null && methodVersion !== void 0 ? methodVersion : controllerVersion;
        const versions = this.getRoutePathVersions(versionOrVersions, versioningOptions);
        const allRoutePaths = this.routePathFactory.create({
            methodPath,
            methodVersion,
            modulePath,
            globalPrefix,
            controllerVersion,
            ctrlPath: this.reflectControllerPath(metatype),
            versioningOptions: applicationConfig.getVersioning()
        }, requestMethod);
        return (0, lodash_1.flatten)(allRoutePaths.map((routePath) => {
            const fullPath = this.validateRoutePath(routePath);
            const apiExtension = Reflect.getMetadata(constants_2.DECORATORS.API_EXTENSION, method);
            if (requestMethod === common_1.RequestMethod.ALL) {
                const validMethods = Object.values(common_1.RequestMethod).filter((meth) => meth !== 'ALL' && typeof meth === 'string');
                return validMethods.map((meth) => (Object.assign({ method: meth.toLowerCase(), path: fullPath === '' ? '/' : fullPath, operationId: `${this.getOperationId(instance, method)}_${meth.toLowerCase()}` }, apiExtension)));
            }
            const pathVersion = versions.find((v) => fullPath.includes(`/${v}/`));
            return Object.assign({ method: common_1.RequestMethod[requestMethod].toLowerCase(), path: fullPath === '' ? '/' : fullPath, operationId: this.getOperationId(instance, method, pathVersion) }, apiExtension);
        }));
    }
    getOperationId(instance, method, version) {
        var _a;
        return this.operationIdFactory(((_a = instance.constructor) === null || _a === void 0 ? void 0 : _a.name) || '', method.name, version);
    }
    getRoutePathVersions(versionValue, versioningOptions) {
        let versions = [];
        if (!versionValue || (versioningOptions === null || versioningOptions === void 0 ? void 0 : versioningOptions.type) !== common_1.VersioningType.URI) {
            return versions;
        }
        if (Array.isArray(versionValue)) {
            versions = versionValue.filter((v) => v !== interfaces_1.VERSION_NEUTRAL);
        }
        else if (versionValue !== interfaces_1.VERSION_NEUTRAL) {
            versions = [versionValue];
        }
        const prefix = this.routePathFactory.getVersionPrefix(versioningOptions);
        versions = versions.map((v) => `${prefix}${v}`);
        return versions;
    }
    reflectControllerPath(metatype) {
        return Reflect.getMetadata(constants_1.PATH_METADATA, metatype);
    }
    validateRoutePath(path) {
        if ((0, shared_utils_1.isUndefined)(path)) {
            return '';
        }
        if (Array.isArray(path)) {
            path = (0, lodash_1.head)(path);
        }
        let pathWithParams = '';
        for (const item of pathToRegexp.parse(path)) {
            pathWithParams += (0, shared_utils_1.isString)(item) ? item : `${item.prefix}{${item.name}}`;
        }
        return pathWithParams === '/' ? '' : (0, shared_utils_1.addLeadingSlash)(pathWithParams);
    }
    mergeMetadata(globalMetadata, methodMetadata) {
        if (methodMetadata.root && !methodMetadata.root.parameters) {
            methodMetadata.root.parameters = [];
        }
        const deepMerge = (metadata) => (value, key) => {
            if (!metadata[key]) {
                return value;
            }
            const globalValue = metadata[key];
            if (metadata.depth) {
                return this.deepMergeMetadata(globalValue, value, metadata.depth);
            }
            return this.mergeValues(globalValue, value);
        };
        if (globalMetadata.chunks) {
            const { chunks } = globalMetadata;
            chunks.forEach((chunk) => {
                methodMetadata = (0, lodash_1.mapValues)(methodMetadata, deepMerge(chunk));
            });
        }
        return (0, lodash_1.mapValues)(methodMetadata, deepMerge(globalMetadata));
    }
    deepMergeMetadata(globalValue, methodValue, maxDepth, currentDepthLevel = 0) {
        if (currentDepthLevel === maxDepth) {
            return this.mergeValues(globalValue, methodValue);
        }
        return (0, lodash_1.mapValues)(methodValue, (value, key) => {
            if (key in globalValue) {
                return this.deepMergeMetadata(globalValue[key], methodValue[key], maxDepth, currentDepthLevel + 1);
            }
            return value;
        });
    }
    mergeValues(globalValue, methodValue) {
        if (!(0, lodash_1.isArray)(globalValue)) {
            return Object.assign(Object.assign({}, globalValue), methodValue);
        }
        return [...globalValue, ...methodValue];
    }
    migrateOperationSchema(document, prototype, method) {
        const parametersObject = (0, lodash_1.get)(document, 'root.parameters');
        const requestBodyIndex = (parametersObject || []).findIndex(is_body_parameter_util_1.isBodyParameter);
        if (requestBodyIndex < 0) {
            return document;
        }
        const requestBody = parametersObject[requestBodyIndex];
        parametersObject.splice(requestBodyIndex, 1);
        const classConsumes = Reflect.getMetadata(constants_2.DECORATORS.API_CONSUMES, prototype);
        const methodConsumes = Reflect.getMetadata(constants_2.DECORATORS.API_CONSUMES, method);
        let consumes = (0, merge_and_uniq_util_1.mergeAndUniq)(classConsumes, methodConsumes);
        consumes = (0, lodash_1.isEmpty)(consumes) ? ['application/json'] : consumes;
        const keysToRemove = ['schema', 'in', 'name', 'examples'];
        document.root.requestBody = Object.assign(Object.assign({}, (0, lodash_1.omit)(requestBody, keysToRemove)), this.mimetypeContentWrapper.wrap(consumes, (0, lodash_1.pick)(requestBody, ['schema', 'examples'])));
        return document;
    }
    registerExtraModels(extraModels) {
        extraModels.forEach((item) => this.schemaObjectFactory.exploreModelSchema(item, this.schemas));
    }
    getVersionMetadata(metatype, versioningOptions) {
        var _a;
        if ((versioningOptions === null || versioningOptions === void 0 ? void 0 : versioningOptions.type) === common_1.VersioningType.URI) {
            return ((_a = Reflect.getMetadata(constants_1.VERSION_METADATA, metatype)) !== null && _a !== void 0 ? _a : versioningOptions.defaultVersion);
        }
    }
}
exports.SwaggerExplorer = SwaggerExplorer;
