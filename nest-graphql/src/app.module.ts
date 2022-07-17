import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormOptions from './config/orm';
import RepoModule from './repo.module';
import { UserResolver } from './resolvers/user.resolver';
import { MessagesResolver } from './resolvers/message.resolver';
import { PubSubModule } from './pubsub.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepoModule,
    PubSubModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [],
  providers: [UserResolver, MessagesResolver],
})
export class AppModule {}
