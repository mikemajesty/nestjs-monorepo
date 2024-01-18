import { Type } from '@nestjs/common';
import { ParameterObject, SchemaObject } from '../interfaces/open-api-spec.interface';
import { SwaggerEnumType } from '../types/swagger-enum.type';
type ParameterOptions = Omit<ParameterObject, 'in' | 'schema'>;
interface ApiParamMetadata extends ParameterOptions {
    type?: Type<unknown> | Function | [Function] | string;
    format?: string;
    enum?: SwaggerEnumType;
    enumName?: string;
}
interface ApiParamSchemaHost extends ParameterOptions {
    schema: SchemaObject;
}
export type ApiParamOptions = ApiParamMetadata | ApiParamSchemaHost;
export declare function ApiParam(options: ApiParamOptions): MethodDecorator & ClassDecorator;
export {};
