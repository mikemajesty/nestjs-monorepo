"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedException = void 0;
const http_status_enum_1 = require("../enums/http-status.enum");
const http_exception_1 = require("./http.exception");
/**
 * Defines an HTTP exception for *Not Implemented* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 *
 * @publicApi
 */
class NotImplementedException extends http_exception_1.HttpException {
    /**
     * Instantiate a `NotImplementedException` Exception.
     *
     * @example
     * `throw new NotImplementedException()`
     *
     * @usageNotes
     * The HTTP response status code will be 501.
     * - The `objectOrError` argument defines the JSON response body or the message string.
     * - The `descriptionOrOptions` argument contains either a short description of the HTTP error or an options object used to provide an underlying error cause.
     *
     * By default, the JSON response body contains two properties:
     * - `statusCode`: this will be the value 501.
     * - `message`: the string `'Not Implemented'` by default; override this by supplying
     * a string in the `objectOrError` parameter.
     *
     * If the parameter `objectOrError` is a string, the response body will contain an
     * additional property, `error`, with a short description of the HTTP error. To override the
     * entire JSON response body, pass an object instead. Nest will serialize the object
     * and return it as the JSON response body.
     *
     * @param descriptionOrOptions either a short description of the HTTP error or an options object used to provide an underlying error cause
     * @param error a short description of the HTTP error.
     */
    constructor(objectOrError, descriptionOrOptions = 'Not Implemented') {
        const { description, httpExceptionOptions } = http_exception_1.HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(http_exception_1.HttpException.createBody(objectOrError, description, http_status_enum_1.HttpStatus.NOT_IMPLEMENTED), http_status_enum_1.HttpStatus.NOT_IMPLEMENTED, httpExceptionOptions);
    }
}
exports.NotImplementedException = NotImplementedException;
