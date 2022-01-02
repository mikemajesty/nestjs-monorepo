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
          error.message = error.response.message;
        }

        const context = `${ctx.getClass().name}/${ctx.getHandler().name}`;
        error.uuid = uuidv4();
        error.context = context;
        throw error;
      }),
    );
  }
}
