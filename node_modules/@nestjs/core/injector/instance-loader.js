"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceLoader = void 0;
const common_1 = require("@nestjs/common");
const messages_1 = require("../helpers/messages");
const internal_core_module_1 = require("./internal-core-module/internal-core-module");
class InstanceLoader {
    constructor(container, injector, graphInspector, logger = new common_1.Logger(InstanceLoader.name, {
        timestamp: true,
    })) {
        this.container = container;
        this.injector = injector;
        this.graphInspector = graphInspector;
        this.logger = logger;
    }
    setLogger(logger) {
        this.logger = logger;
    }
    async createInstancesOfDependencies(modules = this.container.getModules()) {
        this.createPrototypes(modules);
        try {
            await this.createInstances(modules);
        }
        catch (err) {
            this.graphInspector.inspectModules(modules);
            this.graphInspector.registerPartial(err);
            throw err;
        }
        this.graphInspector.inspectModules(modules);
    }
    createPrototypes(modules) {
        modules.forEach(moduleRef => {
            this.createPrototypesOfProviders(moduleRef);
            this.createPrototypesOfInjectables(moduleRef);
            this.createPrototypesOfControllers(moduleRef);
        });
    }
    async createInstances(modules) {
        await Promise.all([...modules.values()].map(async (moduleRef) => {
            await this.createInstancesOfProviders(moduleRef);
            await this.createInstancesOfInjectables(moduleRef);
            await this.createInstancesOfControllers(moduleRef);
            const { name } = moduleRef;
            this.isModuleWhitelisted(name) &&
                this.logger.log((0, messages_1.MODULE_INIT_MESSAGE) `${name}`);
        }));
    }
    createPrototypesOfProviders(moduleRef) {
        const { providers } = moduleRef;
        providers.forEach(wrapper => this.injector.loadPrototype(wrapper, providers));
    }
    async createInstancesOfProviders(moduleRef) {
        const { providers } = moduleRef;
        const wrappers = [...providers.values()];
        await Promise.all(wrappers.map(async (item) => {
            await this.injector.loadProvider(item, moduleRef);
            this.graphInspector.inspectInstanceWrapper(item, moduleRef);
        }));
    }
    createPrototypesOfControllers(moduleRef) {
        const { controllers } = moduleRef;
        controllers.forEach(wrapper => this.injector.loadPrototype(wrapper, controllers));
    }
    async createInstancesOfControllers(moduleRef) {
        const { controllers } = moduleRef;
        const wrappers = [...controllers.values()];
        await Promise.all(wrappers.map(async (item) => {
            await this.injector.loadController(item, moduleRef);
            this.graphInspector.inspectInstanceWrapper(item, moduleRef);
        }));
    }
    createPrototypesOfInjectables(moduleRef) {
        const { injectables } = moduleRef;
        injectables.forEach(wrapper => this.injector.loadPrototype(wrapper, injectables));
    }
    async createInstancesOfInjectables(moduleRef) {
        const { injectables } = moduleRef;
        const wrappers = [...injectables.values()];
        await Promise.all(wrappers.map(async (item) => {
            await this.injector.loadInjectable(item, moduleRef);
            this.graphInspector.inspectInstanceWrapper(item, moduleRef);
        }));
    }
    isModuleWhitelisted(name) {
        return name !== internal_core_module_1.InternalCoreModule.name;
    }
}
exports.InstanceLoader = InstanceLoader;
