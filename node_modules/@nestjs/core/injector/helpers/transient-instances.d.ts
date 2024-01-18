import { InjectionToken } from '@nestjs/common';
import { InstanceWrapper } from '../instance-wrapper';
/**
 * Returns the instances which are transient
 * @param instances The instances which should be checked whether they are transient
 */
export declare function getTransientInstances(instances: [InjectionToken, InstanceWrapper][]): InstanceWrapper[];
/**
 * Returns the instances which are not transient
 * @param instances The instances which should be checked whether they are transient
 */
export declare function getNonTransientInstances(instances: [InjectionToken, InstanceWrapper][]): InstanceWrapper[];
