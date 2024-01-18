import { Type } from '@nestjs/common';
export declare class InitializeOnPreviewAllowlist {
    private static readonly allowlist;
    static add(type: Type): void;
    static has(type: Type): boolean;
}
