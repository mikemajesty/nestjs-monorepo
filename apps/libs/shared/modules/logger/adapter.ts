import { ApiException } from '../../../utils/exception';

export abstract class ILoggerService {
  abstract setContext(context: string): void;
  abstract error(exception: ApiException): void;
  abstract log(message: string, context?: string): void;
  abstract debug(message: string, context?: string): void;
  abstract warn(message: string, context?: string): void;
  abstract verbose(message: string, context?: string): void;
}
