import { ApiResponseSchemaHost } from '../decorators';
export declare class ResponseObjectMapper {
    private readonly mimetypeContentWrapper;
    toArrayRefObject(response: Record<string, any>, name: string, produces: string[]): {
        content: import("../interfaces/open-api-spec.interface").ContentObject;
    };
    toRefObject(response: Record<string, any>, name: string, produces: string[]): {
        content: import("../interfaces/open-api-spec.interface").ContentObject;
    };
    wrapSchemaWithContent(response: ApiResponseSchemaHost, produces: string[]): ApiResponseSchemaHost | {
        content: import("../interfaces/open-api-spec.interface").ContentObject;
        description?: string;
        headers?: import("../interfaces/open-api-spec.interface").HeadersObject;
        links?: import("../interfaces/open-api-spec.interface").LinksObject;
        status?: number | "default" | "1XX" | "2XX" | "3XX" | "4XX" | "5XX";
    };
}
