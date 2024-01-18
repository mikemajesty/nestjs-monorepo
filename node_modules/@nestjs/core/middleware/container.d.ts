import { InjectionToken } from '@nestjs/common';
import { MiddlewareConfiguration } from '@nestjs/common/interfaces/middleware/middleware-configuration.interface';
import { NestContainer } from '../injector/container';
import { InstanceWrapper } from '../injector/instance-wrapper';
export declare class MiddlewareContainer {
    private readonly container;
    private readonly middleware;
    private readonly configurationSets;
    constructor(container: NestContainer);
    getMiddlewareCollection(moduleKey: string): Map<InjectionToken, InstanceWrapper>;
    getConfigurations(): Map<string, Set<MiddlewareConfiguration>>;
    insertConfig(configList: MiddlewareConfiguration[], moduleKey: string): void;
    private getTargetConfig;
}
