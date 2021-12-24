import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_MAIN_API } from 'libs/modules';

import { ICatsService } from './adapter';
import { CatsController } from './controller';
import { Cats, CatSchema } from './schema';
import { CatsService } from './service';

@Module({
  controllers: [CatsController],
  imports: [MongooseModule.forFeature([{ name: Cats.name, schema: CatSchema }], DB_MAIN_API)],
  providers: [
    {
      provide: ICatsService,
      useClass: CatsService,
    },
  ],
  exports: [ICatsService],
})
export class CatsModule {}
