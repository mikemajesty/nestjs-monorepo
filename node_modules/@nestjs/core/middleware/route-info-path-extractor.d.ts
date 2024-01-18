import { RouteInfo } from '@nestjs/common/interfaces';
import { ApplicationConfig } from '../application-config';
export declare class RouteInfoPathExtractor {
    private readonly applicationConfig;
    private routePathFactory;
    private readonly prefixPath;
    private readonly excludedGlobalPrefixRoutes;
    private readonly versioningConfig?;
    constructor(applicationConfig: ApplicationConfig);
    extractPathsFrom({ path, method, version }: RouteInfo): string[];
    extractPathFrom(route: RouteInfo): string;
    private isAWildcard;
    private extractNonWildcardPathFrom;
    private extractVersionPathFrom;
}
