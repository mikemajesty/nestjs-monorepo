import { DynamicModule } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces/type.interface';
export declare class ModuleTokenFactory {
    private readonly moduleTokenCache;
    private readonly moduleIdsCache;
    private readonly logger;
    create(metatype: Type<unknown>, dynamicModuleMetadata?: Partial<DynamicModule> | undefined): string;
    getStaticModuleToken(moduleId: string, moduleName: string): string;
    getStringifiedOpaqueToken(opaqueToken: object | undefined): string;
    getModuleId(metatype: Type<unknown>): string;
    getModuleName(metatype: Type<any>): string;
    private hashString;
    private replacer;
}
