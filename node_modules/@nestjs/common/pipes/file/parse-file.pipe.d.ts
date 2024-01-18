import { PipeTransform } from '../../interfaces/features/pipe-transform.interface';
import { FileValidator } from './file-validator.interface';
import { ParseFileOptions } from './parse-file-options.interface';
/**
 * Defines the built-in ParseFile Pipe. This pipe can be used to validate incoming files
 * with `@UploadedFile()` decorator. You can use either other specific built-in validators
 * or provide one of your own, simply implementing it through FileValidator interface
 * and adding it to ParseFilePipe's constructor.
 *
 * @see [Built-in Pipes](https://docs.nestjs.com/pipes#built-in-pipes)
 *
 * @publicApi
 */
export declare class ParseFilePipe implements PipeTransform<any> {
    protected exceptionFactory: (error: string) => any;
    private readonly validators;
    private readonly fileIsRequired;
    constructor(options?: ParseFileOptions);
    transform(value: any): Promise<any>;
    private validateFilesOrFile;
    private thereAreNoFilesIn;
    protected validate(file: any): Promise<any>;
    private validateOrThrow;
    /**
     * @returns list of validators used in this pipe.
     */
    getValidators(): FileValidator<Record<string, any>, import("./interfaces").IFile>[];
}
