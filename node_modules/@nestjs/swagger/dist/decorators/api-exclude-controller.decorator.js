"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExcludeController = void 0;
const constants_1 = require("../constants");
const helpers_1 = require("./helpers");
function ApiExcludeController(disable = true) {
    return (0, helpers_1.createClassDecorator)(constants_1.DECORATORS.API_EXCLUDE_CONTROLLER, [disable]);
}
exports.ApiExcludeController = ApiExcludeController;
