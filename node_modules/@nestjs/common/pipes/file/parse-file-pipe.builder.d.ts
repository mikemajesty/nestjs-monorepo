import { FileTypeValidatorOptions } from './file-type.validator';
import { FileValidator } from './file-validator.interface';
import { MaxFileSizeValidatorOptions } from './max-file-size.validator';
import { ParseFileOptions } from './parse-file-options.interface';
import { ParseFilePipe } from './parse-file.pipe';
/**
 * @publicApi
 */
export declare class ParseFilePipeBuilder {
    private validators;
    addMaxSizeValidator(options: MaxFileSizeValidatorOptions): this;
    addFileTypeValidator(options: FileTypeValidatorOptions): this;
    addValidator(validator: FileValidator): this;
    build(additionalOptions?: Omit<ParseFileOptions, 'validators'>): ParseFilePipe;
}
