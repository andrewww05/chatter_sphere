import { Resolver, Query, Mutation, Args, Int, Info } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import type { GraphQLResolveInfo } from 'graphql';
import { CreateUserInput, FindUserInput, FindUsersInput, UpdateUserInput } from './dto';
import { CommonHelper } from 'src/common/helpers';
import { MessageResponse } from 'src/common/entities';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => MessageResponse)
    createUser(
        @Args('input') createUserInput: CreateUserInput
    ) {
        return this.userService.create(createUserInput);
    }

    @Query(() => [User], { name: 'users' })
    async findAll(
        @Args() args: FindUsersInput,
        @Info() info: GraphQLResolveInfo,
    ) {
        const fields = CommonHelper.getGraphQlFields(info);
        return this.userService.findAll(
            args.page,
            args.items,
            fields,
            args.where,
        );
    }

    @Query(() => User, { name: 'user' })
    async findUser(
        @Args() args: FindUserInput,
        @Info() info: GraphQLResolveInfo,
    ) {
        const fields = CommonHelper.getGraphQlFields(info);

        const user = await this.userService.findOne(args.id, fields, args.where);

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

    // @ResolveField(() => User)
    // profile(@Parent() user: User) {
    //   return this.userService.getProfile(user.id);
    // }
}
