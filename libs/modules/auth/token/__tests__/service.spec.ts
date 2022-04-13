import { Test, TestingModule } from '@nestjs/testing';
import { ISecretsService } from 'libs/modules/global/secrets/adapter';
import { SecretsModule } from 'libs/modules/global/secrets/module';

import { ITokenService } from '../adapter';
import { TokenService } from '../service';

describe('TokenService', () => {
  let tokenService: ITokenService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [SecretsModule],
      providers: [
        {
          provide: ITokenService,
          useFactory: (secret: ISecretsService) => new TokenService(secret),
          inject: [ISecretsService],
        },
      ],
    }).compile();

    tokenService = app.get<ITokenService>(ITokenService);
  });

  describe('verify', () => {
    test('should verify successfully', async () => {
      const token = tokenService.sign({ id: 1 });
      const modelToken: { id?: string } = await tokenService.verify(token.token);
      expect(modelToken).toHaveProperty('id');
      expect(modelToken.id).toEqual(1);
    });

    test('should throw malformed token error', async () => {
      await expect(tokenService.verify('tokenMock')).rejects.toThrowError('jwt malformed');
    });

    test('should throw invalid signature token error', async () => {
      const tokenMock =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjQ3ODQ4YzRhOGUyZjVmMzQ3NDhiNjYiLCJpYXQiOjE2NDg5NDQ1MzUsImV4cCI6MTY0ODk0NDU0NX0.RTajwMt3HJyIu7epECOU_eOkUOoqKnAlGtOhlRO3it4';
      await expect(tokenService.verify(tokenMock)).rejects.toThrowError('invalid signature');
    });

    test('should throw jwt expired token error', async () => {
      const tokenMock =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ4OTk2MDc4LCJleHAiOjE2NDg5OTYzNzh9.z9eupnKs3C3KurhiTmdIpj-IJG4RDQ2-ZADz3MAbUNs';
      await expect(tokenService.verify(tokenMock)).rejects.toThrowError('jwt expired');
    });
  });

  describe('sign', () => {
    test('should sign successfully', async () => {
      const decoded = tokenService.sign({ id: 1 });
      expect(decoded).toHaveProperty('token');
    });

    test('should sign successfully with options', async () => {
      const decoded = tokenService.sign({ id: 1 }, { expiresIn: 300 });
      expect(decoded).toHaveProperty('token');
    });
  });

  describe('decode', () => {
    test('should decode successfully', async () => {
      const { token } = tokenService.sign({ name: 'nameMock' });
      const decoded = tokenService.decode(token);
      expect(decoded).toHaveProperty('name');
    });
  });
});
