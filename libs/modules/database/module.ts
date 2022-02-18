import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SecretsService } from '../global/secrets/service';
import { DatabaseService } from './service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (secretsService: DatabaseService = new DatabaseService(new SecretsService())) => {
        return secretsService.getConfig();
      },
    }),
  ],
})
export class DataBaseModule {}
