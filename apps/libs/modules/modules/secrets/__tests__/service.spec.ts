import { Test } from '@nestjs/testing';

import { ICommonSecrets } from '../adapter';
import { SecretsService } from '../service';

describe('SecretsService', () => {
  let commonSecrets: ICommonSecrets;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: ICommonSecrets,
          useClass: SecretsService,
        },
      ],
    }).compile();

    commonSecrets = app.get(ICommonSecrets);
  });

  describe('mainAPI', () => {
    test('should get mainAPI secrets successfully', () => {
      expect(commonSecrets.mainAPI.PORT).toEqual('3000');
    });
  });
});
