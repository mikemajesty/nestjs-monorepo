import { Path } from '@angular-devkit/core';
export interface ParseOptions {
    name: string;
    path?: string;
}
export interface Location {
    name: string;
    path: Path;
}
export declare class NameParser {
    parse(options: ParseOptions): Location;
}
