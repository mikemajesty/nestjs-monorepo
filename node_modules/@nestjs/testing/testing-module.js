"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingModule = void 0;
const common_1 = require("@nestjs/common");
const load_package_util_1 = require("@nestjs/common/utils/load-package.util");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const core_1 = require("@nestjs/core");
/**
 * @publicApi
 */
class TestingModule extends core_1.NestApplicationContext {
    constructor(container, graphInspector, contextModule, applicationConfig, scope = []) {
        const options = {};
        super(container, options, contextModule, scope);
        this.applicationConfig = applicationConfig;
        this.graphInspector = graphInspector;
    }
    isHttpServer(serverOrOptions) {
        return !!(serverOrOptions && serverOrOptions.patch);
    }
    createNestApplication(serverOrOptions, options) {
        const [httpAdapter, appOptions] = this.isHttpServer(serverOrOptions)
            ? [serverOrOptions, options]
            : [this.createHttpAdapter(), serverOrOptions];
        this.applyLogger(appOptions);
        this.container.setHttpAdapter(httpAdapter);
        const instance = new core_1.NestApplication(this.container, httpAdapter, this.applicationConfig, this.graphInspector, appOptions);
        return this.createAdapterProxy(instance, httpAdapter);
    }
    createNestMicroservice(options) {
        const { NestMicroservice } = (0, load_package_util_1.loadPackage)('@nestjs/microservices', 'TestingModule', () => require('@nestjs/microservices'));
        this.applyLogger(options);
        return new NestMicroservice(this.container, options, this.graphInspector, this.applicationConfig);
    }
    createHttpAdapter(httpServer) {
        const { ExpressAdapter } = (0, load_package_util_1.loadPackage)('@nestjs/platform-express', 'NestFactory', () => require('@nestjs/platform-express'));
        return new ExpressAdapter(httpServer);
    }
    applyLogger(options) {
        if (!options || (0, shared_utils_1.isUndefined)(options.logger)) {
            return;
        }
        common_1.Logger.overrideLogger(options.logger);
    }
    createAdapterProxy(app, adapter) {
        return new Proxy(app, {
            get: (receiver, prop) => {
                if (!(prop in receiver) && prop in adapter) {
                    return adapter[prop];
                }
                return receiver[prop];
            },
        });
    }
}
exports.TestingModule = TestingModule;
