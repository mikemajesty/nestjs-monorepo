"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFactoryProvider = exports.isValueProvider = exports.isClassProvider = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
function isClassProvider(provider) {
    return Boolean(provider?.useClass);
}
exports.isClassProvider = isClassProvider;
function isValueProvider(provider) {
    const providerValue = provider?.useValue;
    return !(0, shared_utils_1.isUndefined)(providerValue);
}
exports.isValueProvider = isValueProvider;
function isFactoryProvider(provider) {
    return Boolean(provider.useFactory);
}
exports.isFactoryProvider = isFactoryProvider;
