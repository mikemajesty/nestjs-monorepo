"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistrationToken = void 0;
const config_constants_1 = require("../config.constants");
function getRegistrationToken(config) {
    return config[config_constants_1.PARTIAL_CONFIGURATION_KEY];
}
exports.getRegistrationToken = getRegistrationToken;
