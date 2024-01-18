"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceUtils = void 0;
const rimraf_1 = require("rimraf");
const get_value_or_default_1 = require("./helpers/get-value-or-default");
class WorkspaceUtils {
    async deleteOutDirIfEnabled(configuration, appName, dirPath) {
        const isDeleteEnabled = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.deleteOutDir', appName);
        if (!isDeleteEnabled) {
            return;
        }
        await (0, rimraf_1.default)(dirPath);
    }
}
exports.WorkspaceUtils = WorkspaceUtils;
