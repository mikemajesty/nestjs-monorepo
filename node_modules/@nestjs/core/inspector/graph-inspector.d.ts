import { NestContainer } from '../injector/container';
import { InstanceWrapper } from '../injector/instance-wrapper';
import { Module } from '../injector/module';
import { EnhancerMetadataCacheEntry } from './interfaces/enhancer-metadata-cache-entry.interface';
import { Entrypoint } from './interfaces/entrypoint.interface';
import { OrphanedEnhancerDefinition } from './interfaces/extras.interface';
import { Node } from './interfaces/node.interface';
export declare class GraphInspector {
    private readonly container;
    private readonly graph;
    private readonly enhancersMetadataCache;
    constructor(container: NestContainer);
    inspectModules(modules?: Map<string, Module>): void;
    registerPartial(error: unknown): void;
    inspectInstanceWrapper<T = any>(source: InstanceWrapper<T>, moduleRef: Module): void;
    insertEnhancerMetadataCache(entry: EnhancerMetadataCacheEntry): void;
    insertOrphanedEnhancer(entry: OrphanedEnhancerDefinition): void;
    insertAttachedEnhancer(wrapper: InstanceWrapper): void;
    insertEntrypointDefinition<T>(definition: Entrypoint<T>, parentId: string): void;
    insertClassNode(moduleRef: Module, wrapper: InstanceWrapper, type: Exclude<Node['metadata']['type'], 'module'>): void;
    private insertModuleNode;
    private insertModuleToModuleEdges;
    private insertEnhancerEdge;
    private insertClassToClassEdge;
    private insertClassNodes;
}
