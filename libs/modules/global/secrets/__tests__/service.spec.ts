import { Test } from '@nestjs/testing';

import { ICommonSecrets } from '../adapter';
import { SecretsModule } from '../module';

describe('SecretsService', () => {
  let commonSecrets: ICommonSecrets;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [SecretsModule],
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

  describe('authAPI', () => {
    test('should get authAPI secrets successfully', () => {
      expect(commonSecrets.authAPI.PORT).toEqual('4000');
    });
  });
});
