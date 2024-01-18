"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingInjector = void 0;
const constants_1 = require("@nestjs/core/injector/constants");
const injector_1 = require("@nestjs/core/injector/injector");
const instance_wrapper_1 = require("@nestjs/core/injector/instance-wrapper");
/**
 * @publicApi
 */
class TestingInjector extends injector_1.Injector {
    setMocker(mocker) {
        this.mocker = mocker;
    }
    setContainer(container) {
        this.container = container;
    }
    async resolveComponentInstance(moduleRef, name, dependencyContext, wrapper, contextId = constants_1.STATIC_CONTEXT, inquirer, keyOrIndex) {
        try {
            const existingProviderWrapper = await super.resolveComponentInstance(moduleRef, name, dependencyContext, wrapper, contextId, inquirer, keyOrIndex);
            return existingProviderWrapper;
        }
        catch (err) {
            if (this.mocker) {
                const mockedInstance = this.mocker(name);
                if (!mockedInstance) {
                    throw err;
                }
                const newWrapper = new instance_wrapper_1.InstanceWrapper({
                    name,
                    isAlias: false,
                    scope: wrapper.scope,
                    instance: mockedInstance,
                    isResolved: true,
                    host: moduleRef,
                    metatype: wrapper.metatype,
                });
                const internalCoreModule = this.container.getInternalCoreModuleRef();
                internalCoreModule.addCustomProvider({
                    provide: name,
                    useValue: mockedInstance,
                }, internalCoreModule.providers);
                internalCoreModule.addExportedProvider(name);
                return newWrapper;
            }
            else {
                throw err;
            }
        }
    }
}
exports.TestingInjector = TestingInjector;
