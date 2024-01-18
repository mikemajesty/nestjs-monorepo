"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingInstanceLoader = void 0;
const instance_loader_1 = require("@nestjs/core/injector/instance-loader");
class TestingInstanceLoader extends instance_loader_1.InstanceLoader {
    async createInstancesOfDependencies(modules = this.container.getModules(), mocker) {
        this.injector.setContainer(this.container);
        mocker && this.injector.setMocker(mocker);
        await super.createInstancesOfDependencies();
    }
}
exports.TestingInstanceLoader = TestingInstanceLoader;
