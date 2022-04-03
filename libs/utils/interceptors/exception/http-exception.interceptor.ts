import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        error.status = error.status || 500;

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

        if (!error?.uuid) {
          error.uuid = uuidv4();
        }

        error.context = context;
        throw error;
      }),
    );
  }
}
