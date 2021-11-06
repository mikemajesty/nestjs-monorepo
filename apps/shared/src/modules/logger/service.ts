import { AppException } from '../../utils/exception';
import { ConsoleLogger, Injectable } from '@nestjs/common';

import { ILoggerService } from './adapter';

@Injectable()
export class LoggerService extends ConsoleLogger implements ILoggerService {
  private env: string;
  constructor(env: string) {
    super();
    this.env = env;
  }

  error(error: AppException): void {
    const context = error.context || this.context;
    super.context = context;
    if (this.env !== 'test') {
      super.error({
        status: error.statusCode || error.code,
        traceId: error.uuid,
        ...{
          message: error.message,
          context,
          stack: error.stack,
          request: error.config,
        },
      });
    }
  }
}
