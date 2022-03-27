import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ApiException } from 'libs/utils';

import { ILoggerService } from './adapter';

@Injectable()
export class LoggerService extends ConsoleLogger implements ILoggerService {
  private env: string;
  constructor(env: string) {
    super();
    this.env = env;
  }

  error(error: ApiException): void {
    const context = this.context;
    super.context = context;

    if (this.env !== 'test') {
      super.error({
        status: [error.statusCode, error.code, error['status']].find((c) => c),
        traceId: error.uuid,
        ...{
          message: error.message,
          context: error.context,
          stack: error.stack,
          request: error.config,
        },
      });
    }
  }
}
