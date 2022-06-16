import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { initTracer, JaegerTracer, TracingConfig, TracingOptions } from 'jaeger-client';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
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

    const options: TracingOptions = {
      tags: {
        version: version,
        app: app,
      },
      logger: {
        info: (message: string) => {
          logger.log(message);
        },
        error: (message: string) => {
          logger.error(message as unknown as InternalServerErrorException);
        },
      },
    };
    this.tracer = initTracer(config, options);
  }

  intercept(executionContext: ExecutionContext, next: CallHandler): Observable<unknown> {
    const context = `${executionContext.getClass().name}/${executionContext.getHandler().name}`;
    const request = executionContext.switchToHttp().getRequest();
    const res = executionContext.switchToHttp().getResponse();

    const parent = this.tracer.extract(FORMAT_HTTP_HEADERS, request.headers);
    const parentObject = parent ? { childOf: parent } : {};
    const span = this.tracer.startSpan(request.headers.host + request.path, parentObject);

    const createJaegerInstance = (): TracingType => {
      return {
        span: span,
        tracer: this.tracer,
        tags: Tags,
        axios: (options_: AxiosRequestConfig = {}) => {
          let options = {};
          const headers = {};
          this.tracer.inject(span, FORMAT_HTTP_HEADERS, headers);
          options_.headers = { ...options_.headers, ...headers, traceid: request.id };

          options = { ...options_ };
          return axios.create(options);
        },
        log: (eventName, payload) => {
          span.logEvent(eventName, payload);
        },
        setTag: (key, value) => {
          span.setTag(key, value);
        },
        addTags: (object) => {
          if (!object) return;
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
    request.tracing.setTag('method', request.method);
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
        request.tracing.setTag('statusCode', res.statusCode);
        request.tracing.finish();
      }),
    );
  }
}
