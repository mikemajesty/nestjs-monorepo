"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeterministicUuidRegistry = void 0;
class DeterministicUuidRegistry {
    static get(str, inc = 0) {
        const id = inc ? this.hashCode(`${str}_${inc}`) : this.hashCode(str);
        if (this.registry.has(id)) {
            return this.get(str, inc + 1);
        }
        this.registry.set(id, true);
        return id;
    }
    static clear() {
        this.registry.clear();
    }
    static hashCode(s) {
        let h = 0;
        for (let i = 0; i < s.length; i++)
            h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return h.toString();
    }
}
exports.DeterministicUuidRegistry = DeterministicUuidRegistry;
DeterministicUuidRegistry.registry = new Map();
