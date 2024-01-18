"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackDefaultsFactory = void 0;
const path_1 = require("path");
const tsconfig_paths_webpack_plugin_1 = require("tsconfig-paths-webpack-plugin");
const defaults_1 = require("../../configuration/defaults");
const append_extension_1 = require("../helpers/append-extension");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const webpackDefaultsFactory = (sourceRoot, relativeSourceRoot, entryFilename, isDebugEnabled = false, tsConfigFile = defaults_1.defaultTsconfigFilename, plugins) => {
    const isPluginRegistered = isAnyPluginRegistered(plugins);
    const webpackConfiguration = {
        entry: (0, append_extension_1.appendTsExtension)((0, path_1.join)(sourceRoot, entryFilename)),
        devtool: isDebugEnabled ? 'inline-source-map' : false,
        target: 'node',
        output: {
            filename: (0, path_1.join)(relativeSourceRoot, `${entryFilename}.js`),
        },
        ignoreWarnings: [/^(?!CriticalDependenciesWarning$)/],
        externals: [nodeExternals()],
        externalsPresets: { node: true },
        module: {
            rules: [
                {
                    test: /.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: !isPluginRegistered,
                                configFile: tsConfigFile,
                                getCustomTransformers: (program) => ({
                                    before: plugins.beforeHooks.map((hook) => hook(program)),
                                    after: plugins.afterHooks.map((hook) => hook(program)),
                                    afterDeclarations: plugins.afterDeclarationsHooks.map((hook) => hook(program)),
                                }),
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            plugins: [
                new tsconfig_paths_webpack_plugin_1.TsconfigPathsPlugin({
                    configFile: tsConfigFile,
                }),
            ],
        },
        mode: 'none',
        optimization: {
            nodeEnv: false,
        },
        node: {
            __filename: false,
            __dirname: false,
        },
        plugins: [
            new webpack.IgnorePlugin({
                checkResource(resource) {
                    const lazyImports = [
                        '@nestjs/microservices',
                        'cache-manager',
                        'class-validator',
                        'class-transformer',
                    ];
                    if (!lazyImports.includes(resource)) {
                        return false;
                    }
                    try {
                        require.resolve(resource, {
                            paths: [process.cwd()],
                        });
                    }
                    catch (err) {
                        return true;
                    }
                    return false;
                },
            }),
        ],
    };
    if (!isPluginRegistered) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
        webpackConfiguration.plugins.push(new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: tsConfigFile,
            },
        }));
    }
    return webpackConfiguration;
};
exports.webpackDefaultsFactory = webpackDefaultsFactory;
function isAnyPluginRegistered(plugins) {
    return ((plugins.afterHooks && plugins.afterHooks.length > 0) ||
        (plugins.beforeHooks && plugins.beforeHooks.length > 0) ||
        (plugins.afterDeclarationsHooks &&
            plugins.afterDeclarationsHooks.length > 0));
}
