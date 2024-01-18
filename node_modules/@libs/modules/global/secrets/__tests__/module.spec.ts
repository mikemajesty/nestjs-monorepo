import { Test, TestingModule } from '@nestjs/testing';

import { SecretsModule } from '../module';

describe('SecretsModule', () => {
  let loggerModule: SecretsModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [SecretsModule],
    }).compile();

    loggerModule = app.get<SecretsModule>(SecretsModule);
  });

  it('should be defined', () => {
    expect(loggerModule).toBeInstanceOf(SecretsModule);
  });
});
