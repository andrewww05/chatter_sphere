import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/users.repository';
import { UserProfile } from './entities/user-profile.entity';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, UserProfile])],
  providers: [UsersResolver, UsersRepository, UsersService],
})
export class UsersModule {}
