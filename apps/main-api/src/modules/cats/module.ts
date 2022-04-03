import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from 'libs/modules/auth/token/module';
import { ConnectionName } from 'libs/modules/database/enum';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { IsLoggedMiddleware } from 'libs/utils/middleware/auth/is-logged.middleware';

import { ICatsRepository } from './adapter';
import { CatsController } from './controller';
import { CatsRepository } from './repository';
import { Cats, CatSchema } from './schema';

@Module({
  controllers: [CatsController],
  imports: [
    // if you does't need of pre save, use this line
    // MongooseModule.forFeature([{ name: Cats.name, schema: CatSchema }], ConnectionName.CATS),
    TokenModule,
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
      ConnectionName.CATS,
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
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(IsLoggedMiddleware).forRoutes({ path: 'cats*', method: RequestMethod.ALL });
  }
}
