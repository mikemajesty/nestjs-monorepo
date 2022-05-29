import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: ILoggerService) {}
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const context = `${ctx.getClass().name}/${ctx.getHandler().name}`;

    const req = ctx.switchToHttp().getRequest();
    const res = ctx.switchToHttp().getResponse();

    req['context'] = context;

    if (!req.headers?.traceid) {
      req.headers.traceid = uuidv4();
    }

    this.loggerService.pino(req, res);
    return next.handle();
  }
}
