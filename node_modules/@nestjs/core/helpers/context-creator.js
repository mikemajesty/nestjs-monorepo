"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextCreator = void 0;
const constants_1 = require("../injector/constants");
class ContextCreator {
    createContext(instance, callback, metadataKey, contextId = constants_1.STATIC_CONTEXT, inquirerId) {
        const globalMetadata = this.getGlobalMetadata &&
            this.getGlobalMetadata(contextId, inquirerId);
        const classMetadata = this.reflectClassMetadata(instance, metadataKey);
        const methodMetadata = this.reflectMethodMetadata(callback, metadataKey);
        return [
            ...this.createConcreteContext(globalMetadata || [], contextId, inquirerId),
            ...this.createConcreteContext(classMetadata, contextId, inquirerId),
            ...this.createConcreteContext(methodMetadata, contextId, inquirerId),
        ];
    }
    reflectClassMetadata(instance, metadataKey) {
        const prototype = Object.getPrototypeOf(instance);
        return Reflect.getMetadata(metadataKey, prototype.constructor);
    }
    reflectMethodMetadata(callback, metadataKey) {
        return Reflect.getMetadata(metadataKey, callback);
    }
    getContextId(contextId, instanceWrapper) {
        return contextId.getParent
            ? contextId.getParent({
                token: instanceWrapper.token,
                isTreeDurable: instanceWrapper.isDependencyTreeDurable(),
            })
            : contextId;
    }
}
exports.ContextCreator = ContextCreator;
