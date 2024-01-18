"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedMediaTypeException = void 0;
const http_status_enum_1 = require("../enums/http-status.enum");
const http_exception_1 = require("./http.exception");
/**
 * Defines an HTTP exception for *Unsupported Media Type* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 *
 * @publicApi
 */
class UnsupportedMediaTypeException extends http_exception_1.HttpException {
    /**
     * Instantiate an `UnsupportedMediaTypeException` Exception.
     *
     * @example
     * `throw new UnsupportedMediaTypeException()`
     *
     * @usageNotes
     * The HTTP response status code will be 415.
     * - The `objectOrError` argument defines the JSON response body or the message string.
     * - The `descriptionOrOptions` argument contains either a short description of the HTTP error or an options object used to provide an underlying error cause.
     *
     * By default, the JSON response body contains two properties:
     * - `statusCode`: this will be the value 415.
     * - `message`: the string `'Unsupported Media Type'` by default; override this by supplying
     * a string in the `objectOrError` parameter.
     *
     * If the parameter `objectOrError` is a string, the response body will contain an
     * additional property, `error`, with a short description of the HTTP error. To override the
     * entire JSON response body, pass an object instead. Nest will serialize the object
     * and return it as the JSON response body.
     *
     * @param objectOrError string or object describing the error condition.
     * @param descriptionOrOptions either a short description of the HTTP error or an options object used to provide an underlying error cause
     */
    constructor(objectOrError, descriptionOrOptions = 'Unsupported Media Type') {
        const { description, httpExceptionOptions } = http_exception_1.HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(http_exception_1.HttpException.createBody(objectOrError, description, http_status_enum_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE), http_status_enum_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE, httpExceptionOptions);
    }
}
exports.UnsupportedMediaTypeException = UnsupportedMediaTypeException;
