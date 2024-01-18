"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const http_status_enum_1 = require("../enums/http-status.enum");
const http_exception_1 = require("./http.exception");
/**
 * Defines an HTTP exception for *Not Found* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 *
 * @publicApi
 */
class NotFoundException extends http_exception_1.HttpException {
    /**
     * Instantiate a `NotFoundException` Exception.
     *
     * @example
     * `throw new NotFoundException()`
     *
     * @usageNotes
     * The HTTP response status code will be 404.
     * - The `objectOrError` argument defines the JSON response body or the message string.
     * - The `descriptionOrOptions` argument contains either a short description of the HTTP error or an options object used to provide an underlying error cause.
     *
     * By default, the JSON response body contains two properties:
     * - `statusCode`: this will be the value 404.
     * - `message`: the string `'Not Found'` by default; override this by supplying
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
    constructor(objectOrError, descriptionOrOptions = 'Not Found') {
        const { description, httpExceptionOptions } = http_exception_1.HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
        super(http_exception_1.HttpException.createBody(objectOrError, description, http_status_enum_1.HttpStatus.NOT_FOUND), http_status_enum_1.HttpStatus.NOT_FOUND, httpExceptionOptions);
    }
}
exports.NotFoundException = NotFoundException;
