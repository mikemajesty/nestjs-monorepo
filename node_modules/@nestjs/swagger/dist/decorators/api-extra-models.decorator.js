"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExtraModels = void 0;
const constants_1 = require("../constants");
function ApiExtraModels(...models) {
    return (target, key, descriptor) => {
        if (descriptor) {
            const extraModels = Reflect.getMetadata(constants_1.DECORATORS.API_EXTRA_MODELS, descriptor.value) ||
                [];
            Reflect.defineMetadata(constants_1.DECORATORS.API_EXTRA_MODELS, [...extraModels, ...models], descriptor.value);
            return descriptor;
        }
        const extraModels = Reflect.getMetadata(constants_1.DECORATORS.API_EXTRA_MODELS, target) || [];
        Reflect.defineMetadata(constants_1.DECORATORS.API_EXTRA_MODELS, [...extraModels, ...models], target);
        return target;
    };
}
exports.ApiExtraModels = ApiExtraModels;
