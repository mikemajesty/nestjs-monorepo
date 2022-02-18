import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DataBaseModule } from 'libs/modules';
import { CommonModule } from 'libs/modules/common';
import { GlobalModule } from 'libs/modules/global';
import { join } from 'path';

import { HealthModule } from './health/module';
import { StudentModule } from './student/module';

@Module({
  imports: [
    HealthModule,
    GlobalModule,
    CommonModule,
    DataBaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/apps/student-api/src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    StudentModule,
  ],
})
export class MainModule {}
