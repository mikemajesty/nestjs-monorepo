import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { ApiRequest } from 'libs/utils/request';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(executionContext: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        error.status = [error.status, error?.response?.status, 500].find(Boolean);

        const isClassValidatorError = [
          error.status === HttpStatus.PRECONDITION_FAILED,
          Array.isArray(error?.response?.message),
        ].every(Boolean);

        if (isClassValidatorError) {
          error.message = error?.response?.message.join(', ');
          error.response.message = error.message;
        }

        const request: ApiRequest = executionContext.switchToHttp().getRequest();

        const headers = executionContext.getArgs()[0]?.headers;

        error.user = headers.user;

        this.sanitizeExternalError(error);

        if (typeof error === 'object' && !error.traceid) {
          error.traceid = headers.traceid;
        }

        const context = `${executionContext.getClass().name}/${executionContext.getHandler().name}`;

        if (request?.tracing) {
          request.tracing.setTag(request.tracing.tags.ERROR, true);
          request.tracing.setTag('message', error.message);
          request.tracing.setTag('statusCode', error.status);
          request.tracing.addTags({ traceId: error.traceid });
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
      error['getResponse'] = () => ({ ...error?.response?.data?.error });
      error['getStatus'] = () => error?.response?.data?.error?.code || error?.status;
      error.message = error?.response?.data?.error?.message || error.message;
      error.traceid = error?.response?.data?.error?.traceid;
    }
  }
}
