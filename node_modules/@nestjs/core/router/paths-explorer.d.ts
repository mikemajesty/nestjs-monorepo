import { RequestMethod } from '@nestjs/common/enums';
import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { VersionValue } from '@nestjs/common/interfaces/version-options.interface';
import { MetadataScanner } from '../metadata-scanner';
import { RouterProxyCallback } from './router-proxy';
export interface RouteDefinition {
    path: string[];
    requestMethod: RequestMethod;
    targetCallback: RouterProxyCallback;
    methodName: string;
    version?: VersionValue;
}
export declare class PathsExplorer {
    private readonly metadataScanner;
    constructor(metadataScanner: MetadataScanner);
    scanForPaths(instance: Controller, prototype?: object): RouteDefinition[];
    exploreMethodMetadata(instance: Controller, prototype: object, methodName: string): RouteDefinition | null;
}
