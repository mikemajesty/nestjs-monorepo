import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { ApiException } from '../../../../utils';
import { ILoggerService } from '../adapter';
import { LoggerModule } from '../module';

describe('LoggerService', () => {
  let loggerService: ILoggerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
    }).compile();

    loggerService = module.get(ILoggerService);
    loggerService.setContext('Test');
  });

  describe('error', () => {
    test('should error successfully', () => {
      const error = new ApiException('Error', HttpStatus.INTERNAL_SERVER_ERROR);

      loggerService.error(error);
    });

    test('should error successfully without context', () => {
      const error = new ApiException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
      error.context = undefined;

      loggerService.error(error);
    });

    test('should error successfully without statusCode', () => {
      const error = new ApiException('Error');
      error.statusCode = undefined;
      error.code = 'TIMEOUT';
      loggerService.error(error);
    });

    test('should axios error successfully', () => {
      const error = new ApiException('Error');
      error.config = {
        method: 'GET',
        url: 'https://utl',
      };
      loggerService.error(error);
    });
  });
});
