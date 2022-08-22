import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ApiException } from 'libs/utils';
import { MockUtils } from 'libs/utils/tests/mock-utils';
import { pinoHttp } from 'pino-http';

import { ILoggerService } from '../adapter';
import { LoggerService } from '../service';
import { ErrorType } from '../type';

describe('LoggerService', () => {
  let loggerService: ILoggerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: ILoggerService,
          useValue: new LoggerService('dummyURL'),
        },
      ],
    }).compile();

    loggerService = module.get(ILoggerService);
    loggerService.setApplication('Test');

    loggerService.pino = MockUtils.setMock({
      logger: {
        error: jest.fn(),
        warn: jest.fn(),
        info: jest.fn(),
        trace: jest.fn(),
        fatal: jest.fn(),
        bindings: () => true,
      },
    });
  });

  describe('error', () => {
    test('should log ApiException error', () => {
      const error = new ApiException('Error', HttpStatus.INTERNAL_SERVER_ERROR);

      loggerService.error(error);

      expect(loggerService.pino.logger.error).toHaveBeenCalled();
    });

    test('should log error with string Exception', () => {
      loggerService.error('ERROR' as unknown as ErrorType);

      expect(loggerService.pino.logger.error).toHaveBeenCalled();
    });

    test('should log error with getResponse string and getStatus function', () => {
      loggerService.error({ getResponse: () => 'ERROR', getStatus: () => 200 } as unknown as ErrorType);

      expect(loggerService.pino.logger.error).toHaveBeenCalled();
    });

    test('should log error with getResponse string and status property', () => {
      loggerService.error({
        getResponse: () => 'ERROR',
        getStatus: () => jest.fn(),
        status: 200,
      } as unknown as ErrorType);

      expect(loggerService.pino.logger.error).toHaveBeenCalled();
    });

    test('should log default node error', () => {
      loggerService.error(new Error('ERROR') as unknown as ErrorType);

      expect(loggerService.pino.logger.error).toHaveBeenCalled();
    });

    test('should log error with  getResponse function', () => {
      loggerService.error(new InternalServerErrorException(), 'ERROR', 'InternalServerErrorException');

      expect(loggerService.pino.logger.error).toHaveBeenCalled();
    });
  });

  describe('fatal', () => {
    test('should log fatal error', () => {
      loggerService.fatal(new InternalServerErrorException(), 'Error', 'Context');
      expect(loggerService.pino.logger.fatal).toHaveBeenCalled();
    });

    test('should log fatal error with global context', () => {
      loggerService.fatal(new InternalServerErrorException(), 'Error');
      expect(loggerService.pino.logger.fatal).toHaveBeenCalled();
    });
  });

  describe('warn', () => {
    test('should warn without obj', () => {
      loggerService.warn({ message: 'message', context: 'context' });

      expect(loggerService.pino.logger.warn).toHaveBeenCalled();
    });

    test('should warn without obj and context', () => {
      loggerService.warn({ message: 'message' });

      expect(loggerService.pino.logger.warn).toHaveBeenCalled();
    });

    test('should warn with all options', () => {
      loggerService.warn({ message: 'message', context: 'context', obj: {} });

      expect(loggerService.pino.logger.warn).toHaveBeenCalled();
    });
  });

  describe('log', () => {
    test('should log successfully', () => {
      loggerService.log('dummyMessage');

      expect(loggerService.pino.logger.trace).toHaveBeenCalled();
    });
  });

  describe('info', () => {
    test('should info without obj', () => {
      loggerService.info({ message: 'message', context: 'context' });

      expect(loggerService.pino.logger.info).toHaveBeenCalled();
    });

    test('should info without obj and context', () => {
      loggerService.info({ message: 'message' });

      expect(loggerService.pino.logger.info).toHaveBeenCalled();
    });

    test('should info with all options', () => {
      loggerService.info({ message: 'message', context: 'context', obj: {} });

      expect(loggerService.pino.logger.info).toHaveBeenCalled();
    });
  });

  describe('trace', () => {
    test('should trace without obj', () => {
      loggerService.trace({ message: 'message', context: 'context' });

      expect(loggerService.pino.logger.trace).toHaveBeenCalled();
    });

    test('should trace without obj and context', () => {
      loggerService.trace({ message: 'message' });

      expect(loggerService.pino.logger.trace).toHaveBeenCalled();
    });

    test('should trace with all options', () => {
      loggerService.trace({ message: 'message', context: 'context', obj: {} });

      expect(loggerService.pino.logger.trace).toHaveBeenCalled();
    });
  });

  describe('connect', () => {
    test('should connect successfully', () => {
      loggerService.connect('error');
      expect(pinoHttp).toHaveBeenCalled();
    });

    test('should connect successfully without loglevel', () => {
      loggerService.connect();
      expect(pinoHttp).toHaveBeenCalled();
    });
  });
});
