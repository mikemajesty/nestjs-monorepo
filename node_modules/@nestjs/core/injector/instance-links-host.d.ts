import { InjectionToken } from '@nestjs/common';
import { NestContainer } from './container';
import { InstanceWrapper } from './instance-wrapper';
export interface InstanceLink<T = any> {
    token: InjectionToken;
    wrapperRef: InstanceWrapper<T>;
    collection: Map<any, InstanceWrapper>;
    moduleId: string;
}
export declare class InstanceLinksHost {
    private readonly container;
    private readonly instanceLinks;
    constructor(container: NestContainer);
    get<T = any>(token: InjectionToken): InstanceLink<T>;
    get<T = any>(token: InjectionToken, options?: {
        moduleId?: string;
        each?: boolean;
    }): InstanceLink<T> | Array<InstanceLink<T>>;
    private initialize;
    private addLink;
    private getInstanceNameByToken;
}
