import { NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '../interfaces/multer-options.interface';
/**
 *
 * @param fieldName
 * @param maxCount
 * @param localOptions
 *
 * @publicApi
 */
export declare function FilesInterceptor(fieldName: string, maxCount?: number, localOptions?: MulterOptions): Type<NestInterceptor>;
