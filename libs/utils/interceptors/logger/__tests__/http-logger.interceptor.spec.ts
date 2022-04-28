import { ExecutionContext } from '@nestjs/common';
import { CallHandler } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { Observable, of } from 'rxjs';

import { HttpLoggerInterceptor } from '../http-logger.interceptor';

describe('HttpLoggerInterceptor', () => {
  const callHandlerMOck: CallHandler = jest.genMockFromModule<CallHandler>('@nestjs/common');

  const mockExecutionContext = {
    getClass: () => ({ name: 'dummy' }),
    getHandler: () => ({ name: 'dummy' }),
    getArgs: () => [{ host: '0.0.0.0', originalUrl: 'api' }, { req: { headers: {} } }],
  } as unknown as ExecutionContext;
  let httpLoggerInterceptor: HttpLoggerInterceptor;

  beforeEach(async () => {
    jest.clearAllMocks();
    const app = await Test.createTestingModule({
      providers: [
        HttpLoggerInterceptor,
        {
          provide: ILoggerService,
          useValue: { pino: jest.fn() },
        },
      ],
    }).compile();

    httpLoggerInterceptor = app.get(HttpLoggerInterceptor);
  });

  test('should catch successfully', async () => {
    const mock = jest.genMockFromModule<Observable<unknown>>('rxjs');
    jest.spyOn(mock, 'pipe').mockReturnValue(of(true));
    callHandlerMOck.handle = () => mock;

    const result = httpLoggerInterceptor.intercept(mockExecutionContext, callHandlerMOck);

    expect(result).not.toBeUndefined();
  });
});
