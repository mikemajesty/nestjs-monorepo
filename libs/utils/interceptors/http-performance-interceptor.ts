import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ILoggerService } from 'libs/modules';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: ILoggerService) {}
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const context = `${ctx.getClass().name}/${ctx.getHandler().name}`;
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this.loggerService.log(`${context} ${Date.now() - now}ms`, this.loggerService.context)));
  }
}
