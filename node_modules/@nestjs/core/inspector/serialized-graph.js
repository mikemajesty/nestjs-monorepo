"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializedGraph = void 0;
const application_config_1 = require("../application-config");
const external_context_creator_1 = require("../helpers/external-context-creator");
const http_adapter_host_1 = require("../helpers/http-adapter-host");
const inquirer_constants_1 = require("../injector/inquirer/inquirer-constants");
const lazy_module_loader_1 = require("../injector/lazy-module-loader/lazy-module-loader");
const module_ref_1 = require("../injector/module-ref");
const modules_container_1 = require("../injector/modules-container");
const request_constants_1 = require("../router/request/request-constants");
const reflector_service_1 = require("../services/reflector.service");
const deterministic_uuid_registry_1 = require("./deterministic-uuid-registry");
class SerializedGraph {
    constructor() {
        this.nodes = new Map();
        this.edges = new Map();
        this.entrypoints = new Map();
        this.extras = {
            orphanedEnhancers: [],
            attachedEnhancers: [],
        };
        this._status = 'complete';
    }
    set status(status) {
        this._status = status;
    }
    set metadata(metadata) {
        this._metadata = metadata;
    }
    insertNode(nodeDefinition) {
        if (nodeDefinition.metadata.type === 'provider' &&
            SerializedGraph.INTERNAL_PROVIDERS.includes(nodeDefinition.metadata.token)) {
            nodeDefinition.metadata = {
                ...nodeDefinition.metadata,
                internal: true,
            };
        }
        if (this.nodes.has(nodeDefinition.id)) {
            return this.nodes.get(nodeDefinition.id);
        }
        this.nodes.set(nodeDefinition.id, nodeDefinition);
        return nodeDefinition;
    }
    insertEdge(edgeDefinition) {
        if (edgeDefinition.metadata.type === 'class-to-class' &&
            (SerializedGraph.INTERNAL_PROVIDERS.includes(edgeDefinition.metadata.sourceClassToken) ||
                SerializedGraph.INTERNAL_PROVIDERS.includes(edgeDefinition.metadata.targetClassToken))) {
            edgeDefinition.metadata = {
                ...edgeDefinition.metadata,
                internal: true,
            };
        }
        const id = edgeDefinition.id ?? this.generateUuidByEdgeDefinition(edgeDefinition);
        const edge = {
            ...edgeDefinition,
            id,
        };
        this.edges.set(id, edge);
        return edge;
    }
    insertEntrypoint(definition, parentId) {
        if (this.entrypoints.has(parentId)) {
            const existingCollection = this.entrypoints.get(parentId);
            existingCollection.push(definition);
        }
        else {
            this.entrypoints.set(parentId, [definition]);
        }
    }
    insertOrphanedEnhancer(entry) {
        this.extras.orphanedEnhancers.push(entry);
    }
    insertAttachedEnhancer(nodeId) {
        this.extras.attachedEnhancers.push({
            nodeId,
        });
    }
    getNodeById(id) {
        return this.nodes.get(id);
    }
    toJSON() {
        const json = {
            nodes: Object.fromEntries(this.nodes),
            edges: Object.fromEntries(this.edges),
            entrypoints: Object.fromEntries(this.entrypoints),
            extras: this.extras,
        };
        if (this._status) {
            json['status'] = this._status;
        }
        if (this._metadata) {
            json['metadata'] = this._metadata;
        }
        return json;
    }
    toString() {
        const replacer = (key, value) => {
            if (typeof value === 'symbol') {
                return value.toString();
            }
            return typeof value === 'function' ? value.name ?? 'Function' : value;
        };
        return JSON.stringify(this.toJSON(), replacer, 2);
    }
    generateUuidByEdgeDefinition(edgeDefinition) {
        return deterministic_uuid_registry_1.DeterministicUuidRegistry.get(JSON.stringify(edgeDefinition));
    }
}
exports.SerializedGraph = SerializedGraph;
SerializedGraph.INTERNAL_PROVIDERS = [
    application_config_1.ApplicationConfig,
    module_ref_1.ModuleRef,
    http_adapter_host_1.HttpAdapterHost,
    lazy_module_loader_1.LazyModuleLoader,
    external_context_creator_1.ExternalContextCreator,
    modules_container_1.ModulesContainer,
    reflector_service_1.Reflector,
    SerializedGraph,
    http_adapter_host_1.HttpAdapterHost.name,
    reflector_service_1.Reflector.name,
    request_constants_1.REQUEST,
    inquirer_constants_1.INQUIRER,
];
