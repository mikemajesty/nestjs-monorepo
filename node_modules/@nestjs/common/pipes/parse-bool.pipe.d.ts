import { ArgumentMetadata, PipeTransform } from '../interfaces/features/pipe-transform.interface';
import { ErrorHttpStatusCode } from '../utils/http-error-by-code.util';
/**
 * @publicApi
 */
export interface ParseBoolPipeOptions {
    errorHttpStatusCode?: ErrorHttpStatusCode;
    exceptionFactory?: (error: string) => any;
    optional?: boolean;
}
/**
 * Defines the built-in ParseBool Pipe
 *
 * @see [Built-in Pipes](https://docs.nestjs.com/pipes#built-in-pipes)
 *
 * @publicApi
 */
export declare class ParseBoolPipe implements PipeTransform<string | boolean, Promise<boolean>> {
    protected readonly options?: ParseBoolPipeOptions;
    protected exceptionFactory: (error: string) => any;
    constructor(options?: ParseBoolPipeOptions);
    /**
     * Method that accesses and performs optional transformation on argument for
     * in-flight requests.
     *
     * @param value currently processed route argument
     * @param metadata contains metadata about the currently processed route argument
     */
    transform(value: string | boolean, metadata: ArgumentMetadata): Promise<boolean>;
    /**
     * @param value currently processed route argument
     * @returns `true` if `value` is said 'true', ie., if it is equal to the boolean
     * `true` or the string `"true"`
     */
    protected isTrue(value: string | boolean): boolean;
    /**
     * @param value currently processed route argument
     * @returns `true` if `value` is said 'false', ie., if it is equal to the boolean
     * `false` or the string `"false"`
     */
    protected isFalse(value: string | boolean): boolean;
}
