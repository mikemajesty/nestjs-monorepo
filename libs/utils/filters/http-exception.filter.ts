import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import * as moment from 'moment-timezone';

import { ApiException, ErrorModel } from '../exception';
import * as errorStatus from '../static/htttp-status.json';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: ILoggerService) {}

  catch(exception: ApiException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception['status'] || HttpStatus.INTERNAL_SERVER_ERROR;

    exception.traceid = [exception.traceid, request['id']].find((t) => t);

    this.loggerService.error(exception, exception.message, exception.context);

    const code = [exception.code, status, HttpStatus.INTERNAL_SERVER_ERROR].find((c) => c);

    response.status(status).json({
      error: {
        code,
        traceid: exception.traceid,
        message: errorStatus[String(code)] || exception.message,
        timestamp: moment(new Date()).tz(process.env.TZ).format(),
        path: request.url,
      },
    } as ErrorModel);
  }
}
