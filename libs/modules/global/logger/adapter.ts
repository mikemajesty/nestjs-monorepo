import { LogLevel } from '@nestjs/common';
import { ApiException } from 'libs/utils';

export abstract class ILoggerService {
  abstract setContext(context: string): void;
  abstract setLogLevels(levels: LogLevel[]): void;
  abstract error(exception: ApiException): void;
  abstract log(message: string, context?: string): void;
  abstract debug(message: string, context?: string): void;
  abstract warn(message: string, context?: string): void;
  abstract verbose(message: string, context?: string): void;
}
