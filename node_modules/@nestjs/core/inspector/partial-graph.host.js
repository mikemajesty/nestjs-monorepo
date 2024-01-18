"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialGraphHost = void 0;
class PartialGraphHost {
    static toJSON() {
        return this.partialGraph?.toJSON();
    }
    static toString() {
        return this.partialGraph?.toString();
    }
    static register(partialGraph) {
        this.partialGraph = partialGraph;
    }
}
exports.PartialGraphHost = PartialGraphHost;
