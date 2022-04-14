import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import * as moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid';

import { getTimeExecution } from '..';
import { ApiException, ErrorModel } from '../exception';
import * as errorStatus from '../static/htttp-status.json';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: ILoggerService) {}

  catch(exception: ApiException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    const time = getTimeExecution((request.headers as unknown as { time: number })?.time);
    exception.time = time;

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (!exception.uuid) {
      exception.uuid = uuidv4();
    }

    this.loggerService.error(exception);

    const code = [exception.code, status, HttpStatus.INTERNAL_SERVER_ERROR].find((c) => c);

    response.status(status).json({
      error: {
        code,
        traceId: exception.uuid,
        message: errorStatus[String(code)] || exception.message,
        timestamp: moment(new Date()).tz(process.env.TZ).format('DD/MM/yyyy HH:mm:ss'),
        path: request.url,
      },
    } as ErrorModel);
  }
}
