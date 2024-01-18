"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swcDefaultsFactory = void 0;
const swcDefaultsFactory = (tsOptions, configuration) => {
    const builderOptions = typeof configuration?.compilerOptions?.builder !== 'string'
        ? configuration?.compilerOptions?.builder?.options
        : {};
    return {
        swcOptions: {
            module: {
                type: 'commonjs',
            },
            jsc: {
                target: 'es2021',
                parser: {
                    syntax: 'typescript',
                    decorators: true,
                    dynamicImport: true,
                },
                transform: {
                    legacyDecorator: true,
                    decoratorMetadata: true,
                    useDefineForClassFields: false,
                },
                keepClassNames: true,
                baseUrl: tsOptions?.baseUrl,
                paths: tsOptions?.paths,
            },
            minify: false,
            swcrc: true,
        },
        cliOptions: {
            outDir: tsOptions?.outDir ? convertPath(tsOptions.outDir) : 'dist',
            filenames: [configuration?.sourceRoot ?? 'src'],
            sync: false,
            extensions: ['.js', '.ts'],
            copyFiles: false,
            includeDotfiles: false,
            quiet: false,
            watch: false,
            ...builderOptions,
        },
    };
};
exports.swcDefaultsFactory = swcDefaultsFactory;
/**
 * Converts Windows specific file paths to posix
 * @param windowsPath
 */
function convertPath(windowsPath) {
    return windowsPath
        .replace(/^\\\\\?\\/, '')
        .replace(/\\/g, '/')
        .replace(/\/\/+/g, '/');
}
