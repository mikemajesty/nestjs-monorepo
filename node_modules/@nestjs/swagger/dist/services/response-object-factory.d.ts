import { ApiResponseMetadata, ApiResponseSchemaHost } from '../decorators';
import { SchemaObject } from '../interfaces/open-api-spec.interface';
export declare class ResponseObjectFactory {
    private readonly mimetypeContentWrapper;
    private readonly modelPropertiesAccessor;
    private readonly swaggerTypesMapper;
    private readonly schemaObjectFactory;
    private readonly responseObjectMapper;
    create(response: ApiResponseMetadata, produces: string[], schemas: Record<string, SchemaObject>): ApiResponseSchemaHost | {
        content: import("../interfaces/open-api-spec.interface").ContentObject;
    };
}
