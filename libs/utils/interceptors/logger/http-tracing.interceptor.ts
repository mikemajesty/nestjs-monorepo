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
        info: (msg: string) => {
          logger.log(msg);
        },
        error: (msg: string) => {
          logger.error(msg as unknown as InternalServerErrorException);
        },
      },
    };
    this.tracer = initTracer(config, options);
  }

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const context = `${ctx.getClass().name}/${ctx.getHandler().name}`;
    const req = ctx.switchToHttp().getRequest();
    const res = ctx.switchToHttp().getResponse();

    const parent = this.tracer.extract(FORMAT_HTTP_HEADERS, req.headers);
    const parentObj = parent ? { childOf: parent } : {};
    const span = this.tracer.startSpan(req.headers.host + req.path, parentObj);

    const createJaegerInstance = (): TracingType => {
      return {
        span: span,
        tracer: this.tracer,
        tags: Tags,
        axios: (opts: AxiosRequestConfig = {}) => {
          let options = {};
          const headers = {};
          this.tracer.inject(span, FORMAT_HTTP_HEADERS, headers);
          opts.headers = { ...opts.headers, ...headers, traceid: req.id };

          options = { ...opts };
          return axios.create(options);
        },
        log: (eventName, payload) => {
          span.logEvent(eventName, payload);
        },
        setTag: (key, val) => {
          span.setTag(key, val);
        },
        addTags: (obj) => {
          if (!obj) return;
          span.addTags(obj);
        },
        setTracingTag: (key, val) => {
          span.setTag(key, val);
        },
        finish: () => {
          span.finish();
        },
        createSpan: (name, parent: Span) => {
          const parentObj: SpanOptions = parent ? { childOf: parent } : { childOf: span };
          return this.tracer.startSpan(name, parentObj);
        },
      };
    };

    req.tracing = createJaegerInstance();

    req.tracing.setTag('ip', req.ip);
    req.tracing.setTag('app', this.app);
    req.tracing.setTag('method', req.method);
    req.tracing.setTag('headers', req.headers);
    req.tracing.setTag('path', req.path);
    req.tracing.setTag('body', req.body);
    req.tracing.setTag('query', req.query);
    req.tracing.setTag('context', context);
    req.tracing.setTag('traceId', req.id);

    return next.handle().pipe(
      tap(() => {
        req.tracing.setTag('statusCode', res.statusCode);
        req.tracing.setTag('statusMessage', res.statusMessage);
        req.tracing.finish();
      }),
    );
  }
}
