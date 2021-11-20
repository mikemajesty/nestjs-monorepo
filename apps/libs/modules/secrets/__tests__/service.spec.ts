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

  describe('common', () => {
    test('should get common secrets successfully', () => {
      expect(commonSecrets.ENV).toEqual('test');
    });
  });

  describe('mainAPI', () => {
    test('should get mainAPI secrets successfully', () => {
      expect(commonSecrets.mainAPI.PORT).toEqual('3000');
    });
  });

  describe('otherAPI', () => {
    test('should get otherAPI secrets successfully', () => {
      expect(commonSecrets.otherAPI.PORT).toEqual('4000');
    });
  });
});
