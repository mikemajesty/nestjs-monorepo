import { INestApplication } from '@nestjs/common';
import { OpenAPIObject, SwaggerCustomOptions, SwaggerDocumentOptions } from './interfaces';
export declare class SwaggerModule {
    private static readonly metadataLoader;
    static createDocument(app: INestApplication, config: Omit<OpenAPIObject, 'paths'>, options?: SwaggerDocumentOptions): OpenAPIObject;
    static loadPluginMetadata(metadataFn: () => Promise<Record<string, any>>): Promise<void>;
    private static serveStatic;
    private static serveDocuments;
    static setup(path: string, app: INestApplication, documentOrFactory: OpenAPIObject | (() => OpenAPIObject), options?: SwaggerCustomOptions): void;
}
