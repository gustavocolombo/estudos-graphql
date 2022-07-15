import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormOptions from './config/orm';
import RepoModule from './repo.module';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepoModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [],
  providers: [UserResolver],
})
export class AppModule {}
