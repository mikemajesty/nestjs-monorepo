import { Test, TestingModule } from '@nestjs/testing';

import { LibsModules } from '../module';

describe('LibsModules', () => {
  let module: LibsModules;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [LibsModules],
    }).compile();

    module = app.get<LibsModules>(LibsModules);
  });

  it('should be defined', () => {
    expect(module).toBeInstanceOf(LibsModules);
  });
});
