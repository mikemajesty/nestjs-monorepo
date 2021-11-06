import { Test, TestingModule } from '@nestjs/testing';

import { SharedModule } from '../module';

describe('SharedModule', () => {
  let module: SharedModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [SharedModule],
    }).compile();

    module = app.get<SharedModule>(SharedModule);
  });

  it('should be defined', () => {
    expect(module).toBeInstanceOf(SharedModule);
  });
});
