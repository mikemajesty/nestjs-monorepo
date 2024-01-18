"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestContainer = void 0;
const constants_1 = require("@nestjs/common/constants");
const discoverable_meta_host_collection_1 = require("../discovery/discoverable-meta-host-collection");
const exceptions_1 = require("../errors/exceptions");
const initialize_on_preview_allowlist_1 = require("../inspector/initialize-on-preview.allowlist");
const serialized_graph_1 = require("../inspector/serialized-graph");
const request_constants_1 = require("../router/request/request-constants");
const compiler_1 = require("./compiler");
const internal_core_module_1 = require("./internal-core-module/internal-core-module");
const internal_providers_storage_1 = require("./internal-providers-storage");
const module_1 = require("./module");
const module_token_factory_1 = require("./module-token-factory");
const modules_container_1 = require("./modules-container");
class NestContainer {
    constructor(_applicationConfig = undefined) {
        this._applicationConfig = _applicationConfig;
        this.globalModules = new Set();
        this.moduleTokenFactory = new module_token_factory_1.ModuleTokenFactory();
        this.moduleCompiler = new compiler_1.ModuleCompiler(this.moduleTokenFactory);
        this.modules = new modules_container_1.ModulesContainer();
        this.dynamicModulesMetadata = new Map();
        this.internalProvidersStorage = new internal_providers_storage_1.InternalProvidersStorage();
        this._serializedGraph = new serialized_graph_1.SerializedGraph();
    }
    get serializedGraph() {
        return this._serializedGraph;
    }
    get applicationConfig() {
        return this._applicationConfig;
    }
    setHttpAdapter(httpAdapter) {
        this.internalProvidersStorage.httpAdapter = httpAdapter;
        if (!this.internalProvidersStorage.httpAdapterHost) {
            return;
        }
        const host = this.internalProvidersStorage.httpAdapterHost;
        host.httpAdapter = httpAdapter;
    }
    getHttpAdapterRef() {
        return this.internalProvidersStorage.httpAdapter;
    }
    getHttpAdapterHostRef() {
        return this.internalProvidersStorage.httpAdapterHost;
    }
    async addModule(metatype, scope) {
        // In DependenciesScanner#scanForModules we already check for undefined or invalid modules
        // We still need to catch the edge-case of `forwardRef(() => undefined)`
        if (!metatype) {
            throw new exceptions_1.UndefinedForwardRefException(scope);
        }
        const { type, dynamicMetadata, token } = await this.moduleCompiler.compile(metatype);
        if (this.modules.has(token)) {
            return {
                moduleRef: this.modules.get(token),
                inserted: true,
            };
        }
        return {
            moduleRef: await this.setModule({
                token,
                type,
                dynamicMetadata,
            }, scope),
            inserted: true,
        };
    }
    async replaceModule(metatypeToReplace, newMetatype, scope) {
        // In DependenciesScanner#scanForModules we already check for undefined or invalid modules
        // We still need to catch the edge-case of `forwardRef(() => undefined)`
        if (!metatypeToReplace || !newMetatype) {
            throw new exceptions_1.UndefinedForwardRefException(scope);
        }
        const { token } = await this.moduleCompiler.compile(metatypeToReplace);
        const { type, dynamicMetadata } = await this.moduleCompiler.compile(newMetatype);
        return {
            moduleRef: await this.setModule({
                token,
                type,
                dynamicMetadata,
            }, scope),
            inserted: false,
        };
    }
    async setModule({ token, dynamicMetadata, type }, scope) {
        const moduleRef = new module_1.Module(type, this);
        moduleRef.token = token;
        moduleRef.initOnPreview = this.shouldInitOnPreview(type);
        this.modules.set(token, moduleRef);
        const updatedScope = [].concat(scope, type);
        await this.addDynamicMetadata(token, dynamicMetadata, updatedScope);
        if (this.isGlobalModule(type, dynamicMetadata)) {
            moduleRef.isGlobal = true;
            this.addGlobalModule(moduleRef);
        }
        return moduleRef;
    }
    async addDynamicMetadata(token, dynamicModuleMetadata, scope) {
        if (!dynamicModuleMetadata) {
            return;
        }
        this.dynamicModulesMetadata.set(token, dynamicModuleMetadata);
        const { imports } = dynamicModuleMetadata;
        await this.addDynamicModules(imports, scope);
    }
    async addDynamicModules(modules, scope) {
        if (!modules) {
            return;
        }
        await Promise.all(modules.map(module => this.addModule(module, scope)));
    }
    isGlobalModule(metatype, dynamicMetadata) {
        if (dynamicMetadata && dynamicMetadata.global) {
            return true;
        }
        return !!Reflect.getMetadata(constants_1.GLOBAL_MODULE_METADATA, metatype);
    }
    addGlobalModule(module) {
        this.globalModules.add(module);
    }
    getModules() {
        return this.modules;
    }
    getModuleCompiler() {
        return this.moduleCompiler;
    }
    getModuleByKey(moduleKey) {
        return this.modules.get(moduleKey);
    }
    getInternalCoreModuleRef() {
        return this.internalCoreModule;
    }
    async addImport(relatedModule, token) {
        if (!this.modules.has(token)) {
            return;
        }
        const moduleRef = this.modules.get(token);
        const { token: relatedModuleToken } = await this.moduleCompiler.compile(relatedModule);
        const related = this.modules.get(relatedModuleToken);
        moduleRef.addImport(related);
    }
    addProvider(provider, token, enhancerSubtype) {
        const moduleRef = this.modules.get(token);
        if (!provider) {
            throw new exceptions_1.CircularDependencyException(moduleRef?.metatype.name);
        }
        if (!moduleRef) {
            throw new exceptions_1.UnknownModuleException();
        }
        const providerKey = moduleRef.addProvider(provider, enhancerSubtype);
        const providerRef = moduleRef.getProviderByKey(providerKey);
        discoverable_meta_host_collection_1.DiscoverableMetaHostCollection.inspectProvider(this.modules, providerRef);
        return providerKey;
    }
    addInjectable(injectable, token, enhancerSubtype, host) {
        if (!this.modules.has(token)) {
            throw new exceptions_1.UnknownModuleException();
        }
        const moduleRef = this.modules.get(token);
        return moduleRef.addInjectable(injectable, enhancerSubtype, host);
    }
    addExportedProvider(provider, token) {
        if (!this.modules.has(token)) {
            throw new exceptions_1.UnknownModuleException();
        }
        const moduleRef = this.modules.get(token);
        moduleRef.addExportedProvider(provider);
    }
    addController(controller, token) {
        if (!this.modules.has(token)) {
            throw new exceptions_1.UnknownModuleException();
        }
        const moduleRef = this.modules.get(token);
        moduleRef.addController(controller);
        const controllerRef = moduleRef.controllers.get(controller);
        discoverable_meta_host_collection_1.DiscoverableMetaHostCollection.inspectController(this.modules, controllerRef);
    }
    clear() {
        this.modules.clear();
    }
    replace(toReplace, options) {
        this.modules.forEach(moduleRef => moduleRef.replace(toReplace, options));
    }
    bindGlobalScope() {
        this.modules.forEach(moduleRef => this.bindGlobalsToImports(moduleRef));
    }
    bindGlobalsToImports(moduleRef) {
        this.globalModules.forEach(globalModule => this.bindGlobalModuleToModule(moduleRef, globalModule));
    }
    bindGlobalModuleToModule(target, globalModule) {
        if (target === globalModule || target === this.internalCoreModule) {
            return;
        }
        target.addImport(globalModule);
    }
    getDynamicMetadataByToken(token, metadataKey) {
        const metadata = this.dynamicModulesMetadata.get(token);
        return metadataKey ? metadata?.[metadataKey] ?? [] : metadata;
    }
    registerCoreModuleRef(moduleRef) {
        this.internalCoreModule = moduleRef;
        this.modules[internal_core_module_1.InternalCoreModule.name] = moduleRef;
    }
    getModuleTokenFactory() {
        return this.moduleTokenFactory;
    }
    registerRequestProvider(request, contextId) {
        const wrapper = this.internalCoreModule.getProviderByKey(request_constants_1.REQUEST);
        wrapper.setInstanceByContextId(contextId, {
            instance: request,
            isResolved: true,
        });
    }
    shouldInitOnPreview(type) {
        return initialize_on_preview_allowlist_1.InitializeOnPreviewAllowlist.has(type);
    }
}
exports.NestContainer = NestContainer;
