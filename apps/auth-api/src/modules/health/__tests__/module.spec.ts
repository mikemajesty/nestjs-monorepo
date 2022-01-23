import { Test, TestingModule } from '@nestjs/testing';

import { HealthModule } from '../module';

describe('HealthModule', () => {
  let healthModule: HealthModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [HealthModule],
    }).compile();

    healthModule = app.get<HealthModule>(HealthModule);
  });

  it('should be defined', () => {
    expect(healthModule).toBeInstanceOf(HealthModule);
  });
});
