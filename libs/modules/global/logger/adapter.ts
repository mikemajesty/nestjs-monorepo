import { LevelWithSilent } from 'pino';
import { HttpLogger } from 'pino-http';

import { ErrorType, MessageType } from './type';

export abstract class ILoggerService {
  abstract pino: HttpLogger;
  abstract connect(logLevel?: LevelWithSilent): void;
  abstract setApplication(app: string): void;
  /**
   * @deprecated The method should be use only in main.ts, this log won't be saved in elastic, only sdout
   */
  abstract log(message: string): void;
  /**
   * this log won't be saved in elastic, only sdout
   */
  abstract trace({ message, context, obj }: MessageType): void;
  abstract info({ message, context, obj }: MessageType): void;
  abstract warn({ message, context, obj }: MessageType): void;
  abstract error(error: ErrorType, message?: string, context?: string): void;
  abstract fatal(error: ErrorType, message?: string, context?: string): void;
}
