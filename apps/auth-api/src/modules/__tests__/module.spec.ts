import { Test, TestingModule } from '@nestjs/testing';

import { MainModule } from '../module';

describe('MainModule', () => {
  let mainModule: MainModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [MainModule],
    }).compile();

    mainModule = app.get<MainModule>(MainModule);
  });

  it('should be defined', () => {
    expect(mainModule).toBeInstanceOf(MainModule);
  });
});
