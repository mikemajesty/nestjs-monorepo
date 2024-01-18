"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigProvider = void 0;
const uuid_1 = require("uuid");
const get_config_token_util_1 = require("./get-config-token.util");
function createConfigProvider(factory) {
    return {
        provide: factory.KEY || (0, get_config_token_util_1.getConfigToken)((0, uuid_1.v4)()),
        useFactory: factory,
        inject: [],
    };
}
exports.createConfigProvider = createConfigProvider;
