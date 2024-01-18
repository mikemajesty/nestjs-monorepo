"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVirtualAstObject = void 0;
const json_1 = require("../../json");
function createVirtualAstObject(root, options = {}) {
    const reporter = (path, target, oldValue, newValue) => {
        if (!options.listener) {
            return;
        }
        if (oldValue === newValue || JSON.stringify(oldValue) === JSON.stringify(newValue)) {
            // same value
            return;
        }
        if (Array.isArray(target)) {
            // For arrays we remove the index and update the entire value as keeping
            // track of changes by indices can be rather complex.
            options.listener(path.slice(0, -1), target);
        }
        else {
            options.listener(path, newValue);
        }
    };
    return create(Array.isArray(root) ? [...root] : { ...root }, [], reporter, new Set(options.exclude), options.include?.length ? new Set(options.include) : undefined);
}
exports.createVirtualAstObject = createVirtualAstObject;
function create(obj, path, reporter, excluded = new Set(), included) {
    return new Proxy(obj, {
        getOwnPropertyDescriptor(target, p) {
            if (excluded.has(p) || (included && !included.has(p))) {
                return undefined;
            }
            return Reflect.getOwnPropertyDescriptor(target, p);
        },
        has(target, p) {
            if (typeof p === 'symbol' || excluded.has(p)) {
                return false;
            }
            return Reflect.has(target, p);
        },
        get(target, p) {
            if (excluded.has(p) || (included && !included.has(p))) {
                return undefined;
            }
            const value = Reflect.get(target, p);
            if (typeof p === 'symbol') {
                return value;
            }
            if (((0, json_1.isJsonObject)(value) && !(value instanceof Map)) || Array.isArray(value)) {
                return create(value, [...path, p], reporter);
            }
            else {
                return value;
            }
        },
        set(target, p, value) {
            if (excluded.has(p) || (included && !included.has(p))) {
                return false;
            }
            if (value === undefined) {
                // setting to undefined is equivalent to a delete.
                return this.deleteProperty?.(target, p) ?? false;
            }
            if (typeof p === 'symbol') {
                return Reflect.set(target, p, value);
            }
            const existingValue = getCurrentValue(target, p);
            if (Reflect.set(target, p, value)) {
                reporter([...path, p], target, existingValue, value);
                return true;
            }
            return false;
        },
        deleteProperty(target, p) {
            if (excluded.has(p)) {
                return false;
            }
            if (typeof p === 'symbol') {
                return Reflect.deleteProperty(target, p);
            }
            const existingValue = getCurrentValue(target, p);
            if (Reflect.deleteProperty(target, p)) {
                reporter([...path, p], target, existingValue, undefined);
                return true;
            }
            return true;
        },
        defineProperty(target, p, attributes) {
            if (typeof p === 'symbol') {
                return Reflect.defineProperty(target, p, attributes);
            }
            return false;
        },
        ownKeys(target) {
            return Reflect.ownKeys(target).filter((p) => !excluded.has(p) && (!included || included.has(p)));
        },
    });
}
function getCurrentValue(target, property) {
    if (Array.isArray(target) && isFinite(+property)) {
        return target[+property];
    }
    if (target && property in target) {
        return target[property];
    }
    return undefined;
}
