import { SchemaObjectMetadata } from '../interfaces/schema-object-metadata.interface';
export interface ApiPropertyOptions extends Omit<SchemaObjectMetadata, 'name' | 'enum'> {
    name?: string;
    enum?: any[] | Record<string, any>;
    enumName?: string;
}
export declare function ApiProperty(options?: ApiPropertyOptions): PropertyDecorator;
export declare function createApiPropertyDecorator(options?: ApiPropertyOptions, overrideExisting?: boolean): PropertyDecorator;
export declare function ApiPropertyOptional(options?: ApiPropertyOptions): PropertyDecorator;
export declare function ApiResponseProperty(options?: Pick<ApiPropertyOptions, 'type' | 'example' | 'format' | 'enum' | 'deprecated'>): PropertyDecorator;
