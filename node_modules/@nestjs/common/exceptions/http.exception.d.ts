import { HttpExceptionBody, HttpExceptionBodyMessage } from '../interfaces/http/http-exception-body.interface';
export interface HttpExceptionOptions {
    /** original cause of the error */
    cause?: unknown;
    description?: string;
}
export interface DescriptionAndOptions {
    description?: string;
    httpExceptionOptions?: HttpExceptionOptions;
}
/**
 * Defines the base Nest HTTP exception, which is handled by the default
 * Exceptions Handler.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 *
 * @publicApi
 */
export declare class HttpException extends Error {
    private readonly response;
    private readonly status;
    private readonly options?;
    /**
     * Instantiate a plain HTTP Exception.
     *
     * @example
     * throw new HttpException()
     * throw new HttpException('message', HttpStatus.BAD_REQUEST)
     * throw new HttpException('custom message', HttpStatus.BAD_REQUEST, {
     *  cause: new Error('Cause Error'),
     * })
     *
     *
     * @usageNotes
     * The constructor arguments define the response and the HTTP response status code.
     * - The `response` argument (required) defines the JSON response body. alternatively, it can also be
     *  an error object that is used to define an error [cause](https://nodejs.org/en/blog/release/v16.9.0/#error-cause).
     * - The `status` argument (required) defines the HTTP Status Code.
     * - The `options` argument (optional) defines additional error options. Currently, it supports the `cause` attribute,
     *  and can be used as an alternative way to specify the error cause: `const error = new HttpException('description', 400, { cause: new Error() });`
     *
     * By default, the JSON response body contains two properties:
     * - `statusCode`: the Http Status Code.
     * - `message`: a short description of the HTTP error by default; override this
     * by supplying a string in the `response` parameter.
     *
     * To override the entire JSON response body, pass an object to the `createBody`
     * method. Nest will serialize the object and return it as the JSON response body.
     *
     * The `status` argument is required, and should be a valid HTTP status code.
     * Best practice is to use the `HttpStatus` enum imported from `nestjs/common`.
     *
     * @param response string, object describing the error condition or the error cause.
     * @param status HTTP response status code.
     * @param options An object used to add an error cause.
     */
    constructor(response: string | Record<string, any>, status: number, options?: HttpExceptionOptions);
    cause: unknown;
    /**
     * Configures error chaining support
     *
     * @see https://nodejs.org/en/blog/release/v16.9.0/#error-cause
     * @see https://github.com/microsoft/TypeScript/issues/45167
     */
    initCause(): void;
    initMessage(): void;
    initName(): void;
    getResponse(): string | object;
    getStatus(): number;
    static createBody(nil: null | '', message: HttpExceptionBodyMessage, statusCode: number): HttpExceptionBody;
    static createBody(message: HttpExceptionBodyMessage, error: string, statusCode: number): HttpExceptionBody;
    static createBody<Body extends Record<string, unknown>>(custom: Body): Body;
    static getDescriptionFrom(descriptionOrOptions: string | HttpExceptionOptions): string;
    static getHttpExceptionOptionsFrom(descriptionOrOptions: string | HttpExceptionOptions): HttpExceptionOptions;
    /**
     * Utility method used to extract the error description and httpExceptionOptions from the given argument.
     * This is used by inheriting classes to correctly parse both options.
     * @returns the error description and the httpExceptionOptions as an object.
     */
    static extractDescriptionAndOptionsFrom(descriptionOrOptions: string | HttpExceptionOptions): DescriptionAndOptions;
}
