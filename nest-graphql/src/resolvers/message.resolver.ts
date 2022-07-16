import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MoreThan } from 'typeorm';
import Messages from '../db/models/messages.entity';
import RepoService from '../repo.service';
import { MessagesInput } from './inputs/messages.inputs';

@Resolver()
export class MessagesResolver {
  constructor(private readonly repoService: RepoService) {}

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
}
