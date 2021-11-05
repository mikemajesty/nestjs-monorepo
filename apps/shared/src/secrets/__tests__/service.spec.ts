import { Test } from '@nestjs/testing';

import { ISecretsService } from '../adapter';
import { SecretsService } from '../service';

describe('SecretsService', () => {
  let secrets: ISecretsService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: ISecretsService,
          useClass: SecretsService,
        },
      ],
    }).compile();

    secrets = app.get(ISecretsService);
  });

  describe('SecretsService', () => {
    test('should secrets successfully', () => {
      expect(secrets.ENV).toEqual('test');
      expect(secrets.PORT).toEqual(3000);
    });
  });
});
