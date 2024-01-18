"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inheritPropertyInitializers = exports.inheritTransformationMetadata = exports.inheritValidationMetadata = exports.applyIsOptionalDecorator = void 0;
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('MappedTypes');
function applyIsOptionalDecorator(targetClass, propertyKey) {
    if (!isClassValidatorAvailable()) {
        return;
    }
    const classValidator = require('class-validator');
    const decoratorFactory = classValidator.IsOptional();
    decoratorFactory(targetClass.prototype, propertyKey);
}
exports.applyIsOptionalDecorator = applyIsOptionalDecorator;
function inheritValidationMetadata(parentClass, targetClass, isPropertyInherited) {
    if (!isClassValidatorAvailable()) {
        return;
    }
    try {
        const classValidator = require('class-validator');
        const metadataStorage = classValidator.getMetadataStorage
            ? classValidator.getMetadataStorage()
            : classValidator.getFromContainer(classValidator.MetadataStorage);
        const getTargetValidationMetadatasArgs = [parentClass, null, false, false];
        const targetMetadata = metadataStorage.getTargetValidationMetadatas(...getTargetValidationMetadatasArgs);
        return targetMetadata
            .filter(({ propertyName }) => !isPropertyInherited || isPropertyInherited(propertyName))
            .map((value) => {
            const originalType = Reflect.getMetadata('design:type', parentClass.prototype, value.propertyName);
            if (originalType) {
                Reflect.defineMetadata('design:type', originalType, targetClass.prototype, value.propertyName);
            }
            metadataStorage.addValidationMetadata({
                ...value,
                target: targetClass,
            });
            return value.propertyName;
        });
    }
    catch (err) {
        logger.error(`Validation ("class-validator") metadata cannot be inherited for "${parentClass.name}" class.`);
        logger.error(err);
    }
}
exports.inheritValidationMetadata = inheritValidationMetadata;
function inheritTransformationMetadata(parentClass, targetClass, isPropertyInherited) {
    if (!isClassTransformerAvailable()) {
        return;
    }
    try {
        const transformMetadataKeys = [
            '_excludeMetadatas',
            '_exposeMetadatas',
            '_transformMetadatas',
            '_typeMetadatas',
        ];
        transformMetadataKeys.forEach((key) => inheritTransformerMetadata(key, parentClass, targetClass, isPropertyInherited));
    }
    catch (err) {
        logger.error(`Transformer ("class-transformer") metadata cannot be inherited for "${parentClass.name}" class.`);
        logger.error(err);
    }
}
exports.inheritTransformationMetadata = inheritTransformationMetadata;
function inheritTransformerMetadata(key, parentClass, targetClass, isPropertyInherited) {
    let classTransformer;
    try {
        classTransformer = require('class-transformer/cjs/storage');
    }
    catch {
        classTransformer = require('class-transformer/storage');
    }
    const metadataStorage = classTransformer.defaultMetadataStorage;
    while (parentClass && parentClass !== Object) {
        if (metadataStorage[key].has(parentClass)) {
            const metadataMap = metadataStorage[key];
            const parentMetadata = metadataMap.get(parentClass);
            const targetMetadataEntries = Array.from(parentMetadata.entries())
                .filter(([key]) => !isPropertyInherited || isPropertyInherited(key))
                .map(([key, metadata]) => {
                if (Array.isArray(metadata)) {
                    const targetMetadata = metadata.map((item) => ({
                        ...item,
                        target: targetClass,
                    }));
                    return [key, targetMetadata];
                }
                return [key, { ...metadata, target: targetClass }];
            });
            if (metadataMap.has(targetClass)) {
                const existingRules = metadataMap.get(targetClass).entries();
                const mergeMap = new Map();
                [existingRules, targetMetadataEntries].forEach((entries) => {
                    for (const [valueKey, value] of entries) {
                        if (mergeMap.has(valueKey)) {
                            const parentValue = mergeMap.get(valueKey);
                            if (Array.isArray(parentValue)) {
                                parentValue.push(...(Array.isArray(value) ? value : [value]));
                            }
                        }
                        else {
                            mergeMap.set(valueKey, value);
                        }
                    }
                });
                metadataMap.set(targetClass, mergeMap);
            }
            else {
                metadataMap.set(targetClass, new Map(targetMetadataEntries));
            }
        }
        parentClass = Object.getPrototypeOf(parentClass);
    }
}
function isClassValidatorAvailable() {
    try {
        require('class-validator');
        return true;
    }
    catch {
        return false;
    }
}
function isClassTransformerAvailable() {
    try {
        require('class-transformer');
        return true;
    }
    catch {
        return false;
    }
}
function inheritPropertyInitializers(target, sourceClass, isPropertyInherited = (key) => true) {
    try {
        const tempInstance = new sourceClass();
        const propertyNames = Object.getOwnPropertyNames(tempInstance);
        propertyNames
            .filter((propertyName) => typeof tempInstance[propertyName] !== 'undefined' &&
            typeof target[propertyName] === 'undefined')
            .filter((propertyName) => isPropertyInherited(propertyName))
            .forEach((propertyName) => {
            target[propertyName] = tempInstance[propertyName];
        });
    }
    catch { }
}
exports.inheritPropertyInitializers = inheritPropertyInitializers;
