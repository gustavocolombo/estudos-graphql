import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { MoreThan } from 'typeorm';
import Messages from '../db/models/messages.entity';
import User from '../db/models/user.entity';
import { PUB_SUB } from '../pubsub.module';
import RepoService from '../repo.service';
import { MessagesInput } from './inputs/messages.inputs';

export const MESSAGE_ADDED = 'New message added';

@Resolver(() => Messages)
export class MessagesResolver {
  constructor(
    private readonly repoService: RepoService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Query(() => [Messages])
  public async getMessages(): Promise<Messages[]> {
    return await this.repoService.messageRepo.find();
  }

  @Mutation(() => Messages)
  public async createMessage(
    @Args('data') data: MessagesInput,
  ): Promise<Messages> {
    const message = await this.repoService.messageRepo.save(
      this.repoService.messageRepo.create(data),
    );
    this.pubSub.publish(MESSAGE_ADDED, { messageAdded: message });

    return message;
  }

  @Mutation(() => Messages)
  public async addLikeMessage(@Args('id') id: string): Promise<Messages> {
    const verifyMessage = await this.repoService.messageRepo.findOne({
      where: id,
    });

    if (!verifyMessage) throw new Error('Message not found');

    verifyMessage.likes = +1;

    return await this.repoService.messageRepo.save(verifyMessage);
  }

  @Query(() => [Messages])
  public async getMessagesWithMoreLikes(): Promise<any> {
    const getMessages = await this.repoService.messageRepo.find({
      where: { likes: MoreThan(0) },
      order: { likes: 'ASC' },
    });

    return getMessages;
  }

  @Query(() => [Messages])
  public async getMessageByUser(@Args('id') id: string): Promise<Messages[]> {
    const messages = await this.repoService.messageRepo.find({
      where: { user: { id } },
    });

    return messages;
  }

  @Query(() => [Messages])
  public async getMessagesWithMoreLikesByUser(
    @Args('id') id: string,
  ): Promise<Messages[]> {
    const messages = await this.repoService.messageRepo.find({
      where: { user: { id } },
      order: { likes: 'ASC' },
    });

    return messages;
  }

  @Mutation(() => Boolean)
  public async deleteMessage(@Args('id') id: string): Promise<boolean> {
    const deletedMessage = await this.repoService.messageRepo.delete(id);

    return true ? deletedMessage.affected === 1 : deletedMessage.affected === 0;
  }

  //work like includes PrismaORM
  @ResolveField(() => User)
  public async getUserAtCreateMessage(
    @Parent() parent: Messages,
  ): Promise<User> {
    return await this.repoService.userRepo.findOne(parent.user_id);
  }

  @ResolveField(() => Messages)
  public async messagesAlreadyCreatedByUser(
    @Parent() parent: User,
  ): Promise<Messages> {
    return await this.repoService.messageRepo.findOne(parent.id);
  }

  @Subscription(() => Messages)
  public async messageAdded() {
    return this.pubSub.asyncIterator(MESSAGE_ADDED);
  }
}
