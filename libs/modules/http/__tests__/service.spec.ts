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
    test('should server successfully without parameters', () => {
      expect(service.instance()).not.toBeUndefined();
    });

    test('should server successfully with parameters', () => {
      expect(service.instance({ timeout: 1000 })).not.toBeUndefined();
    });
  });
});
