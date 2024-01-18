import { Type } from '@nestjs/common';
import { ParameterObject, ReferenceObject, SchemaObject } from '../interfaces/open-api-spec.interface';
import { SwaggerEnumType } from '../types/swagger-enum.type';
type ParameterOptions = Omit<ParameterObject, 'in' | 'schema' | 'name'>;
interface ApiQueryMetadata extends ParameterOptions {
    name?: string;
    type?: Type<unknown> | Function | [Function] | string;
    isArray?: boolean;
    enum?: SwaggerEnumType;
    enumName?: string;
}
interface ApiQuerySchemaHost extends ParameterOptions {
    name?: string;
    schema: SchemaObject | ReferenceObject;
}
export type ApiQueryOptions = ApiQueryMetadata | ApiQuerySchemaHost;
export declare function ApiQuery(options: ApiQueryOptions): MethodDecorator & ClassDecorator;
export {};
