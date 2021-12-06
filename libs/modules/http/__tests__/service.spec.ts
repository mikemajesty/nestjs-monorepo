import { Test } from '@nestjs/testing';

import { IHttpService } from '../adapter';
import { HttpService } from '../service';

describe('HttpService', () => {
  let service: IHttpService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: IHttpService,
          useClass: HttpService,
        },
      ],
    }).compile();

    service = app.get(IHttpService);
  });

  describe('HttpService', () => {
    test('should secrets successfully', () => {
      expect(service.http).not.toBeUndefined();
    });
  });
});
