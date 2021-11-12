import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';

import { LoggerService } from '../modules/logger/service';
import { SecretsService } from '../modules/secrets/service';
import * as errorStatus from '../static/htttp-status.json';
import { ApiException, ErrorModel } from '../utils';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    new LoggerService(new SecretsService().ENV).error(exception);

    const code = [exception.code, status, HttpStatus.INTERNAL_SERVER_ERROR].find((c) => c);

    const error: ErrorModel = {
      error: {
        code,
        traceId: exception.uuid,
        message: errorStatus[code] || exception.message,
        timestamp: moment(new Date()).format('DD/MM/yyyy HH:mm:ss'),
        path: request.url,
      },
    };

    response.status(status).json(error);
  }
}
