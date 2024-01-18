"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRef = void 0;
const common_1 = require("@nestjs/common");
const get_class_scope_1 = require("../helpers/get-class-scope");
const is_durable_1 = require("../helpers/is-durable");
const abstract_instance_resolver_1 = require("./abstract-instance-resolver");
const injector_1 = require("./injector");
const instance_links_host_1 = require("./instance-links-host");
const instance_wrapper_1 = require("./instance-wrapper");
class ModuleRef extends abstract_instance_resolver_1.AbstractInstanceResolver {
    get instanceLinksHost() {
        if (!this._instanceLinksHost) {
            this._instanceLinksHost = new instance_links_host_1.InstanceLinksHost(this.container);
        }
        return this._instanceLinksHost;
    }
    constructor(container) {
        super();
        this.container = container;
        this.injector = new injector_1.Injector();
    }
    introspect(token) {
        const { wrapperRef } = this.instanceLinksHost.get(token);
        let scope = common_1.Scope.DEFAULT;
        if (!wrapperRef.isDependencyTreeStatic()) {
            scope = common_1.Scope.REQUEST;
        }
        else if (wrapperRef.isTransient) {
            scope = common_1.Scope.TRANSIENT;
        }
        return { scope };
    }
    registerRequestByContextId(request, contextId) {
        this.container.registerRequestProvider(request, contextId);
    }
    async instantiateClass(type, moduleRef, contextId) {
        const wrapper = new instance_wrapper_1.InstanceWrapper({
            name: type && type.name,
            metatype: type,
            isResolved: false,
            scope: (0, get_class_scope_1.getClassScope)(type),
            durable: (0, is_durable_1.isDurable)(type),
            host: moduleRef,
        });
        return new Promise(async (resolve, reject) => {
            try {
                const callback = async (instances) => {
                    const properties = await this.injector.resolveProperties(wrapper, moduleRef, undefined, contextId);
                    const instance = new type(...instances);
                    this.injector.applyProperties(instance, properties);
                    resolve(instance);
                };
                await this.injector.resolveConstructorParams(wrapper, moduleRef, undefined, callback, contextId);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.ModuleRef = ModuleRef;
