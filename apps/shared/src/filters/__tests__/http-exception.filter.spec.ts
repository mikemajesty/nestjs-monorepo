import { AppException } from '../../utils';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppExceptionFilter } from '../http-exception.filter';

const mock = jest.genMockFromModule<ArgumentsHost>('@nestjs/common');

describe('AppExceptionFilter', () => {
  let appExceptionFilter: AppExceptionFilter;

  beforeEach(async () => {
    jest.clearAllMocks();
    const app = await Test.createTestingModule({
      providers: [AppExceptionFilter],
    }).compile();

    appExceptionFilter = app.get(AppExceptionFilter);
  });

  test('should catch successfully', () => {
    const error = new AppException('Error', HttpStatus.INTERNAL_SERVER_ERROR);

    mock.switchToHttp = () => ({
      getNext: jest.fn(),
      getResponse: jest.fn().mockReturnValue({
        status: () => ({ json: jest.fn() }),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: 'url',
      }),
    });
    appExceptionFilter.catch(error, mock);
  });

  test('should catch successfully without "code and context"', () => {
    const error = new AppException('Error');

    error.statusCode = undefined;
    error.context = undefined;
    mock.switchToHttp = () => ({
      getNext: jest.fn(),
      getResponse: jest.fn().mockReturnValue({
        status: () => ({ json: jest.fn() }),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: 'url',
      }),
    });
    appExceptionFilter.catch(error, mock);
  });

  test('should catch successfully with unknown "status"', () => {
    const error = new AppException('Error', 1000);

    error.statusCode = undefined;
    error.context = undefined;
    mock.switchToHttp = () => ({
      getNext: jest.fn(),
      getResponse: jest.fn().mockReturnValue({
        status: () => ({ json: jest.fn() }),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: 'url',
      }),
    });

    appExceptionFilter.catch(error, mock);
  });

  test('should catch successfully without error message', () => {
    const error = jest.genMockFromModule<AppException>('@nestjs/common');

    mock.switchToHttp = () => ({
      getNext: jest.fn(),
      getResponse: jest.fn().mockReturnValue({
        status: () => ({ json: jest.fn() }),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: 'url',
      }),
    });

    appExceptionFilter.catch(error, mock);
  });
});
