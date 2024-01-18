"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeOnPreviewAllowlist = void 0;
class InitializeOnPreviewAllowlist {
    static add(type) {
        this.allowlist.set(type, true);
    }
    static has(type) {
        return this.allowlist.has(type);
    }
}
exports.InitializeOnPreviewAllowlist = InitializeOnPreviewAllowlist;
InitializeOnPreviewAllowlist.allowlist = new WeakMap();
