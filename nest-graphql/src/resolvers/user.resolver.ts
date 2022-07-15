import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
}
