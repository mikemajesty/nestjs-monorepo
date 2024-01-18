"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplLogger = void 0;
const common_1 = require("@nestjs/common");
const nest_application_1 = require("../nest-application");
const router_explorer_1 = require("../router/router-explorer");
const routes_resolver_1 = require("../router/routes-resolver");
class ReplLogger extends common_1.ConsoleLogger {
    log(_message, context) {
        if (ReplLogger.ignoredContexts.includes(context)) {
            return;
        }
        // eslint-disable-next-line
        return super.log.apply(this, Array.from(arguments));
    }
}
exports.ReplLogger = ReplLogger;
ReplLogger.ignoredContexts = [
    routes_resolver_1.RoutesResolver.name,
    router_explorer_1.RouterExplorer.name,
    nest_application_1.NestApplication.name,
];
