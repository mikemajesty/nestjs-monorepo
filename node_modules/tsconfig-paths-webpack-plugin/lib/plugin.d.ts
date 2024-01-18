/// <reference types="node" />
import * as TsconfigPaths from "tsconfig-paths";
import * as Options from "./options";
import * as Logger from "./logger";
import * as fs from "fs";
import { ResolvePluginInstance, Resolver } from "webpack";
import { ResolveRequest, ResolveContext } from "enhanced-resolve";
declare type TapAsyncCallback = (request: ResolveRequest, context: ResolveContext, callback: TapAsyncInnerCallback) => void;
declare type TapAsyncInnerCallback = (error?: Error | null | false, result?: null | ResolveRequest) => void;
export interface LegacyResolverPlugin {
    readonly apply: (resolver: LegacyResolver) => void;
}
export interface LegacyResolver {
    readonly apply: (plugin: LegacyResolverPlugin) => void;
    readonly plugin: (source: string, cb: ResolverCallbackLegacy) => void;
    readonly doResolve: doResolveLegacy | doResolve;
    readonly join: (relativePath: string, innerRequest: Request) => Request;
    readonly fileSystem: LegacyResolverFileSystem;
    readonly getHook: (hook: string) => Tapable;
}
export declare type doResolveLegacy = (target: string, req: Request, desc: string, callback: Callback) => void;
export declare type doResolve = (hook: Tapable, req: Request, message: string, resolveContext: LegacyResolveContext, callback: Callback) => void;
export declare type ReadJsonCallback = (error: Error | undefined, result?: {}) => void;
export declare type ReadJson = (path2: string, callback: ReadJsonCallback) => void;
export declare type LegacyResolverFileSystem = typeof fs & {
    readJson?: ReadJson;
};
export interface LegacyResolveContext {
    log?: string;
    stack?: string;
    missing?: string;
}
export interface Tapable {
    readonly tapAsync: (options: TapableOptions, callback: TapAsyncCallback) => void;
}
export interface TapableOptions {
    readonly name: string;
}
export declare type ResolverCallbackLegacy = (request: Request, callback: Callback) => void;
export declare type ResolverCallback = (request: Request, resolveContext: LegacyResolveContext, callback: Callback) => void;
export interface Request {
    readonly request?: Request | string;
    readonly relativePath: string;
    readonly path: string;
    readonly context: {
        readonly issuer: string;
    };
}
export interface Callback {
    (err?: Error, result?: string): void;
    log?: string;
    stack?: string;
    missing?: string;
}
export declare class TsconfigPathsPlugin implements ResolvePluginInstance {
    source: string;
    target: string;
    log: Logger.Logger;
    baseUrl: string | undefined;
    absoluteBaseUrl: string;
    extensions: ReadonlyArray<string>;
    referenceMatchMap: Record<string, TsconfigPaths.MatchPathAsync>;
    matchPath: TsconfigPaths.MatchPathAsync;
    constructor(rawOptions?: Partial<Options.Options>);
    apply(resolver: Resolver): void;
}
export {};
