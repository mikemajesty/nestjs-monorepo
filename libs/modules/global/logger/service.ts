import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ApiException } from 'libs/utils';
import * as moment from 'moment-timezone';

import { ILoggerService } from './adapter';

@Injectable()
export class LoggerService extends ConsoleLogger implements ILoggerService {
  constructor(private readonly env: string) {
    super();
  }

  error(error: ApiException): void {
    const context = this.context;
    super.context = context;

    if (this.env !== 'test') {
      super.error({
        status: [error.statusCode, error.code, error['status']].find((c) => c),
        runtime: error.time,
        time: moment(new Date()).tz(process.env.TZ).format('DD/MM/yyyy HH:mm:ss'),
        traceId: error.uuid,
        ...{
          message: error['response'] ? error['response']?.data || error['response'] : error.message,
          context: error.context,
          user: error?.user,
          stack: error.stack,
        },
      });
    }
  }
}
