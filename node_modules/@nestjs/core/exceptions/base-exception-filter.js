"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseExceptionFilter = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const constants_1 = require("../constants");
const http_adapter_host_1 = require("../helpers/http-adapter-host");
class BaseExceptionFilter {
    constructor(applicationRef) {
        this.applicationRef = applicationRef;
    }
    catch(exception, host) {
        const applicationRef = this.applicationRef ||
            (this.httpAdapterHost && this.httpAdapterHost.httpAdapter);
        if (!(exception instanceof common_1.HttpException)) {
            return this.handleUnknownError(exception, host, applicationRef);
        }
        const res = exception.getResponse();
        const message = (0, shared_utils_1.isObject)(res)
            ? res
            : {
                statusCode: exception.getStatus(),
                message: res,
            };
        const response = host.getArgByIndex(1);
        if (!applicationRef.isHeadersSent(response)) {
            applicationRef.reply(response, message, exception.getStatus());
        }
        else {
            applicationRef.end(response);
        }
    }
    handleUnknownError(exception, host, applicationRef) {
        const body = this.isHttpError(exception)
            ? {
                statusCode: exception.statusCode,
                message: exception.message,
            }
            : {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: constants_1.MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
            };
        const response = host.getArgByIndex(1);
        if (!applicationRef.isHeadersSent(response)) {
            applicationRef.reply(response, body, body.statusCode);
        }
        else {
            applicationRef.end(response);
        }
        if (this.isExceptionObject(exception)) {
            return BaseExceptionFilter.logger.error(exception.message, exception.stack);
        }
        return BaseExceptionFilter.logger.error(exception);
    }
    isExceptionObject(err) {
        return (0, shared_utils_1.isObject)(err) && !!err.message;
    }
    /**
     * Checks if the thrown error comes from the "http-errors" library.
     * @param err error object
     */
    isHttpError(err) {
        return err?.statusCode && err?.message;
    }
}
exports.BaseExceptionFilter = BaseExceptionFilter;
BaseExceptionFilter.logger = new common_1.Logger('ExceptionsHandler');
tslib_1.__decorate([
    (0, common_1.Optional)(),
    (0, common_1.Inject)(),
    tslib_1.__metadata("design:type", http_adapter_host_1.HttpAdapterHost)
], BaseExceptionFilter.prototype, "httpAdapterHost", void 0);
