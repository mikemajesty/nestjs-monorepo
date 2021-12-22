import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

import { DB_MAIN_API } from '../global/database/constants';
import { ICatsService } from './adapter';
import { Cat, CatSchema } from './schema';
import { CatsService } from './service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }], DB_MAIN_API)],
  providers: [
    {
      provide: ICatsService,
      useFactory: (model = getModelToken(Cat.name)) => new CatsService(model),
    },
  ],
  exports: [ICatsService],
})
export class CatsModule {}
