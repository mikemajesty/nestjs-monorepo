"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceWrapper = exports.INSTANCE_ID_SYMBOL = exports.INSTANCE_METADATA_SYMBOL = void 0;
const common_1 = require("@nestjs/common");
const cli_colors_util_1 = require("@nestjs/common/utils/cli-colors.util");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const iterare_1 = require("iterare");
const uuid_factory_1 = require("../inspector/uuid-factory");
const constants_1 = require("./constants");
const provider_classifier_1 = require("./helpers/provider-classifier");
exports.INSTANCE_METADATA_SYMBOL = Symbol.for('instance_metadata:cache');
exports.INSTANCE_ID_SYMBOL = Symbol.for('instance_metadata:id');
class InstanceWrapper {
    constructor(metadata = {}) {
        this.isAlias = false;
        this.scope = common_1.Scope.DEFAULT;
        this.values = new WeakMap();
        this[_a] = {};
        this.initialize(metadata);
        this[exports.INSTANCE_ID_SYMBOL] =
            metadata[exports.INSTANCE_ID_SYMBOL] ?? this.generateUuid();
    }
    get id() {
        return this[exports.INSTANCE_ID_SYMBOL];
    }
    set instance(value) {
        this.values.set(constants_1.STATIC_CONTEXT, { instance: value });
    }
    get instance() {
        const instancePerContext = this.getInstanceByContextId(constants_1.STATIC_CONTEXT);
        return instancePerContext.instance;
    }
    get isNotMetatype() {
        return !this.metatype || this.isFactory;
    }
    get isFactory() {
        return this.metatype && !(0, shared_utils_1.isNil)(this.inject);
    }
    get isTransient() {
        return this.scope === common_1.Scope.TRANSIENT;
    }
    getInstanceByContextId(contextId, inquirerId) {
        if (this.scope === common_1.Scope.TRANSIENT && inquirerId) {
            return this.getInstanceByInquirerId(contextId, inquirerId);
        }
        const instancePerContext = this.values.get(contextId);
        return instancePerContext
            ? instancePerContext
            : this.cloneStaticInstance(contextId);
    }
    getInstanceByInquirerId(contextId, inquirerId) {
        let collectionPerContext = this.transientMap.get(inquirerId);
        if (!collectionPerContext) {
            collectionPerContext = new WeakMap();
            this.transientMap.set(inquirerId, collectionPerContext);
        }
        const instancePerContext = collectionPerContext.get(contextId);
        return instancePerContext
            ? instancePerContext
            : this.cloneTransientInstance(contextId, inquirerId);
    }
    setInstanceByContextId(contextId, value, inquirerId) {
        if (this.scope === common_1.Scope.TRANSIENT && inquirerId) {
            return this.setInstanceByInquirerId(contextId, inquirerId, value);
        }
        this.values.set(contextId, value);
    }
    setInstanceByInquirerId(contextId, inquirerId, value) {
        let collection = this.transientMap.get(inquirerId);
        if (!collection) {
            collection = new WeakMap();
            this.transientMap.set(inquirerId, collection);
        }
        collection.set(contextId, value);
    }
    addCtorMetadata(index, wrapper) {
        if (!this[exports.INSTANCE_METADATA_SYMBOL].dependencies) {
            this[exports.INSTANCE_METADATA_SYMBOL].dependencies = [];
        }
        this[exports.INSTANCE_METADATA_SYMBOL].dependencies[index] = wrapper;
    }
    getCtorMetadata() {
        return this[exports.INSTANCE_METADATA_SYMBOL].dependencies;
    }
    addPropertiesMetadata(key, wrapper) {
        if (!this[exports.INSTANCE_METADATA_SYMBOL].properties) {
            this[exports.INSTANCE_METADATA_SYMBOL].properties = [];
        }
        this[exports.INSTANCE_METADATA_SYMBOL].properties.push({
            key,
            wrapper,
        });
    }
    getPropertiesMetadata() {
        return this[exports.INSTANCE_METADATA_SYMBOL].properties;
    }
    addEnhancerMetadata(wrapper) {
        if (!this[exports.INSTANCE_METADATA_SYMBOL].enhancers) {
            this[exports.INSTANCE_METADATA_SYMBOL].enhancers = [];
        }
        this[exports.INSTANCE_METADATA_SYMBOL].enhancers.push(wrapper);
    }
    getEnhancersMetadata() {
        return this[exports.INSTANCE_METADATA_SYMBOL].enhancers;
    }
    isDependencyTreeDurable(lookupRegistry = []) {
        if (!(0, shared_utils_1.isUndefined)(this.isTreeDurable)) {
            return this.isTreeDurable;
        }
        if (this.scope === common_1.Scope.REQUEST) {
            this.isTreeDurable = this.durable === undefined ? false : this.durable;
            if (this.isTreeDurable) {
                this.printIntrospectedAsDurable();
            }
            return this.isTreeDurable;
        }
        const isStatic = this.isDependencyTreeStatic();
        if (isStatic) {
            return false;
        }
        const isTreeNonDurable = this.introspectDepsAttribute((collection, registry) => collection.some((item) => !item.isDependencyTreeStatic() &&
            !item.isDependencyTreeDurable(registry)), lookupRegistry);
        this.isTreeDurable = !isTreeNonDurable;
        if (this.isTreeDurable) {
            this.printIntrospectedAsDurable();
        }
        return this.isTreeDurable;
    }
    introspectDepsAttribute(callback, lookupRegistry = []) {
        if (lookupRegistry.includes(this[exports.INSTANCE_ID_SYMBOL])) {
            return false;
        }
        lookupRegistry = lookupRegistry.concat(this[exports.INSTANCE_ID_SYMBOL]);
        const { dependencies, properties, enhancers } = this[exports.INSTANCE_METADATA_SYMBOL];
        let introspectionResult = dependencies
            ? callback(dependencies, lookupRegistry)
            : false;
        if (introspectionResult || !(properties || enhancers)) {
            return introspectionResult;
        }
        introspectionResult = properties
            ? callback(properties.map(item => item.wrapper), lookupRegistry)
            : false;
        if (introspectionResult || !enhancers) {
            return introspectionResult;
        }
        return enhancers ? callback(enhancers, lookupRegistry) : false;
    }
    isDependencyTreeStatic(lookupRegistry = []) {
        if (!(0, shared_utils_1.isUndefined)(this.isTreeStatic)) {
            return this.isTreeStatic;
        }
        if (this.scope === common_1.Scope.REQUEST) {
            this.isTreeStatic = false;
            this.printIntrospectedAsRequestScoped();
            return this.isTreeStatic;
        }
        this.isTreeStatic = !this.introspectDepsAttribute((collection, registry) => collection.some((item) => !item.isDependencyTreeStatic(registry)), lookupRegistry);
        if (!this.isTreeStatic) {
            this.printIntrospectedAsRequestScoped();
        }
        return this.isTreeStatic;
    }
    cloneStaticInstance(contextId) {
        const staticInstance = this.getInstanceByContextId(constants_1.STATIC_CONTEXT);
        if (this.isDependencyTreeStatic()) {
            return staticInstance;
        }
        const instancePerContext = {
            ...staticInstance,
            instance: undefined,
            isResolved: false,
            isPending: false,
        };
        if (this.isNewable()) {
            instancePerContext.instance = Object.create(this.metatype.prototype);
        }
        this.setInstanceByContextId(contextId, instancePerContext);
        return instancePerContext;
    }
    cloneTransientInstance(contextId, inquirerId) {
        const staticInstance = this.getInstanceByContextId(constants_1.STATIC_CONTEXT);
        const instancePerContext = {
            ...staticInstance,
            instance: undefined,
            isResolved: false,
            isPending: false,
        };
        if (this.isNewable()) {
            instancePerContext.instance = Object.create(this.metatype.prototype);
        }
        this.setInstanceByInquirerId(contextId, inquirerId, instancePerContext);
        return instancePerContext;
    }
    createPrototype(contextId) {
        const host = this.getInstanceByContextId(contextId);
        if (!this.isNewable() || host.isResolved) {
            return;
        }
        return Object.create(this.metatype.prototype);
    }
    isInRequestScope(contextId, inquirer) {
        const isDependencyTreeStatic = this.isDependencyTreeStatic();
        return (!isDependencyTreeStatic &&
            contextId !== constants_1.STATIC_CONTEXT &&
            (!this.isTransient || (this.isTransient && !!inquirer)));
    }
    isLazyTransient(contextId, inquirer) {
        const isInquirerRequestScoped = inquirer && !inquirer.isDependencyTreeStatic();
        return (this.isDependencyTreeStatic() &&
            contextId !== constants_1.STATIC_CONTEXT &&
            this.isTransient &&
            isInquirerRequestScoped);
    }
    isExplicitlyRequested(contextId, inquirer) {
        const isSelfRequested = inquirer === this;
        return (this.isDependencyTreeStatic() &&
            contextId !== constants_1.STATIC_CONTEXT &&
            (isSelfRequested || (inquirer && inquirer.scope === common_1.Scope.TRANSIENT)));
    }
    isStatic(contextId, inquirer) {
        const isInquirerRequestScoped = inquirer && !inquirer.isDependencyTreeStatic();
        const isStaticTransient = this.isTransient && !isInquirerRequestScoped;
        return (this.isDependencyTreeStatic() &&
            contextId === constants_1.STATIC_CONTEXT &&
            (!this.isTransient ||
                (isStaticTransient && !!inquirer && !inquirer.isTransient)));
    }
    getStaticTransientInstances() {
        if (!this.transientMap) {
            return [];
        }
        const instances = [...this.transientMap.values()];
        return (0, iterare_1.iterate)(instances)
            .map(item => item.get(constants_1.STATIC_CONTEXT))
            .filter(item => !!item)
            .toArray();
    }
    mergeWith(provider) {
        if ((0, provider_classifier_1.isValueProvider)(provider)) {
            this.metatype = null;
            this.inject = null;
            this.scope = common_1.Scope.DEFAULT;
            this.setInstanceByContextId(constants_1.STATIC_CONTEXT, {
                instance: provider.useValue,
                isResolved: true,
                isPending: false,
            });
        }
        else if ((0, provider_classifier_1.isClassProvider)(provider)) {
            this.inject = null;
            this.metatype = provider.useClass;
        }
        else if ((0, provider_classifier_1.isFactoryProvider)(provider)) {
            this.metatype = provider.useFactory;
            this.inject = provider.inject || [];
        }
    }
    isNewable() {
        return (0, shared_utils_1.isNil)(this.inject) && this.metatype && this.metatype.prototype;
    }
    initialize(metadata) {
        const { instance, isResolved, ...wrapperPartial } = metadata;
        Object.assign(this, wrapperPartial);
        this.setInstanceByContextId(constants_1.STATIC_CONTEXT, {
            instance,
            isResolved,
        });
        this.scope === common_1.Scope.TRANSIENT && (this.transientMap = new Map());
    }
    printIntrospectedAsRequestScoped() {
        if (!this.isDebugMode() || this.name === 'REQUEST') {
            return;
        }
        if ((0, shared_utils_1.isString)(this.name)) {
            InstanceWrapper.logger.log(`${cli_colors_util_1.clc.cyanBright(this.name)}${cli_colors_util_1.clc.green(' introspected as ')}${cli_colors_util_1.clc.magentaBright('request-scoped')}`);
        }
    }
    printIntrospectedAsDurable() {
        if (!this.isDebugMode()) {
            return;
        }
        if ((0, shared_utils_1.isString)(this.name)) {
            InstanceWrapper.logger.log(`${cli_colors_util_1.clc.cyanBright(this.name)}${cli_colors_util_1.clc.green(' introspected as ')}${cli_colors_util_1.clc.magentaBright('durable')}`);
        }
    }
    isDebugMode() {
        return !!process.env.NEST_DEBUG;
    }
    generateUuid() {
        let key = this.name?.toString() ?? this.token?.toString();
        key += this.host?.name ?? '';
        return key ? uuid_factory_1.UuidFactory.get(key) : (0, random_string_generator_util_1.randomStringGenerator)();
    }
}
exports.InstanceWrapper = InstanceWrapper;
_a = exports.INSTANCE_METADATA_SYMBOL;
InstanceWrapper.logger = new common_1.Logger(InstanceWrapper.name);
