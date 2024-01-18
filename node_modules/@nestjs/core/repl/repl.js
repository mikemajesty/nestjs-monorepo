"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repl = void 0;
const common_1 = require("@nestjs/common");
const cli_colors_util_1 = require("@nestjs/common/utils/cli-colors.util");
const nest_factory_1 = require("../nest-factory");
const assign_to_object_util_1 = require("./assign-to-object.util");
const constants_1 = require("./constants");
const repl_context_1 = require("./repl-context");
const repl_logger_1 = require("./repl-logger");
const repl_native_commands_1 = require("./repl-native-commands");
async function repl(module, replOptions = {}) {
    const app = await nest_factory_1.NestFactory.createApplicationContext(module, {
        abortOnError: false,
        logger: new repl_logger_1.ReplLogger(),
    });
    await app.init();
    const replContext = new repl_context_1.ReplContext(app);
    common_1.Logger.log(constants_1.REPL_INITIALIZED_MESSAGE);
    const _repl = await Promise.resolve().then(() => require('repl'));
    const replServer = _repl.start({
        prompt: cli_colors_util_1.clc.green('> '),
        ignoreUndefined: true,
        ...replOptions,
    });
    (0, assign_to_object_util_1.assignToObject)(replServer.context, replContext.globalScope);
    (0, repl_native_commands_1.defineDefaultCommandsOnRepl)(replServer);
    return replServer;
}
exports.repl = repl;
