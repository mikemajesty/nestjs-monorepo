import { ExecutionContext } from '@nestjs/common';
import { CallHandler } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { Observable, of } from 'rxjs';

import { LoggerModule } from '../../../modules/global/logger/module';
import { PerformanceInterceptor } from '../http-performance.interceptor';

describe('PerformanceInterceptor', () => {
  const callHandlerMOck: CallHandler = jest.genMockFromModule<CallHandler>('@nestjs/common');

  const mockExecutionContext = {
    getClass: () => ({ name: 'dummy' }),
    getHandler: () => ({ name: 'dummy' }),
  } as unknown as ExecutionContext;

  let performanceInterceptor: PerformanceInterceptor;

  beforeEach(async () => {
    jest.clearAllMocks();
    const app = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [PerformanceInterceptor],
    }).compile();

    performanceInterceptor = app.get(PerformanceInterceptor);
  });

  test('should catch successfully', async () => {
    const mock = jest.genMockFromModule<Observable<unknown>>('rxjs');
    jest.spyOn(mock, 'pipe').mockReturnValue(of(true));
    callHandlerMOck.handle = () => mock;

    const result = performanceInterceptor.intercept(mockExecutionContext, callHandlerMOck);

    expect(result).not.toBeUndefined();
  });
});
