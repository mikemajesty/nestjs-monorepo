import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '../module';

describe('CoreModule', () => {
  let module: CoreModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CoreModule],
    }).compile();

    module = app.get<CoreModule>(CoreModule);
  });

  it('should be defined', () => {
    expect(module).toBeInstanceOf(CoreModule);
  });
});
