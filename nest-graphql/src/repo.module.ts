import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import User from './db/models/user.entity';
import Messages from './db/models/messages.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Messages])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
