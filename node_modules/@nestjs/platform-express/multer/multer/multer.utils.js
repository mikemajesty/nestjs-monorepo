"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformException = void 0;
const common_1 = require("@nestjs/common");
const multer_constants_1 = require("./multer.constants");
function transformException(error) {
    if (!error || error instanceof common_1.HttpException) {
        return error;
    }
    switch (error.message) {
        case multer_constants_1.multerExceptions.LIMIT_FILE_SIZE:
            return new common_1.PayloadTooLargeException(error.message);
        case multer_constants_1.multerExceptions.LIMIT_FILE_COUNT:
        case multer_constants_1.multerExceptions.LIMIT_FIELD_KEY:
        case multer_constants_1.multerExceptions.LIMIT_FIELD_VALUE:
        case multer_constants_1.multerExceptions.LIMIT_FIELD_COUNT:
        case multer_constants_1.multerExceptions.LIMIT_UNEXPECTED_FILE:
        case multer_constants_1.multerExceptions.LIMIT_PART_COUNT:
        case multer_constants_1.multerExceptions.MISSING_FIELD_NAME:
            return new common_1.BadRequestException(error.message);
        case multer_constants_1.busboyExceptions.MULTIPART_BOUNDARY_NOT_FOUND:
            return new common_1.BadRequestException(error.message);
        case multer_constants_1.busboyExceptions.MULTIPART_MALFORMED_PART_HEADER:
        case multer_constants_1.busboyExceptions.MULTIPART_UNEXPECTED_END_OF_FORM:
        case multer_constants_1.busboyExceptions.MULTIPART_UNEXPECTED_END_OF_FILE:
            return new common_1.BadRequestException(`Multipart: ${error.message}`);
    }
    return error;
}
exports.transformException = transformException;
