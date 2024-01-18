"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const constants_1 = require("@nestjs/common/constants");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const iterare_1 = require("iterare");
const application_config_1 = require("../application-config");
const exceptions_1 = require("../errors/exceptions");
const context_id_factory_1 = require("../helpers/context-id-factory");
const get_class_scope_1 = require("../helpers/get-class-scope");
const is_durable_1 = require("../helpers/is-durable");
const uuid_factory_1 = require("../inspector/uuid-factory");
const constants_2 = require("./constants");
const instance_wrapper_1 = require("./instance-wrapper");
const module_ref_1 = require("./module-ref");
class Module {
    constructor(_metatype, container) {
        this._metatype = _metatype;
        this.container = container;
        this._imports = new Set();
        this._providers = new Map();
        this._injectables = new Map();
        this._middlewares = new Map();
        this._controllers = new Map();
        this._entryProviderKeys = new Set();
        this._exports = new Set();
        this._distance = 0;
        this._initOnPreview = false;
        this._isGlobal = false;
        this.addCoreProviders();
        this._id = this.generateUuid();
    }
    get id() {
        return this._id;
    }
    get token() {
        return this._token;
    }
    set token(token) {
        this._token = token;
    }
    get name() {
        return this.metatype.name;
    }
    get isGlobal() {
        return this._isGlobal;
    }
    set isGlobal(global) {
        this._isGlobal = global;
    }
    get initOnPreview() {
        return this._initOnPreview;
    }
    set initOnPreview(initOnPreview) {
        this._initOnPreview = initOnPreview;
    }
    get providers() {
        return this._providers;
    }
    get middlewares() {
        return this._middlewares;
    }
    get imports() {
        return this._imports;
    }
    get injectables() {
        return this._injectables;
    }
    get controllers() {
        return this._controllers;
    }
    get entryProviders() {
        return Array.from(this._entryProviderKeys).map(token => this.providers.get(token));
    }
    get exports() {
        return this._exports;
    }
    get instance() {
        if (!this._providers.has(this._metatype)) {
            throw new exceptions_1.RuntimeException();
        }
        const module = this._providers.get(this._metatype);
        return module.instance;
    }
    get metatype() {
        return this._metatype;
    }
    get distance() {
        return this._distance;
    }
    set distance(value) {
        this._distance = value;
    }
    addCoreProviders() {
        this.addModuleAsProvider();
        this.addModuleRef();
        this.addApplicationConfig();
    }
    addModuleRef() {
        const moduleRef = this.createModuleReferenceType();
        this._providers.set(module_ref_1.ModuleRef, new instance_wrapper_1.InstanceWrapper({
            token: module_ref_1.ModuleRef,
            name: module_ref_1.ModuleRef.name,
            metatype: module_ref_1.ModuleRef,
            isResolved: true,
            instance: new moduleRef(),
            host: this,
        }));
    }
    addModuleAsProvider() {
        this._providers.set(this._metatype, new instance_wrapper_1.InstanceWrapper({
            token: this._metatype,
            name: this._metatype.name,
            metatype: this._metatype,
            isResolved: false,
            instance: null,
            host: this,
        }));
    }
    addApplicationConfig() {
        this._providers.set(application_config_1.ApplicationConfig, new instance_wrapper_1.InstanceWrapper({
            token: application_config_1.ApplicationConfig,
            name: application_config_1.ApplicationConfig.name,
            isResolved: true,
            instance: this.container.applicationConfig,
            host: this,
        }));
    }
    addInjectable(injectable, enhancerSubtype, host) {
        if (this.isCustomProvider(injectable)) {
            return this.addCustomProvider(injectable, this._injectables, enhancerSubtype);
        }
        let instanceWrapper = this.injectables.get(injectable);
        if (!instanceWrapper) {
            instanceWrapper = new instance_wrapper_1.InstanceWrapper({
                token: injectable,
                name: injectable.name,
                metatype: injectable,
                instance: null,
                isResolved: false,
                scope: (0, get_class_scope_1.getClassScope)(injectable),
                durable: (0, is_durable_1.isDurable)(injectable),
                subtype: enhancerSubtype,
                host: this,
            });
            this._injectables.set(injectable, instanceWrapper);
        }
        if (host) {
            const hostWrapper = this._controllers.get(host) || this._providers.get(host);
            hostWrapper && hostWrapper.addEnhancerMetadata(instanceWrapper);
        }
        return instanceWrapper;
    }
    addProvider(provider, enhancerSubtype) {
        if (this.isCustomProvider(provider)) {
            if (this.isEntryProvider(provider.provide)) {
                this._entryProviderKeys.add(provider.provide);
            }
            return this.addCustomProvider(provider, this._providers, enhancerSubtype);
        }
        this._providers.set(provider, new instance_wrapper_1.InstanceWrapper({
            token: provider,
            name: provider.name,
            metatype: provider,
            instance: null,
            isResolved: false,
            scope: (0, get_class_scope_1.getClassScope)(provider),
            durable: (0, is_durable_1.isDurable)(provider),
            host: this,
        }));
        if (this.isEntryProvider(provider)) {
            this._entryProviderKeys.add(provider);
        }
        return provider;
    }
    isCustomProvider(provider) {
        return !(0, shared_utils_1.isNil)(provider.provide);
    }
    addCustomProvider(provider, collection, enhancerSubtype) {
        if (this.isCustomClass(provider)) {
            this.addCustomClass(provider, collection, enhancerSubtype);
        }
        else if (this.isCustomValue(provider)) {
            this.addCustomValue(provider, collection, enhancerSubtype);
        }
        else if (this.isCustomFactory(provider)) {
            this.addCustomFactory(provider, collection, enhancerSubtype);
        }
        else if (this.isCustomUseExisting(provider)) {
            this.addCustomUseExisting(provider, collection, enhancerSubtype);
        }
        return provider.provide;
    }
    isCustomClass(provider) {
        return !(0, shared_utils_1.isUndefined)(provider.useClass);
    }
    isCustomValue(provider) {
        return ((0, shared_utils_1.isObject)(provider) &&
            Object.prototype.hasOwnProperty.call(provider, 'useValue'));
    }
    isCustomFactory(provider) {
        return !(0, shared_utils_1.isUndefined)(provider.useFactory);
    }
    isCustomUseExisting(provider) {
        return !(0, shared_utils_1.isUndefined)(provider.useExisting);
    }
    isDynamicModule(exported) {
        return exported && exported.module;
    }
    addCustomClass(provider, collection, enhancerSubtype) {
        let { scope, durable } = provider;
        const { useClass } = provider;
        if ((0, shared_utils_1.isUndefined)(scope)) {
            scope = (0, get_class_scope_1.getClassScope)(useClass);
        }
        if ((0, shared_utils_1.isUndefined)(durable)) {
            durable = (0, is_durable_1.isDurable)(useClass);
        }
        const token = provider.provide;
        collection.set(token, new instance_wrapper_1.InstanceWrapper({
            token,
            name: useClass?.name || useClass,
            metatype: useClass,
            instance: null,
            isResolved: false,
            scope,
            durable,
            host: this,
            subtype: enhancerSubtype,
        }));
    }
    addCustomValue(provider, collection, enhancerSubtype) {
        const { useValue: value, provide: providerToken } = provider;
        collection.set(providerToken, new instance_wrapper_1.InstanceWrapper({
            token: providerToken,
            name: providerToken?.name || providerToken,
            metatype: null,
            instance: value,
            isResolved: true,
            async: value instanceof Promise,
            host: this,
            subtype: enhancerSubtype,
        }));
    }
    addCustomFactory(provider, collection, enhancerSubtype) {
        const { useFactory: factory, inject, scope, durable, provide: providerToken, } = provider;
        collection.set(providerToken, new instance_wrapper_1.InstanceWrapper({
            token: providerToken,
            name: providerToken?.name || providerToken,
            metatype: factory,
            instance: null,
            isResolved: false,
            inject: inject || [],
            scope,
            durable,
            host: this,
            subtype: enhancerSubtype,
        }));
    }
    addCustomUseExisting(provider, collection, enhancerSubtype) {
        const { useExisting, provide: providerToken } = provider;
        collection.set(providerToken, new instance_wrapper_1.InstanceWrapper({
            token: providerToken,
            name: providerToken?.name || providerToken,
            metatype: (instance => instance),
            instance: null,
            isResolved: false,
            inject: [useExisting],
            host: this,
            isAlias: true,
            subtype: enhancerSubtype,
        }));
    }
    addExportedProvider(provider) {
        const addExportedUnit = (token) => this._exports.add(this.validateExportedProvider(token));
        if (this.isCustomProvider(provider)) {
            return this.addCustomExportedProvider(provider);
        }
        else if ((0, shared_utils_1.isString)(provider) || (0, shared_utils_1.isSymbol)(provider)) {
            return addExportedUnit(provider);
        }
        else if (this.isDynamicModule(provider)) {
            const { module: moduleClassRef } = provider;
            return addExportedUnit(moduleClassRef);
        }
        addExportedUnit(provider);
    }
    addCustomExportedProvider(provider) {
        const provide = provider.provide;
        if ((0, shared_utils_1.isString)(provide) || (0, shared_utils_1.isSymbol)(provide)) {
            return this._exports.add(this.validateExportedProvider(provide));
        }
        this._exports.add(this.validateExportedProvider(provide));
    }
    validateExportedProvider(token) {
        if (this._providers.has(token)) {
            return token;
        }
        const imports = (0, iterare_1.iterate)(this._imports.values())
            .filter(item => !!item)
            .map(({ metatype }) => metatype)
            .filter(metatype => !!metatype)
            .toArray();
        if (!imports.includes(token)) {
            const { name } = this.metatype;
            const providerName = (0, shared_utils_1.isFunction)(token) ? token.name : token;
            throw new exceptions_1.UnknownExportException(providerName, name);
        }
        return token;
    }
    addController(controller) {
        this._controllers.set(controller, new instance_wrapper_1.InstanceWrapper({
            token: controller,
            name: controller.name,
            metatype: controller,
            instance: null,
            isResolved: false,
            scope: (0, get_class_scope_1.getClassScope)(controller),
            durable: (0, is_durable_1.isDurable)(controller),
            host: this,
        }));
        this.assignControllerUniqueId(controller);
    }
    assignControllerUniqueId(controller) {
        Object.defineProperty(controller, constants_2.CONTROLLER_ID_KEY, {
            enumerable: false,
            writable: false,
            configurable: true,
            value: (0, random_string_generator_util_1.randomStringGenerator)(),
        });
    }
    addImport(moduleRef) {
        this._imports.add(moduleRef);
    }
    /**
     * @deprecated
     */
    addRelatedModule(module) {
        this._imports.add(module);
    }
    replace(toReplace, options) {
        if (options.isProvider && this.hasProvider(toReplace)) {
            const originalProvider = this._providers.get(toReplace);
            return originalProvider.mergeWith({ provide: toReplace, ...options });
        }
        else if (!options.isProvider && this.hasInjectable(toReplace)) {
            const originalInjectable = this._injectables.get(toReplace);
            return originalInjectable.mergeWith({
                provide: toReplace,
                ...options,
            });
        }
    }
    hasProvider(token) {
        return this._providers.has(token);
    }
    hasInjectable(token) {
        return this._injectables.has(token);
    }
    getProviderByKey(name) {
        return this._providers.get(name);
    }
    getProviderById(id) {
        return Array.from(this._providers.values()).find(item => item.id === id);
    }
    getControllerById(id) {
        return Array.from(this._controllers.values()).find(item => item.id === id);
    }
    getInjectableById(id) {
        return Array.from(this._injectables.values()).find(item => item.id === id);
    }
    getMiddlewareById(id) {
        return Array.from(this._middlewares.values()).find(item => item.id === id);
    }
    getNonAliasProviders() {
        return [...this._providers].filter(([_, wrapper]) => !wrapper.isAlias);
    }
    createModuleReferenceType() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        return class extends module_ref_1.ModuleRef {
            constructor() {
                super(self.container);
            }
            get(typeOrToken, options = {}) {
                options.strict ??= true;
                options.each ??= false;
                return this.find(typeOrToken, options.strict
                    ? {
                        moduleId: self.id,
                        each: options.each,
                    }
                    : options);
            }
            resolve(typeOrToken, contextId = (0, context_id_factory_1.createContextId)(), options = {}) {
                options.strict ??= true;
                options.each ??= false;
                return this.resolvePerContext(typeOrToken, self, contextId, options);
            }
            async create(type, contextId) {
                if (!(type && (0, shared_utils_1.isFunction)(type) && type.prototype)) {
                    throw new exceptions_1.InvalidClassException(type);
                }
                return this.instantiateClass(type, self, contextId);
            }
        };
    }
    isEntryProvider(metatype) {
        return typeof metatype === 'function'
            ? !!Reflect.getMetadata(constants_1.ENTRY_PROVIDER_WATERMARK, metatype)
            : false;
    }
    generateUuid() {
        const prefix = 'M_';
        const key = this.name?.toString() ?? this.token?.toString();
        return key ? uuid_factory_1.UuidFactory.get(`${prefix}_${key}`) : (0, random_string_generator_util_1.randomStringGenerator)();
    }
}
exports.Module = Module;
