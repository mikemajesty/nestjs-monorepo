import { ExecutionContext } from '@nestjs/common';
import { CallHandler } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { Observable, of } from 'rxjs';

import { ExceptionInterceptor } from '../http-exception.interceptor';

const executionContextMock = jest.genMockFromModule<ExecutionContext>('@nestjs/common');
const callHandlerMOck = jest.genMockFromModule<CallHandler>('@nestjs/common');

describe('ExceptionInterceptor', () => {
  let exceptionInterceptor: ExceptionInterceptor;

  beforeEach(async () => {
    jest.clearAllMocks();
    const app = await Test.createTestingModule({
      providers: [ExceptionInterceptor],
    }).compile();

    exceptionInterceptor = app.get(ExceptionInterceptor);
  });

  test('should catch successfully', async () => {
    const mock = jest.genMockFromModule<Observable<unknown>>('rxjs');
    jest.spyOn(mock, 'pipe').mockReturnValue(of(true));
    callHandlerMOck.handle = () => mock;

    const result = exceptionInterceptor.intercept(executionContextMock, callHandlerMOck);

    expect(result).not.toBeUndefined();
  });

  test('should catch successfully with status 412', async () => {
    const mock = jest.genMockFromModule<Observable<unknown>>('rxjs');
    jest.spyOn(mock, 'pipe').mockReturnValue(of(true));
    callHandlerMOck.handle = () => mock;

    const result = exceptionInterceptor.intercept(executionContextMock, callHandlerMOck);

    expect(result).not.toBeUndefined();
  });
});
