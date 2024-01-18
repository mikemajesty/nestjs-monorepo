import { Test, TestingModule } from '@nestjs/testing';

import { SecretsService } from '../../secrets/service';
import { LoggerModule } from '../module';

describe('LoggerModule', () => {
  let loggerModule: LoggerModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [LoggerModule, SecretsService],
    }).compile();

    loggerModule = app.get<LoggerModule>(LoggerModule);
  });

  it('should be defined', () => {
    expect(loggerModule).toBeInstanceOf(LoggerModule);
  });
});
