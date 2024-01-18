"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesContainer = void 0;
const uid_1 = require("uid");
class ModulesContainer extends Map {
    constructor() {
        super(...arguments);
        this._applicationId = (0, uid_1.uid)(21);
    }
    get applicationId() {
        return this._applicationId;
    }
    getById(id) {
        return Array.from(this.values()).find(moduleRef => moduleRef.id === id);
    }
}
exports.ModulesContainer = ModulesContainer;
