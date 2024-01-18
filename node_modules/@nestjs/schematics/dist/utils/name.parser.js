"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameParser = void 0;
const core_1 = require("@angular-devkit/core");
class NameParser {
    parse(options) {
        const nameWithoutPath = (0, core_1.basename)(options.name);
        const namePath = (0, core_1.dirname)((options.path === undefined ? '' : options.path)
            .concat('/')
            .concat(options.name));
        return {
            name: nameWithoutPath,
            path: (0, core_1.normalize)('/'.concat(namePath)),
        };
    }
}
exports.NameParser = NameParser;
