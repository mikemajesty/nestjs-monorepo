import { ExecutionContext } from '@nestjs/common';
import { CallHandler } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { Observable, of } from 'rxjs';

import { HttpLoggerInterceptor } from '../http-logger.interceptor';

describe('HttpLoggerInterceptor', () => {
  const callHandlerMOck: CallHandler = jest.genMockFromModule<CallHandler>('@nestjs/common');

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

  test('should catch successfully without traceid', async () => {
    const mock = jest.genMockFromModule<Observable<unknown>>('rxjs');
    jest.spyOn(mock, 'pipe').mockReturnValue(of(true));
    callHandlerMOck.handle = () => mock;

    const mockExecutionContext = {
      getClass: () => ({ name: 'dummy' }),
      getHandler: () => ({ name: 'dummy' }),
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
        getResponse: () => ({ headers: {} }),
      }),
    } as unknown as ExecutionContext;

    const result = httpLoggerInterceptor.intercept(mockExecutionContext, callHandlerMOck);

    expect(result).not.toBeUndefined();
  });

  test('should catch successfully with traceid', async () => {
    const mock = jest.genMockFromModule<Observable<unknown>>('rxjs');
    jest.spyOn(mock, 'pipe').mockReturnValue(of(true));
    callHandlerMOck.handle = () => mock;

    const mockExecutionContext = {
      getClass: () => ({ name: 'dummy' }),
      getHandler: () => ({ name: 'dummy' }),
      switchToHttp: () => ({
        getRequest: () => ({ headers: { traceid: 'dummy' } }),
        getResponse: () => ({ headers: {} }),
      }),
    } as unknown as ExecutionContext;

    const result = httpLoggerInterceptor.intercept(mockExecutionContext, callHandlerMOck);

    expect(result).not.toBeUndefined();
  });
});
