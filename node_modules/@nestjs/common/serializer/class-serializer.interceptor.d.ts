import { ClassSerializerContextOptions } from './class-serializer.interfaces';
import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, NestInterceptor } from '../interfaces';
import { ClassTransformOptions } from '../interfaces/external/class-transform-options.interface';
import { TransformerPackage } from '../interfaces/external/transformer-package.interface';
export interface PlainLiteralObject {
    [key: string]: any;
}
/**
 * @publicApi
 */
export interface ClassSerializerInterceptorOptions extends ClassTransformOptions {
    transformerPackage?: TransformerPackage;
}
/**
 * @publicApi
 */
export declare class ClassSerializerInterceptor implements NestInterceptor {
    protected readonly reflector: any;
    protected readonly defaultOptions: ClassSerializerInterceptorOptions;
    constructor(reflector: any, defaultOptions?: ClassSerializerInterceptorOptions);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    /**
     * Serializes responses that are non-null objects nor streamable files.
     */
    serialize(response: PlainLiteralObject | Array<PlainLiteralObject>, options: ClassSerializerContextOptions): PlainLiteralObject | Array<PlainLiteralObject>;
    transformToPlain(plainOrClass: any, options: ClassSerializerContextOptions): PlainLiteralObject;
    protected getContextOptions(context: ExecutionContext): ClassSerializerContextOptions | undefined;
}
