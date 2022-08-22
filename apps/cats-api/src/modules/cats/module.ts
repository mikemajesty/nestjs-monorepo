import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { TokenModule } from 'libs/modules/auth/token/module';
import { ConnectionName } from 'libs/modules/database/enum';
import { HttpModule } from 'libs/modules/http/module';
import { IsLoggedMiddleware } from 'libs/utils/middleware/auth/is-logged.middleware';
import { Connection, Model } from 'mongoose';

import { ICatsRepository } from './adapter';
import { CatsController } from './controller';
import { CatsRepository } from './repository';
import { CatDocument, Cats, CatSchema } from './schema';

@Module({
  imports: [TokenModule, HttpModule],
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
