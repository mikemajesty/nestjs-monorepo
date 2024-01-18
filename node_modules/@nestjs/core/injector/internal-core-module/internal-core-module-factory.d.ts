import { HttpAdapterHost } from '../../helpers/http-adapter-host';
import { GraphInspector } from '../../inspector/graph-inspector';
import { ModuleOverride } from '../../interfaces/module-override.interface';
import { DependenciesScanner } from '../../scanner';
import { ModuleCompiler } from '../compiler';
import { NestContainer } from '../container';
export declare class InternalCoreModuleFactory {
    static create(container: NestContainer, scanner: DependenciesScanner, moduleCompiler: ModuleCompiler, httpAdapterHost: HttpAdapterHost, graphInspector: GraphInspector, moduleOverrides?: ModuleOverride[]): import("@nestjs/common").DynamicModule;
}
