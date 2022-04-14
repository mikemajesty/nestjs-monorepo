import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { getTimeExecution } from 'libs/utils';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: ILoggerService) {}
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const host = ctx.getArgs()[0].hostname;
    const path = ctx.getArgs()[0].originalUrl;

    const context = `${ctx.getClass().name}/${ctx.getHandler().name}`;
    const now = Date.now();

    Object.assign(ctx.getArgs()[0]?.headers || {}, { time: now });

    return next.handle().pipe(
      tap(() => {
        const seconds = getTimeExecution(now);
        const logger = {
          context: context,
          url: `${host}${path}`,
          runtime: seconds,
          time: moment(new Date()).tz(process.env.TZ).format('DD/MM/yyyy HH:mm:ss'),
        };
        this.loggerService.log(JSON.stringify(logger, null, 1));
      }),
    );
  }
}
