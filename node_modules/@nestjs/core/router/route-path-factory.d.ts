import { RequestMethod, VersioningOptions } from '@nestjs/common';
import { VersionValue } from '@nestjs/common/interfaces';
import { ApplicationConfig } from '../application-config';
import { RoutePathMetadata } from './interfaces/route-path-metadata.interface';
export declare class RoutePathFactory {
    private readonly applicationConfig;
    constructor(applicationConfig: ApplicationConfig);
    create(metadata: RoutePathMetadata, requestMethod?: RequestMethod): string[];
    getVersion(metadata: RoutePathMetadata): VersionValue;
    getVersionPrefix(versioningOptions: VersioningOptions): string;
    appendToAllIfDefined(paths: string[], fragmentToAppend: string | string[] | undefined): string[];
    isExcludedFromGlobalPrefix(path: string, requestMethod?: RequestMethod, versionOrVersions?: VersionValue, versioningOptions?: VersioningOptions): boolean;
    private truncateVersionPrefixFromPath;
}
