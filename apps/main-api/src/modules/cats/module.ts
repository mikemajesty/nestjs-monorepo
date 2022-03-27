import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { TableName } from 'libs/modules/global/secrets/enum';

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
            schema.pre('save', () => {
              logger.log(`Hi I'm your ${Cats.name} schema pre save`);
            });
            return schema;
          },
          inject: [ILoggerService],
        },
      ],
      TableName.CATS,
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
