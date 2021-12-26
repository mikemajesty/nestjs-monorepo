import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SecretsService } from 'libs/modules/global/secrets/service';

import { ICatsRepository } from './adapter';
import { CatsController } from './controller';
import { CatsRepository } from './repository';
import { Cats, CatSchema } from './schema';

@Module({
  controllers: [CatsController],
  imports: [
    MongooseModule.forFeature([{ name: Cats.name, schema: CatSchema }], new SecretsService().mainAPI.db.Database),
  ],
  providers: [
    {
      provide: ICatsRepository,
      useClass: CatsRepository,
    },
  ],
  exports: [ICatsRepository],
})
export class CatsModule {}
