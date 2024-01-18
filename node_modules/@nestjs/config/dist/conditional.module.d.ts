/// <reference types="node" />
import { DynamicModule, ModuleMetadata } from '@nestjs/common';
/**
 * @publicApi
 */
export declare class ConditionalModule {
    /**
     * @publicApi
     */
    static registerWhen(module: Required<ModuleMetadata>['imports'][number], condition: string | ((env: NodeJS.ProcessEnv) => boolean), options?: {
        timeout: number;
    }): Promise<Required<Pick<DynamicModule, "imports" | "exports" | "module">>>;
}
