import { ArgumentMetadata, PipeTransform } from '../interfaces/features/pipe-transform.interface';
import { ErrorHttpStatusCode } from '../utils/http-error-by-code.util';
/**
 * @publicApi
 */
export interface ParseIntPipeOptions {
    errorHttpStatusCode?: ErrorHttpStatusCode;
    exceptionFactory?: (error: string) => any;
    optional?: boolean;
}
/**
 * Defines the built-in ParseInt Pipe
 *
 * @see [Built-in Pipes](https://docs.nestjs.com/pipes#built-in-pipes)
 *
 * @publicApi
 */
export declare class ParseIntPipe implements PipeTransform<string> {
    protected readonly options?: ParseIntPipeOptions;
    protected exceptionFactory: (error: string) => any;
    constructor(options?: ParseIntPipeOptions);
    /**
     * Method that accesses and performs optional transformation on argument for
     * in-flight requests.
     *
     * @param value currently processed route argument
     * @param metadata contains metadata about the currently processed route argument
     */
    transform(value: string, metadata: ArgumentMetadata): Promise<number>;
    /**
     * @param value currently processed route argument
     * @returns `true` if `value` is a valid integer number
     */
    protected isNumeric(value: string): boolean;
}
