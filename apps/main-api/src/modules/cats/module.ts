import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ILoggerService } from 'libs/modules';
import { SecretsService } from 'libs/modules/global/secrets/service';

import { ICatsRepository } from './adapter';
import { CatsController } from './controller';
import { CatsRepository } from './repository';
import { Cats, CatSchema } from './schema';

@Module({
  controllers: [CatsController],
  imports: [
    // if you does't need of pre save, use this line
    // MongooseModule.forFeature([{ name: Cats.name, schema: CatSchema }], new SecretsService().mainAPI.db.Database),
    MongooseModule.forFeatureAsync(
      [
        {
          name: Cats.name,
          useFactory: (logger: ILoggerService) => {
            const schema = CatSchema;
            schema.pre('save', function () {
              logger.log(`Hi I'm your ${Cats.name} schama pre save`);
            });
            return schema;
          },
          inject: [ILoggerService],
        },
      ],
      new SecretsService().mainAPI.db.Database,
    ),
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
