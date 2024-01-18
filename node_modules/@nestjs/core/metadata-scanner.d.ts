import { Injectable } from '@nestjs/common/interfaces/injectable.interface';
export declare class MetadataScanner {
    private readonly cachedScannedPrototypes;
    /**
     * @deprecated
     * @see {@link getAllMethodNames}
     * @see getAllMethodNames
     */
    scanFromPrototype<T extends Injectable, R = any>(instance: T, prototype: object, callback: (name: string) => R): R[];
    /**
     * @deprecated
     * @see {@link getAllMethodNames}
     * @see getAllMethodNames
     */
    getAllFilteredMethodNames(prototype: object): IterableIterator<string>;
    getAllMethodNames(prototype: object | null): string[];
}
