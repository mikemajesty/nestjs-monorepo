import { Injectable, InternalServerErrorException, Scope } from '@nestjs/common';
import { green, isColorSupported, red, yellow } from 'colorette';
import { PinoRequestConverter } from 'convert-pino-request-to-curl';
import { ApiException } from 'libs/utils';
import { DateTime } from 'luxon';
import { LevelWithSilent, Logger, pino } from 'pino';
import * as pinoElastic from 'pino-elasticsearch';
import { HttpLogger, pinoHttp } from 'pino-http';
import { multistream } from 'pino-multi-stream';
import pinoPretty from 'pino-pretty';
import { Transform } from 'stream';
import { v4 as uuidv4 } from 'uuid';

import { ILoggerService } from './adapter';
import { ErrorType, MessageType } from './type';

@Injectable({ scope: Scope.REQUEST })
export class LoggerService implements ILoggerService {
  pino: HttpLogger;
  private context: string;
  private app: string;
  private streamToElastic: Transform;

  constructor(private readonly elkUrl: string) {
    const index = `monorepo-logs-${this.getDateFormat(new Date(), 'yyyy-MM')}`;

    this.streamToElastic = pinoElastic({
      index,
      consistency: 'one',
      node: this.elkUrl,
      'es-version': 7,
      'flush-bytes': 1000,
    });
  }

  connect(logLevel: LevelWithSilent): void {
    const pinoLogger = pino(
      {
        useLevelLabels: true,
        level: logLevel || 'trace',
      },
      multistream([
        {
          level: 'trace',
          stream: pinoPretty(this.getPinoConfig()),
        },
        { level: 'info', stream: this.streamToElastic },
      ]),
    );

    this.pino = pinoHttp(this.getPinoHttpConfig(pinoLogger));
  }

  setContext(ctx: string): void {
    this.context = ctx;
  }

  setApplication(app: string): void {
    this.app = app;
  }

  log(message: string): void {
    const msg = green(message);
    this.pino.logger.trace(msg);
  }

  info({ message, context, obj }: MessageType): void {
    const msg = green(message);

    this.setContext(context);

    if (obj) {
      this.pino.logger.info(obj, msg);
      return;
    }

    this.pino.logger.info(msg);
  }

  error(error: ErrorType, message?: string, context?: string): void {
    const errorResponse = this.getErrorResponse(error);

    const response =
      error?.name === ApiException.name
        ? { statusCode: error['statusCode'], message: error?.message }
        : errorResponse.value();

    this.pino.logger.error(
      {
        ...(response as object),
        context: context || this.context,
        type: error?.name === 'Error' ? ApiException.name : error?.name,
        traceid: this.getTraceId(error),
        timestamp: this.getDateFormat(),
        application: this.app,
        stack: error.stack,
      },
      red(message),
    );
  }

  fatal(error: ErrorType, message?: string, context?: string): void {
    this.pino.logger.fatal(
      {
        ...(error.getResponse() as object),
        context: context || this.context,
        type: error.name,
        traceid: this.getTraceId(error),
        timestamp: this.getDateFormat(),
        application: this.app,
        stack: error.stack,
      },
      red(message),
    );

    process.exit(1);
  }

  warn({ message, context, obj }: MessageType): void {
    const msg = yellow(message);

    this.setContext(context);

    if (obj) {
      this.pino.logger.warn(obj, msg);
      return;
    }

    this.pino.logger.warn(msg);
  }

  private getPinoConfig() {
    return {
      colorize: isColorSupported,
      levelFirst: true,
      ignore: 'pid,hostname',
      quietReqLogger: true,
      messageFormat: (log: unknown, messageKey: string) => {
        const message = log[String(messageKey)];
        const ctx = [this.context, this.app]?.find((c: string) => c);
        if (ctx) return `[${ctx}] ${message}`;

        return `${message}`;
      },
      customPrettifiers: {
        time: () => {
          return `[${this.getDateFormat()}]`;
        },
      },
    };
  }

  private getPinoHttpConfig(pinoLogger: Logger) {
    return {
      logger: pinoLogger,
      quietReqLogger: true,
      customSuccessMessage: (res) => {
        return `request ${res.statusCode >= 400 ? red('errro') : green('success')} with status code: ${res.statusCode}`;
      },
      customErrorMessage: function (error: Error, res) {
        return `request ${red('error')} with status code: ${res.statusCode} `;
      },
      genReqId: (req) => {
        return req.headers.traceid;
      },
      customAttributeKeys: {
        req: 'request',
        res: 'response',
        err: 'error',
        responseTime: 'timeTaken',
        reqId: 'traceid',
      },
      serializers: {
        err: () => undefined,
        req: (req) => {
          return {
            method: req.method,
            curl: PinoRequestConverter.getCurl(req),
          };
        },
        res: pino.stdSerializers.res,
      },
      customProps: (req): unknown => {
        const context = this.context || req.context;

        const traceid = req?.headers?.traceid || req.id;

        const path = `${req.protocol}://${req.headers.host}${req.url}`;

        this.pino.logger.setBindings({
          traceid,
          application: this.app,
          context: context,
          path,
          timestamp: this.getDateFormat(),
        });

        return {
          traceid,
          application: this.app,
          context: context,
          path,
          timestamp: this.getDateFormat(),
        };
      },
      customLogLevel: (res, err) => {
        if ([res.statusCode >= 400, err].some((s) => s)) {
          return 'error';
        }

        if ([res.statusCode >= 300, res.statusCode <= 400].every((s) => s)) {
          return 'silent';
        }

        return 'info';
      },
    };
  }

  private getErrorResponse(error: ErrorType) {
    const isFunction = typeof error?.getResponse === 'function';
    return [
      {
        conditional: typeof error === 'string',
        value: () => new InternalServerErrorException(error).getResponse(),
      },
      {
        conditional: isFunction && typeof error.getResponse() === 'string',
        value: () =>
          new ApiException(error.getResponse(), error.getStatus() || error['status'], error['context']).getResponse(),
      },
      {
        conditional: isFunction && typeof error.getResponse() === 'object',
        value: () => error?.getResponse(),
      },
      {
        conditional: error?.name === Error.name || error?.name == TypeError.name,
        value: () => new InternalServerErrorException(error.message).getResponse(),
      },
    ].find((c) => c.conditional);
  }

  private getDateFormat(date = new Date(), format = 'dd/MM/yyyy HH:mm:ss'): string {
    return DateTime.fromJSDate(date).setZone(process.env.TZ).toFormat(format);
  }

  private getTraceId(error): string {
    if (typeof error === 'string') return uuidv4();
    return [error.traceid, this.pino.logger.bindings()?.tranceId].find((e) => e);
  }
}
