import { Test } from '@nestjs/testing';

import { IHttpService } from '../adapter';
import { HttpModule } from '../module';

describe('HttpService', () => {
  let service: IHttpService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();

    service = app.get(IHttpService);
  });

  describe('HttpService', () => {
    test('should secrets successfully', () => {
      expect(service.http).not.toBeUndefined();
    });
  });
});
