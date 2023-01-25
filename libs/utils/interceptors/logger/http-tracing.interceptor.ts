import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { initTracer, JaegerTracer, TracingConfig, TracingOptions } from 'jaeger-client';
import { ILoggerService } from 'libs/infra/logger/adapter';
import { TracingType } from 'libs/utils';
import { FORMAT_HTTP_HEADERS, Span, SpanOptions, Tags } from 'opentracing';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TracingInterceptor implements NestInterceptor {
  private tracer: JaegerTracer;
  private app: string;

  constructor({ app, version }: { app: string; version: string }, logger: ILoggerService) {
    this.app = app;

    const config: TracingConfig = {
      serviceName: app,
      sampler: {
        type: 'const',
        param: 1,
      },
    };

    const options: TracingOptions = this.getTracingLogger(logger);

    options.tags = {
      'service.version': version,
      'service.name': app,
    };

    this.tracer = initTracer(config, options);
  }

  intercept(executionContext: ExecutionContext, next: CallHandler): Observable<unknown> {
    const context = `${executionContext.getClass().name}/${executionContext.getHandler().name}`;
    const request = executionContext.switchToHttp().getRequest();
    const res = executionContext.switchToHttp().getResponse();

    const parent = this.tracer.extract(FORMAT_HTTP_HEADERS, request.headers);
    const span = this.tracer.startSpan(request.headers.host + request.path, { childOf: parent });

    const createJaegerInstance = (): TracingType => {
      return {
        span: span,
        tracer: this.tracer,
        tags: Tags,
        axios: (options: AxiosRequestConfig = {}) => {
          const headers = {};
          this.tracer.inject(span, FORMAT_HTTP_HEADERS, headers);
          options.headers = { ...options.headers, ...headers, traceid: request.id };

          return axios.create(options);
        },
        log: (eventName, payload) => {
          span.logEvent(eventName, payload);
        },
        setTag: (key, value) => {
          span.setTag(key, value);
        },
        addTags: (object) => {
          span.addTags(object);
        },
        setTracingTag: (key, value) => {
          span.setTag(key, value);
        },
        finish: () => {
          span.finish();
        },
        createSpan: (name, parent: Span) => {
          const parentObject: SpanOptions = parent ? { childOf: parent } : { childOf: span };
          return this.tracer.startSpan(name, parentObject);
        },
      };
    };

    request.tracing = createJaegerInstance();

    request.tracing.setTag('ip', request.ip);
    request.tracing.setTag('app', this.app);
    request.tracing.setTag(Tags.HTTP_METHOD, request.method);
    request.tracing.setTag('headers', request.headers);
    request.tracing.setTag('path', request.path);
    request.tracing.setTag('body', request.body);
    request.tracing.setTag('query', request.query);
    request.tracing.setTag('component', context);

    if (request.id) {
      request.tracing.setTag('traceId', request.id);
    }

    return next.handle().pipe(
      tap(() => {
        request.tracing.setTag(Tags.HTTP_STATUS_CODE, res.statusCode);
        request.tracing.finish();
      }),
    );
  }

  private getTracingLogger(logger: ILoggerService): TracingOptions {
    return {
      logger: {
        info: (message: string) => {
          logger.log(message);
        },
        error: (message: string) => {
          logger.error(message as unknown as InternalServerErrorException);
        },
      },
    };
  }
}
