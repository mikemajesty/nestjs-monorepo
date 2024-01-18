import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from './interfaces';
import { ModuleRoute } from './interfaces/module-route.interface';
export declare class SwaggerTransformer {
    normalizePaths(denormalizedDoc: (Partial<OpenAPIObject> & Record<'root', any>)[]): Record<'paths', OpenAPIObject['paths']>;
    unescapeColonsInPath(app: INestApplication, moduleRoutes: ModuleRoute[]): ModuleRoute[];
}
