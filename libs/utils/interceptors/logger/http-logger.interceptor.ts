import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: ILoggerService) {}
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const context = `${ctx.getClass().name}/${ctx.getHandler().name}`;

    ctx.getArgs()[1].req['context'] = context;

    if (!ctx.getArgs()[1].req.headers?.traceid) {
      ctx.getArgs()[1].req.headers.traceid = uuidv4();
    }

    this.loggerService.pino(ctx.getArgs()[1].req, ctx.getArgs()[0].res);
    return next.handle();
  }
}
