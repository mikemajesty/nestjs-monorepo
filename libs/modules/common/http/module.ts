import { Module } from '@nestjs/common';

import { IHttpService } from './adapter';
import { HttpService } from './service';

@Module({
  providers: [
    {
      provide: IHttpService,
      useClass: HttpService,
    },
  ],
  exports: [IHttpService],
})
export class HttpModule {}
