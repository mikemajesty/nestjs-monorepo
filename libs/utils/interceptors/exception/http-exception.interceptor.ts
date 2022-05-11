import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { ApiRequest } from 'libs/utils/request';
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

        const request: ApiRequest = ctx.switchToHttp().getRequest();

        const headers = ctx.getArgs()[0]?.headers;

        error.user = headers.user;

        this.sanitizeExternalError(error);

        if (typeof error === 'object' && !error.traceid) {
          error.traceid = headers.traceid;
        }

        const context = `${ctx.getClass().name}/${ctx.getHandler().name}`;

        if (request?.tracing) {
          request.tracing.setTag(request.tracing.tags.ERROR, true);
          request.tracing.setTag('statusCode', error.status);
          request.tracing.setTag('message', error.message);
          request.tracing.finish();
        }

        error.context = error.context = context;
        throw error;
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private sanitizeExternalError(error: any) {
    if (typeof error?.response === 'object' && error?.isAxiosError) {
      error['getReponse'] = () => ({ ...error?.response?.data?.error });
      error['getStatus'] = () => error?.response?.data?.error?.code || error?.status;
      error.message = error?.response?.data?.error?.message || error.message;
    }
  }
}
