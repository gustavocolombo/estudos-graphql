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

    console.log('deu certo', getMessages);

    return getMessages;
  }
}
