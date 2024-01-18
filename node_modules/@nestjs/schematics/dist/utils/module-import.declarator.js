"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleImportDeclarator = void 0;
const core_1 = require("@angular-devkit/core");
const path_solver_1 = require("./path.solver");
class ModuleImportDeclarator {
    constructor(solver = new path_solver_1.PathSolver()) {
        this.solver = solver;
    }
    declare(content, options) {
        const toInsert = this.buildLineToInsert(options);
        const contentLines = content.split('\n');
        const finalImportIndex = this.findImportsEndpoint(contentLines);
        contentLines.splice(finalImportIndex + 1, 0, toInsert);
        return contentLines.join('\n');
    }
    findImportsEndpoint(contentLines) {
        const reversedContent = Array.from(contentLines).reverse();
        const reverseImports = reversedContent.filter(line => line.match(/\} from ('|")/));
        if (reverseImports.length <= 0) {
            return 0;
        }
        return contentLines.indexOf(reverseImports[0]);
    }
    buildLineToInsert(options) {
        return `import { ${options.symbol} } from '${this.computeRelativePath(options)}';`;
    }
    computeRelativePath(options) {
        let importModulePath;
        if (options.type !== undefined) {
            importModulePath = (0, core_1.normalize)(`/${options.path}/${options.name}.${options.type}`);
        }
        else {
            importModulePath = (0, core_1.normalize)(`/${options.path}/${options.name}`);
        }
        return this.solver.relative(options.module, importModulePath);
    }
}
exports.ModuleImportDeclarator = ModuleImportDeclarator;
