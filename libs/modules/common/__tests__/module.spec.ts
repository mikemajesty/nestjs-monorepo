import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '../module';

describe('CommonModule', () => {
  let module: CommonModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CommonModule],
    }).compile();

    module = app.get<CommonModule>(CommonModule);
  });

  it('should be defined', () => {
    expect(module).toBeInstanceOf(CommonModule);
  });
});
