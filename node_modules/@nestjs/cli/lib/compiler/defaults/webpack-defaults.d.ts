import { MultiNestCompilerPlugins } from '../plugins/plugins-loader';
import webpack = require('webpack');
export declare const webpackDefaultsFactory: (sourceRoot: string, relativeSourceRoot: string, entryFilename: string, isDebugEnabled: boolean | undefined, tsConfigFile: string | undefined, plugins: MultiNestCompilerPlugins) => webpack.Configuration;
