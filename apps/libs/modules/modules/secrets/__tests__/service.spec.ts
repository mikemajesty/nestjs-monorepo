import { Test } from '@nestjs/testing';

import { IMainAPISecrets } from '../adapter';
import { SecretsService } from '../service';

describe('SecretsService', () => {
  let mainApiSecrets: IMainAPISecrets;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: IMainAPISecrets,
          useClass: SecretsService,
        },
      ],
    }).compile();

    mainApiSecrets = app.get(IMainAPISecrets);
  });

  describe('mainAPI', () => {
    test('should get mainAPI secrets successfully', () => {
      expect(Number(mainApiSecrets.mainAPI.PORT)).toEqual(3000);
    });
  });
});
