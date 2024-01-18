import { PipeTransform } from '../../index';
import { Type } from '../../interfaces';
import { CustomParamFactory } from '../../interfaces/features/custom-route-param-factory.interface';
export type ParamDecoratorEnhancer = ParameterDecorator;
/**
 * Defines HTTP route param decorator
 *
 * @param factory
 *
 * @publicApi
 */
export declare function createParamDecorator<FactoryData = any, FactoryInput = any, FactoryOutput = any>(factory: CustomParamFactory<FactoryData, FactoryInput, FactoryOutput>, enhancers?: ParamDecoratorEnhancer[]): (...dataOrPipes: (Type<PipeTransform> | PipeTransform | FactoryData)[]) => ParameterDecorator;
