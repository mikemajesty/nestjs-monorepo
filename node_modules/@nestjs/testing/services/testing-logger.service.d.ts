import { ConsoleLogger } from '@nestjs/common';
/**
 * @publicApi
 */
export declare class TestingLogger extends ConsoleLogger {
    constructor();
    log(message: string): void;
    warn(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
    error(message: string, ...optionalParams: any[]): void;
}
