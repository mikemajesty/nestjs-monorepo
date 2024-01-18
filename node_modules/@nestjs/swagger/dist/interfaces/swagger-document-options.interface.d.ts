export type OperationIdFactory = (controllerKey: string, methodKey: string, version?: string) => string;
export interface SwaggerDocumentOptions {
    include?: Function[];
    extraModels?: Function[];
    ignoreGlobalPrefix?: boolean;
    deepScanRoutes?: boolean;
    operationIdFactory?: OperationIdFactory;
}
