import { Test, TestingModule } from '@nestjs/testing';

import { HttpModule } from '../module';

describe('HttpModule', () => {
  let loggerModule: HttpModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [HttpModule],
    }).compile();

    loggerModule = app.get<HttpModule>(HttpModule);
  });

  it('should be defined', () => {
    expect(loggerModule).toBeInstanceOf(HttpModule);
  });
});
