"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiConsumes = void 0;
const constants_1 = require("../constants");
const helpers_1 = require("./helpers");
function ApiConsumes(...mimeTypes) {
    return (0, helpers_1.createMixedDecorator)(constants_1.DECORATORS.API_CONSUMES, mimeTypes);
}
exports.ApiConsumes = ApiConsumes;
