import { NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '../interfaces/multer-options.interface';
/**
 *
 * @param localOptions
 * @publicApi
 */
export declare function NoFilesInterceptor(localOptions?: MulterOptions): Type<NestInterceptor>;
