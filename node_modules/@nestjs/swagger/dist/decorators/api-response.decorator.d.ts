import { Type } from '@nestjs/common';
import { ReferenceObject, ResponseObject, SchemaObject } from '../interfaces/open-api-spec.interface';
export interface ApiResponseMetadata extends Omit<ResponseObject, 'description'> {
    status?: number | 'default' | '1XX' | '2XX' | '3XX' | '4XX' | '5XX';
    type?: Type<unknown> | Function | [Function] | string;
    isArray?: boolean;
    description?: string;
}
export interface ApiResponseSchemaHost extends Omit<ResponseObject, 'description'> {
    schema: SchemaObject & Partial<ReferenceObject>;
    status?: number | 'default' | '1XX' | '2XX' | '3XX' | '4XX' | '5XX';
    description?: string;
}
export type ApiResponseOptions = ApiResponseMetadata | ApiResponseSchemaHost;
export declare function ApiResponse(options: ApiResponseOptions, { overrideExisting }?: {
    overrideExisting: boolean;
}): MethodDecorator & ClassDecorator;
export declare const ApiOkResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiCreatedResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiAcceptedResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiNoContentResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiMovedPermanentlyResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiFoundResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiBadRequestResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiUnauthorizedResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiTooManyRequestsResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiNotFoundResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiInternalServerErrorResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiBadGatewayResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiConflictResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiForbiddenResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiGatewayTimeoutResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiGoneResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiMethodNotAllowedResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiNotAcceptableResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiNotImplementedResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiPreconditionFailedResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiPayloadTooLargeResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiRequestTimeoutResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiServiceUnavailableResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiUnprocessableEntityResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiUnsupportedMediaTypeResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiDefaultResponse: (options?: ApiResponseOptions) => MethodDecorator & ClassDecorator;
