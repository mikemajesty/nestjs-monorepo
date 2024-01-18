"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODULE_OPTIONS_TOKEN = exports.ConfigurableModuleClass = void 0;
const module_utils_1 = require("../module-utils");
_a = new module_utils_1.ConfigurableModuleBuilder({
    moduleName: 'Cache',
})
    .setFactoryMethodName('createCacheOptions')
    .build(), exports.ConfigurableModuleClass = _a.ConfigurableModuleClass, exports.MODULE_OPTIONS_TOKEN = _a.MODULE_OPTIONS_TOKEN;
