import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { HttpModule, LoggerModule } from 'libs/infra';
import { ConnectionName } from 'libs/infra/database/enum';
import { TokenModule } from 'libs/modules/auth/token/module';
import { IsLoggedMiddleware } from 'libs/utils/middleware/auth/is-logged.middleware';
import { Connection, Model } from 'mongoose';

import { ICatsRepository } from './adapter';
import { CatsController } from './controller';
import { CatsRepository } from './repository';
import { CatDocument, Cats, CatSchema } from './schema';

@Module({
  imports: [TokenModule, HttpModule, LoggerModule],
  controllers: [CatsController],
  providers: [
    {
      provide: ICatsRepository,
      useFactory: (connection: Connection) =>
        new CatsRepository(connection.model(Cats.name, CatSchema) as unknown as Model<CatDocument>),
      inject: [getConnectionToken(ConnectionName.CATS)],
    },
  ],
  exports: [ICatsRepository],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(IsLoggedMiddleware).forRoutes({ path: '/cats', method: RequestMethod.ALL });
  }
}
