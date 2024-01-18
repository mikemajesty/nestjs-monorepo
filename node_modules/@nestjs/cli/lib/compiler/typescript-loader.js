"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScriptBinaryLoader = void 0;
class TypeScriptBinaryLoader {
    load() {
        if (this.tsBinary) {
            return this.tsBinary;
        }
        try {
            const tsBinaryPath = require.resolve('typescript', {
                paths: [process.cwd(), ...this.getModulePaths()],
            });
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const tsBinary = require(tsBinaryPath);
            this.tsBinary = tsBinary;
            return tsBinary;
        }
        catch {
            throw new Error('TypeScript could not be found! Please, install "typescript" package.');
        }
    }
    getModulePaths() {
        const modulePaths = module.paths.slice(2, module.paths.length);
        const packageDeps = modulePaths.slice(0, 3);
        return [
            ...packageDeps.reverse(),
            ...modulePaths.slice(3, modulePaths.length).reverse(),
        ];
    }
}
exports.TypeScriptBinaryLoader = TypeScriptBinaryLoader;
