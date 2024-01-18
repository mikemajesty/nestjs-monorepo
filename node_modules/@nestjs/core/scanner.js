"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependenciesScanner = void 0;
const constants_1 = require("@nestjs/common/constants");
const interfaces_1 = require("@nestjs/common/interfaces");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const iterare_1 = require("iterare");
const application_config_1 = require("./application-config");
const constants_2 = require("./constants");
const circular_dependency_exception_1 = require("./errors/exceptions/circular-dependency.exception");
const invalid_class_module_exception_1 = require("./errors/exceptions/invalid-class-module.exception");
const invalid_module_exception_1 = require("./errors/exceptions/invalid-module.exception");
const undefined_module_exception_1 = require("./errors/exceptions/undefined-module.exception");
const get_class_scope_1 = require("./helpers/get-class-scope");
const internal_core_module_factory_1 = require("./injector/internal-core-module/internal-core-module-factory");
const uuid_factory_1 = require("./inspector/uuid-factory");
class DependenciesScanner {
    constructor(container, metadataScanner, graphInspector, applicationConfig = new application_config_1.ApplicationConfig()) {
        this.container = container;
        this.metadataScanner = metadataScanner;
        this.graphInspector = graphInspector;
        this.applicationConfig = applicationConfig;
        this.applicationProvidersApplyMap = [];
    }
    async scan(module, options) {
        await this.registerCoreModule(options?.overrides);
        await this.scanForModules({
            moduleDefinition: module,
            overrides: options?.overrides,
        });
        await this.scanModulesForDependencies();
        this.calculateModulesDistance();
        this.addScopedEnhancersMetadata();
        this.container.bindGlobalScope();
    }
    async scanForModules({ moduleDefinition, lazy, scope = [], ctxRegistry = [], overrides = [], }) {
        const { moduleRef: moduleInstance, inserted: moduleInserted } = (await this.insertOrOverrideModule(moduleDefinition, overrides, scope)) ??
            {};
        moduleDefinition =
            this.getOverrideModuleByModule(moduleDefinition, overrides)?.newModule ??
                moduleDefinition;
        moduleDefinition =
            moduleDefinition instanceof Promise
                ? await moduleDefinition
                : moduleDefinition;
        ctxRegistry.push(moduleDefinition);
        if (this.isForwardReference(moduleDefinition)) {
            moduleDefinition = moduleDefinition.forwardRef();
        }
        const modules = !this.isDynamicModule(moduleDefinition)
            ? this.reflectMetadata(constants_1.MODULE_METADATA.IMPORTS, moduleDefinition)
            : [
                ...this.reflectMetadata(constants_1.MODULE_METADATA.IMPORTS, moduleDefinition.module),
                ...(moduleDefinition.imports || []),
            ];
        let registeredModuleRefs = [];
        for (const [index, innerModule] of modules.entries()) {
            // In case of a circular dependency (ES module system), JavaScript will resolve the type to `undefined`.
            if (innerModule === undefined) {
                throw new undefined_module_exception_1.UndefinedModuleException(moduleDefinition, index, scope);
            }
            if (!innerModule) {
                throw new invalid_module_exception_1.InvalidModuleException(moduleDefinition, index, scope);
            }
            if (ctxRegistry.includes(innerModule)) {
                continue;
            }
            const moduleRefs = await this.scanForModules({
                moduleDefinition: innerModule,
                scope: [].concat(scope, moduleDefinition),
                ctxRegistry,
                overrides,
                lazy,
            });
            registeredModuleRefs = registeredModuleRefs.concat(moduleRefs);
        }
        if (!moduleInstance) {
            return registeredModuleRefs;
        }
        if (lazy && moduleInserted) {
            this.container.bindGlobalsToImports(moduleInstance);
        }
        return [moduleInstance].concat(registeredModuleRefs);
    }
    async insertModule(moduleDefinition, scope) {
        const moduleToAdd = this.isForwardReference(moduleDefinition)
            ? moduleDefinition.forwardRef()
            : moduleDefinition;
        if (this.isInjectable(moduleToAdd) ||
            this.isController(moduleToAdd) ||
            this.isExceptionFilter(moduleToAdd)) {
            throw new invalid_class_module_exception_1.InvalidClassModuleException(moduleDefinition, scope);
        }
        return this.container.addModule(moduleToAdd, scope);
    }
    async scanModulesForDependencies(modules = this.container.getModules()) {
        for (const [token, { metatype }] of modules) {
            await this.reflectImports(metatype, token, metatype.name);
            this.reflectProviders(metatype, token);
            this.reflectControllers(metatype, token);
            this.reflectExports(metatype, token);
        }
    }
    async reflectImports(module, token, context) {
        const modules = [
            ...this.reflectMetadata(constants_1.MODULE_METADATA.IMPORTS, module),
            ...this.container.getDynamicMetadataByToken(token, constants_1.MODULE_METADATA.IMPORTS),
        ];
        for (const related of modules) {
            await this.insertImport(related, token, context);
        }
    }
    reflectProviders(module, token) {
        const providers = [
            ...this.reflectMetadata(constants_1.MODULE_METADATA.PROVIDERS, module),
            ...this.container.getDynamicMetadataByToken(token, constants_1.MODULE_METADATA.PROVIDERS),
        ];
        providers.forEach(provider => {
            this.insertProvider(provider, token);
            this.reflectDynamicMetadata(provider, token);
        });
    }
    reflectControllers(module, token) {
        const controllers = [
            ...this.reflectMetadata(constants_1.MODULE_METADATA.CONTROLLERS, module),
            ...this.container.getDynamicMetadataByToken(token, constants_1.MODULE_METADATA.CONTROLLERS),
        ];
        controllers.forEach(item => {
            this.insertController(item, token);
            this.reflectDynamicMetadata(item, token);
        });
    }
    reflectDynamicMetadata(cls, token) {
        if (!cls || !cls.prototype) {
            return;
        }
        this.reflectInjectables(cls, token, constants_1.GUARDS_METADATA);
        this.reflectInjectables(cls, token, constants_1.INTERCEPTORS_METADATA);
        this.reflectInjectables(cls, token, constants_1.EXCEPTION_FILTERS_METADATA);
        this.reflectInjectables(cls, token, constants_1.PIPES_METADATA);
        this.reflectParamInjectables(cls, token, constants_1.ROUTE_ARGS_METADATA);
    }
    reflectExports(module, token) {
        const exports = [
            ...this.reflectMetadata(constants_1.MODULE_METADATA.EXPORTS, module),
            ...this.container.getDynamicMetadataByToken(token, constants_1.MODULE_METADATA.EXPORTS),
        ];
        exports.forEach(exportedProvider => this.insertExportedProvider(exportedProvider, token));
    }
    reflectInjectables(component, token, metadataKey) {
        const controllerInjectables = this.reflectMetadata(metadataKey, component);
        const methodInjectables = this.metadataScanner
            .getAllMethodNames(component.prototype)
            .reduce((acc, method) => {
            const methodInjectable = this.reflectKeyMetadata(component, metadataKey, method);
            if (methodInjectable) {
                acc.push(methodInjectable);
            }
            return acc;
        }, []);
        controllerInjectables.forEach(injectable => this.insertInjectable(injectable, token, component, constants_1.ENHANCER_KEY_TO_SUBTYPE_MAP[metadataKey]));
        methodInjectables.forEach(methodInjectable => {
            methodInjectable.metadata.forEach(injectable => this.insertInjectable(injectable, token, component, constants_1.ENHANCER_KEY_TO_SUBTYPE_MAP[metadataKey], methodInjectable.methodKey));
        });
    }
    reflectParamInjectables(component, token, metadataKey) {
        const paramsMethods = this.metadataScanner.getAllMethodNames(component.prototype);
        paramsMethods.forEach(methodKey => {
            const metadata = Reflect.getMetadata(metadataKey, component, methodKey);
            if (!metadata) {
                return;
            }
            const params = Object.values(metadata);
            params
                .map(item => item.pipes)
                .flat(1)
                .forEach(injectable => this.insertInjectable(injectable, token, component, 'pipe', methodKey));
        });
    }
    reflectKeyMetadata(component, key, methodKey) {
        let prototype = component.prototype;
        do {
            const descriptor = Reflect.getOwnPropertyDescriptor(prototype, methodKey);
            if (!descriptor) {
                continue;
            }
            const metadata = Reflect.getMetadata(key, descriptor.value);
            if (!metadata) {
                return;
            }
            return { methodKey, metadata };
        } while ((prototype = Reflect.getPrototypeOf(prototype)) &&
            prototype !== Object.prototype &&
            prototype);
        return undefined;
    }
    calculateModulesDistance() {
        const modulesGenerator = this.container.getModules().values();
        // Skip "InternalCoreModule" from calculating distance
        modulesGenerator.next();
        const modulesStack = [];
        const calculateDistance = (moduleRef, distance = 1) => {
            if (!moduleRef || modulesStack.includes(moduleRef)) {
                return;
            }
            modulesStack.push(moduleRef);
            const moduleImports = moduleRef.imports;
            moduleImports.forEach(importedModuleRef => {
                if (importedModuleRef) {
                    if (distance > importedModuleRef.distance) {
                        importedModuleRef.distance = distance;
                    }
                    calculateDistance(importedModuleRef, distance + 1);
                }
            });
        };
        const rootModule = modulesGenerator.next().value;
        calculateDistance(rootModule);
    }
    async insertImport(related, token, context) {
        if ((0, shared_utils_1.isUndefined)(related)) {
            throw new circular_dependency_exception_1.CircularDependencyException(context);
        }
        if (this.isForwardReference(related)) {
            return this.container.addImport(related.forwardRef(), token);
        }
        await this.container.addImport(related, token);
    }
    isCustomProvider(provider) {
        return provider && !(0, shared_utils_1.isNil)(provider.provide);
    }
    insertProvider(provider, token) {
        const isCustomProvider = this.isCustomProvider(provider);
        if (!isCustomProvider) {
            return this.container.addProvider(provider, token);
        }
        const applyProvidersMap = this.getApplyProvidersMap();
        const providersKeys = Object.keys(applyProvidersMap);
        const type = provider.provide;
        if (!providersKeys.includes(type)) {
            return this.container.addProvider(provider, token);
        }
        const uuid = uuid_factory_1.UuidFactory.get(type.toString());
        const providerToken = `${type} (UUID: ${uuid})`;
        let scope = provider.scope;
        if ((0, shared_utils_1.isNil)(scope) && provider.useClass) {
            scope = (0, get_class_scope_1.getClassScope)(provider.useClass);
        }
        this.applicationProvidersApplyMap.push({
            type,
            moduleKey: token,
            providerKey: providerToken,
            scope,
        });
        const newProvider = {
            ...provider,
            provide: providerToken,
            scope,
        };
        const enhancerSubtype = constants_2.ENHANCER_TOKEN_TO_SUBTYPE_MAP[type];
        const factoryOrClassProvider = newProvider;
        if (this.isRequestOrTransient(factoryOrClassProvider.scope)) {
            return this.container.addInjectable(newProvider, token, enhancerSubtype);
        }
        this.container.addProvider(newProvider, token, enhancerSubtype);
    }
    insertInjectable(injectable, token, host, subtype, methodKey) {
        if ((0, shared_utils_1.isFunction)(injectable)) {
            const instanceWrapper = this.container.addInjectable(injectable, token, subtype, host);
            this.graphInspector.insertEnhancerMetadataCache({
                moduleToken: token,
                classRef: host,
                enhancerInstanceWrapper: instanceWrapper,
                targetNodeId: instanceWrapper.id,
                subtype,
                methodKey,
            });
            return instanceWrapper;
        }
        else {
            this.graphInspector.insertEnhancerMetadataCache({
                moduleToken: token,
                classRef: host,
                enhancerRef: injectable,
                methodKey,
                subtype,
            });
        }
    }
    insertExportedProvider(exportedProvider, token) {
        this.container.addExportedProvider(exportedProvider, token);
    }
    insertController(controller, token) {
        this.container.addController(controller, token);
    }
    insertOrOverrideModule(moduleDefinition, overrides, scope) {
        const overrideModule = this.getOverrideModuleByModule(moduleDefinition, overrides);
        if (overrideModule !== undefined) {
            return this.overrideModule(moduleDefinition, overrideModule.newModule, scope);
        }
        return this.insertModule(moduleDefinition, scope);
    }
    getOverrideModuleByModule(module, overrides) {
        if (this.isForwardReference(module)) {
            return overrides.find(moduleToOverride => {
                return (moduleToOverride.moduleToReplace === module.forwardRef() ||
                    moduleToOverride.moduleToReplace.forwardRef?.() === module.forwardRef());
            });
        }
        return overrides.find(moduleToOverride => moduleToOverride.moduleToReplace === module);
    }
    async overrideModule(moduleToOverride, newModule, scope) {
        return this.container.replaceModule(this.isForwardReference(moduleToOverride)
            ? moduleToOverride.forwardRef()
            : moduleToOverride, this.isForwardReference(newModule) ? newModule.forwardRef() : newModule, scope);
    }
    reflectMetadata(metadataKey, metatype) {
        return Reflect.getMetadata(metadataKey, metatype) || [];
    }
    async registerCoreModule(overrides) {
        const moduleDefinition = internal_core_module_factory_1.InternalCoreModuleFactory.create(this.container, this, this.container.getModuleCompiler(), this.container.getHttpAdapterHostRef(), this.graphInspector, overrides);
        const [instance] = await this.scanForModules({
            moduleDefinition,
            overrides,
        });
        this.container.registerCoreModuleRef(instance);
    }
    /**
     * Add either request or transient globally scoped enhancers
     * to all controllers metadata storage
     */
    addScopedEnhancersMetadata() {
        (0, iterare_1.iterate)(this.applicationProvidersApplyMap)
            .filter(wrapper => this.isRequestOrTransient(wrapper.scope))
            .forEach(({ moduleKey, providerKey }) => {
            const modulesContainer = this.container.getModules();
            const { injectables } = modulesContainer.get(moduleKey);
            const instanceWrapper = injectables.get(providerKey);
            const iterableIterator = modulesContainer.values();
            (0, iterare_1.iterate)(iterableIterator)
                .map(moduleRef => Array.from(moduleRef.controllers.values()).concat(moduleRef.entryProviders))
                .flatten()
                .forEach(controllerOrEntryProvider => controllerOrEntryProvider.addEnhancerMetadata(instanceWrapper));
        });
    }
    applyApplicationProviders() {
        const applyProvidersMap = this.getApplyProvidersMap();
        const applyRequestProvidersMap = this.getApplyRequestProvidersMap();
        const getInstanceWrapper = (moduleKey, providerKey, collectionKey) => {
            const modules = this.container.getModules();
            const collection = modules.get(moduleKey)[collectionKey];
            return collection.get(providerKey);
        };
        // Add global enhancers to the application config
        this.applicationProvidersApplyMap.forEach(({ moduleKey, providerKey, type, scope }) => {
            let instanceWrapper;
            if (this.isRequestOrTransient(scope)) {
                instanceWrapper = getInstanceWrapper(moduleKey, providerKey, 'injectables');
                this.graphInspector.insertAttachedEnhancer(instanceWrapper);
                return applyRequestProvidersMap[type](instanceWrapper);
            }
            instanceWrapper = getInstanceWrapper(moduleKey, providerKey, 'providers');
            this.graphInspector.insertAttachedEnhancer(instanceWrapper);
            applyProvidersMap[type](instanceWrapper.instance);
        });
    }
    getApplyProvidersMap() {
        return {
            [constants_2.APP_INTERCEPTOR]: (interceptor) => this.applicationConfig.addGlobalInterceptor(interceptor),
            [constants_2.APP_PIPE]: (pipe) => this.applicationConfig.addGlobalPipe(pipe),
            [constants_2.APP_GUARD]: (guard) => this.applicationConfig.addGlobalGuard(guard),
            [constants_2.APP_FILTER]: (filter) => this.applicationConfig.addGlobalFilter(filter),
        };
    }
    getApplyRequestProvidersMap() {
        return {
            [constants_2.APP_INTERCEPTOR]: (interceptor) => this.applicationConfig.addGlobalRequestInterceptor(interceptor),
            [constants_2.APP_PIPE]: (pipe) => this.applicationConfig.addGlobalRequestPipe(pipe),
            [constants_2.APP_GUARD]: (guard) => this.applicationConfig.addGlobalRequestGuard(guard),
            [constants_2.APP_FILTER]: (filter) => this.applicationConfig.addGlobalRequestFilter(filter),
        };
    }
    isDynamicModule(module) {
        return module && !!module.module;
    }
    /**
     * @param metatype
     * @returns `true` if `metatype` is annotated with the `@Injectable()` decorator.
     */
    isInjectable(metatype) {
        return !!Reflect.getMetadata(constants_1.INJECTABLE_WATERMARK, metatype);
    }
    /**
     * @param metatype
     * @returns `true` if `metatype` is annotated with the `@Controller()` decorator.
     */
    isController(metatype) {
        return !!Reflect.getMetadata(constants_1.CONTROLLER_WATERMARK, metatype);
    }
    /**
     * @param metatype
     * @returns `true` if `metatype` is annotated with the `@Catch()` decorator.
     */
    isExceptionFilter(metatype) {
        return !!Reflect.getMetadata(constants_1.CATCH_WATERMARK, metatype);
    }
    isForwardReference(module) {
        return module && !!module.forwardRef;
    }
    isRequestOrTransient(scope) {
        return scope === interfaces_1.Scope.REQUEST || scope === interfaces_1.Scope.TRANSIENT;
    }
}
exports.DependenciesScanner = DependenciesScanner;
