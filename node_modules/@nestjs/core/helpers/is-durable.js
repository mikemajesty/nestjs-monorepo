"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDurable = void 0;
const constants_1 = require("@nestjs/common/constants");
function isDurable(provider) {
    const metadata = Reflect.getMetadata(constants_1.SCOPE_OPTIONS_METADATA, provider);
    return metadata && metadata.durable;
}
exports.isDurable = isDurable;
