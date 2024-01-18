"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractInstanceResolver = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../errors/exceptions");
class AbstractInstanceResolver {
    find(typeOrToken, options) {
        const instanceLinkOrArray = this.instanceLinksHost.get(typeOrToken, options);
        const pluckInstance = ({ wrapperRef }) => {
            if (wrapperRef.scope === common_1.Scope.REQUEST ||
                wrapperRef.scope === common_1.Scope.TRANSIENT) {
                throw new exceptions_1.InvalidClassScopeException(typeOrToken);
            }
            return wrapperRef.instance;
        };
        if (Array.isArray(instanceLinkOrArray)) {
            return instanceLinkOrArray.map(pluckInstance);
        }
        return pluckInstance(instanceLinkOrArray);
    }
    async resolvePerContext(typeOrToken, contextModule, contextId, options) {
        const instanceLinkOrArray = options?.strict
            ? this.instanceLinksHost.get(typeOrToken, {
                moduleId: contextModule.id,
                each: options.each,
            })
            : this.instanceLinksHost.get(typeOrToken, {
                each: options.each,
            });
        const pluckInstance = async (instanceLink) => {
            const { wrapperRef, collection } = instanceLink;
            if (wrapperRef.isDependencyTreeStatic() && !wrapperRef.isTransient) {
                return this.get(typeOrToken, { strict: options.strict });
            }
            const ctorHost = wrapperRef.instance || { constructor: typeOrToken };
            const instance = await this.injector.loadPerContext(ctorHost, wrapperRef.host, collection, contextId, wrapperRef);
            if (!instance) {
                throw new exceptions_1.UnknownElementException();
            }
            return instance;
        };
        if (Array.isArray(instanceLinkOrArray)) {
            return Promise.all(instanceLinkOrArray.map(instanceLink => pluckInstance(instanceLink)));
        }
        return pluckInstance(instanceLinkOrArray);
    }
}
exports.AbstractInstanceResolver = AbstractInstanceResolver;
