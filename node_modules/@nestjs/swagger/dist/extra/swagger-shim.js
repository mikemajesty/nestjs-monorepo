"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentBuilder = exports.ApiExtension = exports.ApiTags = exports.ApiSecurity = exports.ApiDefaultResponse = exports.ApiUnsupportedMediaTypeResponse = exports.ApiUnprocessableEntityResponse = exports.ApiServiceUnavailableResponse = exports.ApiRequestTimeoutResponse = exports.ApiPayloadTooLargeResponse = exports.ApiPreconditionFailedResponse = exports.ApiNotImplementedResponse = exports.ApiNotAcceptableResponse = exports.ApiMethodNotAllowedResponse = exports.ApiGoneResponse = exports.ApiGatewayTimeoutResponse = exports.ApiForbiddenResponse = exports.ApiConflictResponse = exports.ApiBadGatewayResponse = exports.ApiInternalServerErrorResponse = exports.ApiNotFoundResponse = exports.ApiTooManyRequestsResponse = exports.ApiUnauthorizedResponse = exports.ApiBadRequestResponse = exports.ApiFoundResponse = exports.ApiMovedPermanentlyResponse = exports.ApiNoContentResponse = exports.ApiAcceptedResponse = exports.ApiCreatedResponse = exports.ApiOkResponse = exports.ApiResponse = exports.ApiQuery = exports.ApiProduces = exports.ApiParam = exports.ApiOperation = exports.ApiOAuth2 = exports.ApiHideProperty = exports.ApiHeaders = exports.ApiHeader = exports.ApiExtraModels = exports.ApiExcludeController = exports.ApiExcludeEndpoint = exports.ApiCookieAuth = exports.ApiConsumes = exports.ApiBody = exports.ApiBearerAuth = exports.ApiBasicAuth = exports.ApiResponseProperty = exports.ApiPropertyOptional = exports.ApiProperty = void 0;
exports.ReadonlyVisitor = exports.before = exports.getSchemaPath = exports.PickType = exports.PartialType = exports.OmitType = exports.IntersectionType = exports.SwaggerModule = void 0;
function ApiProperty() {
    return () => { };
}
exports.ApiProperty = ApiProperty;
function ApiPropertyOptional() {
    return () => { };
}
exports.ApiPropertyOptional = ApiPropertyOptional;
function ApiResponseProperty() {
    return () => { };
}
exports.ApiResponseProperty = ApiResponseProperty;
function ApiBasicAuth() {
    return () => { };
}
exports.ApiBasicAuth = ApiBasicAuth;
function ApiBearerAuth() {
    return () => { };
}
exports.ApiBearerAuth = ApiBearerAuth;
function ApiBody() {
    return () => { };
}
exports.ApiBody = ApiBody;
function ApiConsumes() {
    return () => { };
}
exports.ApiConsumes = ApiConsumes;
function ApiCookieAuth() {
    return () => { };
}
exports.ApiCookieAuth = ApiCookieAuth;
function ApiExcludeEndpoint() {
    return () => { };
}
exports.ApiExcludeEndpoint = ApiExcludeEndpoint;
function ApiExcludeController() {
    return () => { };
}
exports.ApiExcludeController = ApiExcludeController;
function ApiExtraModels() {
    return () => { };
}
exports.ApiExtraModels = ApiExtraModels;
function ApiHeader() {
    return () => { };
}
exports.ApiHeader = ApiHeader;
function ApiHeaders() {
    return () => { };
}
exports.ApiHeaders = ApiHeaders;
function ApiHideProperty() {
    return () => { };
}
exports.ApiHideProperty = ApiHideProperty;
function ApiOAuth2() {
    return () => { };
}
exports.ApiOAuth2 = ApiOAuth2;
function ApiOperation() {
    return () => { };
}
exports.ApiOperation = ApiOperation;
function ApiParam() {
    return () => { };
}
exports.ApiParam = ApiParam;
function ApiProduces() {
    return () => { };
}
exports.ApiProduces = ApiProduces;
function ApiQuery() {
    return () => { };
}
exports.ApiQuery = ApiQuery;
function ApiResponse() {
    return () => { };
}
exports.ApiResponse = ApiResponse;
function ApiOkResponse() {
    return () => { };
}
exports.ApiOkResponse = ApiOkResponse;
function ApiCreatedResponse() {
    return () => { };
}
exports.ApiCreatedResponse = ApiCreatedResponse;
function ApiAcceptedResponse() {
    return () => { };
}
exports.ApiAcceptedResponse = ApiAcceptedResponse;
function ApiNoContentResponse() {
    return () => { };
}
exports.ApiNoContentResponse = ApiNoContentResponse;
function ApiMovedPermanentlyResponse() {
    return () => { };
}
exports.ApiMovedPermanentlyResponse = ApiMovedPermanentlyResponse;
function ApiFoundResponse() {
    return () => { };
}
exports.ApiFoundResponse = ApiFoundResponse;
function ApiBadRequestResponse() {
    return () => { };
}
exports.ApiBadRequestResponse = ApiBadRequestResponse;
function ApiUnauthorizedResponse() {
    return () => { };
}
exports.ApiUnauthorizedResponse = ApiUnauthorizedResponse;
function ApiTooManyRequestsResponse() {
    return () => { };
}
exports.ApiTooManyRequestsResponse = ApiTooManyRequestsResponse;
function ApiNotFoundResponse() {
    return () => { };
}
exports.ApiNotFoundResponse = ApiNotFoundResponse;
function ApiInternalServerErrorResponse() {
    return () => { };
}
exports.ApiInternalServerErrorResponse = ApiInternalServerErrorResponse;
function ApiBadGatewayResponse() {
    return () => { };
}
exports.ApiBadGatewayResponse = ApiBadGatewayResponse;
function ApiConflictResponse() {
    return () => { };
}
exports.ApiConflictResponse = ApiConflictResponse;
function ApiForbiddenResponse() {
    return () => { };
}
exports.ApiForbiddenResponse = ApiForbiddenResponse;
function ApiGatewayTimeoutResponse() {
    return () => { };
}
exports.ApiGatewayTimeoutResponse = ApiGatewayTimeoutResponse;
function ApiGoneResponse() {
    return () => { };
}
exports.ApiGoneResponse = ApiGoneResponse;
function ApiMethodNotAllowedResponse() {
    return () => { };
}
exports.ApiMethodNotAllowedResponse = ApiMethodNotAllowedResponse;
function ApiNotAcceptableResponse() {
    return () => { };
}
exports.ApiNotAcceptableResponse = ApiNotAcceptableResponse;
function ApiNotImplementedResponse() {
    return () => { };
}
exports.ApiNotImplementedResponse = ApiNotImplementedResponse;
function ApiPreconditionFailedResponse() {
    return () => { };
}
exports.ApiPreconditionFailedResponse = ApiPreconditionFailedResponse;
function ApiPayloadTooLargeResponse() {
    return () => { };
}
exports.ApiPayloadTooLargeResponse = ApiPayloadTooLargeResponse;
function ApiRequestTimeoutResponse() {
    return () => { };
}
exports.ApiRequestTimeoutResponse = ApiRequestTimeoutResponse;
function ApiServiceUnavailableResponse() {
    return () => { };
}
exports.ApiServiceUnavailableResponse = ApiServiceUnavailableResponse;
function ApiUnprocessableEntityResponse() {
    return () => { };
}
exports.ApiUnprocessableEntityResponse = ApiUnprocessableEntityResponse;
function ApiUnsupportedMediaTypeResponse() {
    return () => { };
}
exports.ApiUnsupportedMediaTypeResponse = ApiUnsupportedMediaTypeResponse;
function ApiDefaultResponse() {
    return () => { };
}
exports.ApiDefaultResponse = ApiDefaultResponse;
function ApiSecurity() {
    return () => { };
}
exports.ApiSecurity = ApiSecurity;
function ApiTags() {
    return () => { };
}
exports.ApiTags = ApiTags;
function ApiExtension() {
    return () => { };
}
exports.ApiExtension = ApiExtension;
function DocumentBuilder() {
    return () => { };
}
exports.DocumentBuilder = DocumentBuilder;
function SwaggerModule() {
    return () => { };
}
exports.SwaggerModule = SwaggerModule;
function IntersectionType() {
    return class {
    };
}
exports.IntersectionType = IntersectionType;
function OmitType() {
    return class {
    };
}
exports.OmitType = OmitType;
function PartialType() {
    return class {
    };
}
exports.PartialType = PartialType;
function PickType() {
    return class {
    };
}
exports.PickType = PickType;
function getSchemaPath() {
    return () => '';
}
exports.getSchemaPath = getSchemaPath;
function before() {
    return () => '';
}
exports.before = before;
function ReadonlyVisitor() {
    return class {
    };
}
exports.ReadonlyVisitor = ReadonlyVisitor;
