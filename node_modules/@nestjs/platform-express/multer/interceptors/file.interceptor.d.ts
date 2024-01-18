import { NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '../interfaces/multer-options.interface';
/**
 * @param fieldName
 * @param localOptions
 *
 * @publicApi
 */
export declare function FileInterceptor(fieldName: string, localOptions?: MulterOptions): Type<NestInterceptor>;
