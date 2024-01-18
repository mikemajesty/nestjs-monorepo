"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reflector = void 0;
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const uid_1 = require("uid");
/**
 * Helper class providing Nest reflection capabilities.
 *
 * @see [Reflection](https://docs.nestjs.com/guards#putting-it-all-together)
 *
 * @publicApi
 */
class Reflector {
    static createDecorator(options = {}) {
        const metadataKey = options.key ?? (0, uid_1.uid)(21);
        const decoratorFn = (metadataValue) => (target, key, descriptor) => {
            const value = options.transform
                ? options.transform(metadataValue)
                : metadataValue;
            (0, common_1.SetMetadata)(metadataKey, value ?? {})(target, key, descriptor);
        };
        decoratorFn.KEY = metadataKey;
        return decoratorFn;
    }
    /**
     * Retrieve metadata for a specified key or decorator for a specified target.
     *
     * @example
     * `const roles = this.reflector.get<string[]>('roles', context.getHandler());`
     *
     * @param metadataKey lookup key or decorator for metadata to retrieve
     * @param target context (decorated object) to retrieve metadata from
     *
     */
    get(metadataKeyOrDecorator, target) {
        const metadataKey = metadataKeyOrDecorator.KEY ??
            metadataKeyOrDecorator;
        return Reflect.getMetadata(metadataKey, target);
    }
    /**
     * Retrieve metadata for a specified key or decorator for a specified set of targets.
     *
     * @param metadataKeyOrDecorator lookup key or decorator for metadata to retrieve
     * @param targets context (decorated objects) to retrieve metadata from
     *
     */
    getAll(metadataKeyOrDecorator, targets) {
        return (targets || []).map(target => this.get(metadataKeyOrDecorator, target));
    }
    /**
     * Retrieve metadata for a specified key or decorator for a specified set of targets and merge results.
     *
     * @param metadataKeyOrDecorator lookup key for metadata to retrieve
     * @param targets context (decorated objects) to retrieve metadata from
     *
     */
    getAllAndMerge(metadataKeyOrDecorator, targets) {
        const metadataCollection = this.getAll(metadataKeyOrDecorator, targets).filter(item => item !== undefined);
        if ((0, shared_utils_1.isEmpty)(metadataCollection)) {
            return metadataCollection;
        }
        return metadataCollection.reduce((a, b) => {
            if (Array.isArray(a)) {
                return a.concat(b);
            }
            if ((0, shared_utils_1.isObject)(a) && (0, shared_utils_1.isObject)(b)) {
                return {
                    ...a,
                    ...b,
                };
            }
            return [a, b];
        });
    }
    /**
     * Retrieve metadata for a specified key or decorator for a specified set of targets and return a first not undefined value.
     *
     * @param metadataKeyOrDecorator lookup key or metadata for metadata to retrieve
     * @param targets context (decorated objects) to retrieve metadata from
     *
     */
    getAllAndOverride(metadataKeyOrDecorator, targets) {
        for (const target of targets) {
            const result = this.get(metadataKeyOrDecorator, target);
            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }
}
exports.Reflector = Reflector;
