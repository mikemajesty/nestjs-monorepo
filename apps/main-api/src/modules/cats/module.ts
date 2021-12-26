import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_MAIN_API } from 'libs/modules';

import { ICatsRepository } from './adapter';
import { CatsController } from './controller';
import { CatsRepository } from './repository';
import { Cats, CatSchema } from './schema';

@Module({
  controllers: [CatsController],
  imports: [MongooseModule.forFeature([{ name: Cats.name, schema: CatSchema }], DB_MAIN_API)],
  providers: [
    {
      provide: ICatsRepository,
      useClass: CatsRepository,
    },
  ],
  exports: [ICatsRepository],
})
export class CatsModule {}
