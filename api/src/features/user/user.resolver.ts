import { Resolver, Query, Mutation, Args, Int, Info } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import type { GraphQLResolveInfo } from 'graphql';
import graphqlFields from 'graphql-fields';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(returns => [User], { name: 'users' })
  async findAll(
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = Object.keys(graphqlFields(info));
    
    return this.userService.findAll(fields);
  }

  @Query(() => User, { name: 'user' })
  async findUser(
    @Args('id', { type: () => String }) id: string,
  ) {
    const user = await this.userService.findOne(id);
    
    return user;
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: string) {
    return this.userService.remove(id);
  }
}
