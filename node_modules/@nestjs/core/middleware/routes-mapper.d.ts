import { RouteInfo, Type } from '@nestjs/common/interfaces';
import { ApplicationConfig } from '../application-config';
import { NestContainer } from '../injector/container';
export declare class RoutesMapper {
    private readonly container;
    private readonly applicationConfig;
    private readonly pathsExplorer;
    constructor(container: NestContainer, applicationConfig: ApplicationConfig);
    mapRouteToRouteInfo(controllerOrRoute: Type<any> | RouteInfo | string): RouteInfo[];
    private getRouteInfoFromPath;
    private getRouteInfoFromObject;
    private getRouteInfoFromController;
    private isRouteInfo;
    private normalizeGlobalPath;
    private getRoutePath;
    private getHostModuleOfController;
    private getModulePath;
    private getVersionMetadata;
}
