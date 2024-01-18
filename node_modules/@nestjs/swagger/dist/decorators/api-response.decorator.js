"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDefaultResponse = exports.ApiUnsupportedMediaTypeResponse = exports.ApiUnprocessableEntityResponse = exports.ApiServiceUnavailableResponse = exports.ApiRequestTimeoutResponse = exports.ApiPayloadTooLargeResponse = exports.ApiPreconditionFailedResponse = exports.ApiNotImplementedResponse = exports.ApiNotAcceptableResponse = exports.ApiMethodNotAllowedResponse = exports.ApiGoneResponse = exports.ApiGatewayTimeoutResponse = exports.ApiForbiddenResponse = exports.ApiConflictResponse = exports.ApiBadGatewayResponse = exports.ApiInternalServerErrorResponse = exports.ApiNotFoundResponse = exports.ApiTooManyRequestsResponse = exports.ApiUnauthorizedResponse = exports.ApiBadRequestResponse = exports.ApiFoundResponse = exports.ApiMovedPermanentlyResponse = exports.ApiNoContentResponse = exports.ApiAcceptedResponse = exports.ApiCreatedResponse = exports.ApiOkResponse = exports.ApiResponse = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const constants_1 = require("../constants");
const helpers_1 = require("./helpers");
function ApiResponse(options, { overrideExisting } = { overrideExisting: true }) {
    const [type, isArray] = (0, helpers_1.getTypeIsArrayTuple)(options.type, options.isArray);
    options.type = type;
    options.isArray = isArray;
    options.description = options.description ? options.description : '';
    const groupedMetadata = {
        [options.status || 'default']: (0, lodash_1.omit)(options, 'status')
    };
    return (target, key, descriptor) => {
        if (descriptor) {
            const responses = Reflect.getMetadata(constants_1.DECORATORS.API_RESPONSE, descriptor.value);
            if (responses && !overrideExisting) {
                return descriptor;
            }
            Reflect.defineMetadata(constants_1.DECORATORS.API_RESPONSE, Object.assign(Object.assign({}, responses), groupedMetadata), descriptor.value);
            return descriptor;
        }
        const responses = Reflect.getMetadata(constants_1.DECORATORS.API_RESPONSE, target);
        if (responses && !overrideExisting) {
            return descriptor;
        }
        Reflect.defineMetadata(constants_1.DECORATORS.API_RESPONSE, Object.assign(Object.assign({}, responses), groupedMetadata), target);
        return target;
    };
}
exports.ApiResponse = ApiResponse;
const ApiOkResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.OK }));
exports.ApiOkResponse = ApiOkResponse;
const ApiCreatedResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.CREATED }));
exports.ApiCreatedResponse = ApiCreatedResponse;
const ApiAcceptedResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.ACCEPTED }));
exports.ApiAcceptedResponse = ApiAcceptedResponse;
const ApiNoContentResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.NO_CONTENT }));
exports.ApiNoContentResponse = ApiNoContentResponse;
const ApiMovedPermanentlyResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.MOVED_PERMANENTLY }));
exports.ApiMovedPermanentlyResponse = ApiMovedPermanentlyResponse;
const ApiFoundResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.FOUND }));
exports.ApiFoundResponse = ApiFoundResponse;
const ApiBadRequestResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.BAD_REQUEST }));
exports.ApiBadRequestResponse = ApiBadRequestResponse;
const ApiUnauthorizedResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.UNAUTHORIZED }));
exports.ApiUnauthorizedResponse = ApiUnauthorizedResponse;
const ApiTooManyRequestsResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.TOO_MANY_REQUESTS }));
exports.ApiTooManyRequestsResponse = ApiTooManyRequestsResponse;
const ApiNotFoundResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.NOT_FOUND }));
exports.ApiNotFoundResponse = ApiNotFoundResponse;
const ApiInternalServerErrorResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.INTERNAL_SERVER_ERROR }));
exports.ApiInternalServerErrorResponse = ApiInternalServerErrorResponse;
const ApiBadGatewayResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.BAD_GATEWAY }));
exports.ApiBadGatewayResponse = ApiBadGatewayResponse;
const ApiConflictResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.CONFLICT }));
exports.ApiConflictResponse = ApiConflictResponse;
const ApiForbiddenResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.FORBIDDEN }));
exports.ApiForbiddenResponse = ApiForbiddenResponse;
const ApiGatewayTimeoutResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.GATEWAY_TIMEOUT }));
exports.ApiGatewayTimeoutResponse = ApiGatewayTimeoutResponse;
const ApiGoneResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.GONE }));
exports.ApiGoneResponse = ApiGoneResponse;
const ApiMethodNotAllowedResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.METHOD_NOT_ALLOWED }));
exports.ApiMethodNotAllowedResponse = ApiMethodNotAllowedResponse;
const ApiNotAcceptableResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.NOT_ACCEPTABLE }));
exports.ApiNotAcceptableResponse = ApiNotAcceptableResponse;
const ApiNotImplementedResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.NOT_IMPLEMENTED }));
exports.ApiNotImplementedResponse = ApiNotImplementedResponse;
const ApiPreconditionFailedResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.PRECONDITION_FAILED }));
exports.ApiPreconditionFailedResponse = ApiPreconditionFailedResponse;
const ApiPayloadTooLargeResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.PAYLOAD_TOO_LARGE }));
exports.ApiPayloadTooLargeResponse = ApiPayloadTooLargeResponse;
const ApiRequestTimeoutResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.REQUEST_TIMEOUT }));
exports.ApiRequestTimeoutResponse = ApiRequestTimeoutResponse;
const ApiServiceUnavailableResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.SERVICE_UNAVAILABLE }));
exports.ApiServiceUnavailableResponse = ApiServiceUnavailableResponse;
const ApiUnprocessableEntityResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.UNPROCESSABLE_ENTITY }));
exports.ApiUnprocessableEntityResponse = ApiUnprocessableEntityResponse;
const ApiUnsupportedMediaTypeResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE }));
exports.ApiUnsupportedMediaTypeResponse = ApiUnsupportedMediaTypeResponse;
const ApiDefaultResponse = (options = {}) => ApiResponse(Object.assign(Object.assign({}, options), { status: 'default' }));
exports.ApiDefaultResponse = ApiDefaultResponse;
