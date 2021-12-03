import { ApiException } from '@libs/utils';
import { ConsoleLogger, Injectable } from '@nestjs/common';

import { ILoggerService } from './adapter';

@Injectable()
export class LoggerService extends ConsoleLogger implements ILoggerService {
  private env: string;
  constructor(env: string) {
    super();
    this.env = env;
  }

  error(error: ApiException): void {
    super.context = [super.context, error.context, this.context].find((c) => c);
    if (this.env !== 'test') {
      super.error({
        status: [error.statusCode, error.code].find((c) => c),
        traceId: error.uuid,
        ...{
          message: error.message,
          context: super.context,
          stack: error.stack,
          request: error.config,
        },
      });
    }
  }
}
