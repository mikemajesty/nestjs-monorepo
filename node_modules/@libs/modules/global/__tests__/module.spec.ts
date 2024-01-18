import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../module';

describe('GlobalModule', () => {
  let module: GlobalModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [GlobalModule],
    }).compile();

    module = app.get<GlobalModule>(GlobalModule);
  });

  it('should be defined', () => {
    expect(module).toBeInstanceOf(GlobalModule);
  });
});
