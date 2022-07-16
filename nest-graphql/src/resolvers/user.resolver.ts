import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateResult } from 'typeorm';
import User from '../db/models/user.entity';
import RepoService from '../repo.service';
import { UserInput } from './inputs/user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async users(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Mutation(() => User)
  public async createUser(@Args('data') data: UserInput): Promise<User> {
    const user = await this.repoService.userRepo.save(
      this.repoService.userRepo.create(data),
    );

    return user;
  }

  @Mutation(() => User)
  public async softDeleteUser(@Args('id') id: string): Promise<string> {
    const user = await this.repoService.userRepo.findOne({
      where: { id },
    });

    const stringDeleted = 'Usuário desativado com sucesso';
    const stringNotDeleted = 'Não foi possível deletar o usuário';

    const softDelete = await this.repoService.userRepo.softDelete(user.id);
    return softDelete.affected === 1 ? stringDeleted : stringNotDeleted;
  }
}
