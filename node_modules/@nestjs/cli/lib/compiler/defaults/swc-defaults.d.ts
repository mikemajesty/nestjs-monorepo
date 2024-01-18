import * as ts from 'typescript';
import { Configuration } from '../../configuration';
export declare const swcDefaultsFactory: (tsOptions?: ts.CompilerOptions, configuration?: Configuration) => {
    swcOptions: {
        module: {
            type: string;
        };
        jsc: {
            target: string;
            parser: {
                syntax: string;
                decorators: boolean;
                dynamicImport: boolean;
            };
            transform: {
                legacyDecorator: boolean;
                decoratorMetadata: boolean;
                useDefineForClassFields: boolean;
            };
            keepClassNames: boolean;
            baseUrl: string | undefined;
            paths: ts.MapLike<string[]> | undefined;
        };
        minify: boolean;
        swcrc: boolean;
    };
    cliOptions: {
        outDir: string;
        filenames: string[];
        sync: boolean;
        extensions: string[];
        copyFiles: boolean;
        includeDotfiles: boolean;
        quiet: boolean;
        watch: boolean;
    } | {
        swcrcPath?: string | undefined;
        outDir: string;
        filenames: string[];
        sync: boolean;
        extensions: string[];
        copyFiles: boolean;
        includeDotfiles: boolean;
        quiet: boolean;
        watch: boolean;
    } | {
        configPath?: string | undefined;
        outDir: string;
        filenames: string[];
        sync: boolean;
        extensions: string[];
        copyFiles: boolean;
        includeDotfiles: boolean;
        quiet: boolean;
        watch: boolean;
    };
};
