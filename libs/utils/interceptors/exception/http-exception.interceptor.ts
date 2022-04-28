import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        error.status = [error.status, error?.response?.status, 500].find((s) => s);

        const isClassValidatorError = [
          error.status === HttpStatus.PRECONDITION_FAILED,
          Array.isArray(error?.response?.message),
        ].every((e) => e);

        if (isClassValidatorError) {
          error.message = error?.response?.message;
        }

        const headers = ctx.getArgs()[0]?.headers;

        error.user = headers.user;
        const context = `${ctx.getClass().name}/${ctx.getHandler().name}`;

        if (typeof error === 'object' && !error.traceid) {
          error.traceid = headers.traceid;
        }

        error.context = error.context = context;
        throw error;
      }),
    );
  }
}
