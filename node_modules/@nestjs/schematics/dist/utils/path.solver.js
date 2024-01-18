"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathSolver = void 0;
const core_1 = require("@angular-devkit/core");
class PathSolver {
    relative(from, to) {
        const placeholder = '/placeholder';
        const relativeDir = (0, core_1.relative)((0, core_1.dirname)((placeholder + from)), (0, core_1.dirname)((placeholder + to)));
        return (relativeDir.startsWith('.')
            ? relativeDir
            : './' + relativeDir).concat(relativeDir.length === 0 ? (0, core_1.basename)(to) : '/' + (0, core_1.basename)(to));
    }
}
exports.PathSolver = PathSolver;
