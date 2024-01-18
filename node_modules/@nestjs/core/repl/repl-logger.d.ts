import { ConsoleLogger } from '@nestjs/common';
export declare class ReplLogger extends ConsoleLogger {
    private static readonly ignoredContexts;
    log(_message: any, context?: string): void;
}
