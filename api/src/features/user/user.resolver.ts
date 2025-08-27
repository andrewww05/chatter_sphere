import {
    Resolver,
    Query,
    Mutation,
    Args,
    Int,
    Info,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import type { GraphQLResolveInfo } from 'graphql';
import {
    CreateUserInput,
    FindUserInput,
    FindUsersInput,
    UpdateUserInput,
} from './dto';
import { CommonHelper } from 'src/common/helpers';
import { MessageResponse } from 'src/common/entities';
import { UserProfile } from './entities/user-profile.entity';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => MessageResponse)
    public async createUser(@Args('input') createUserInput: CreateUserInput) {
        return this.userService.create(createUserInput);
    }

    @Query(() => [User], { name: 'users' })
    public async findAll(
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
    public async findUser(
        @Args() args: FindUserInput,
        @Info() info: GraphQLResolveInfo,
    ) {
        const fields = CommonHelper.getGraphQlFields(info, ['id']);

        const user = await this.userService.findOne(
            args.id,
            fields,
            args.where,
        );

        return user;
    }

    @ResolveField(() => UserProfile)
    public async profile(@Parent() user: Partial<User> & { id: string }, @Info() info: GraphQLResolveInfo) {
        const fields = CommonHelper.getGraphQlFields(info);
        return this.userService.getProfile(user.id, fields);
    }

    @Mutation(() => User)
    public async updateUser(@Args('input') input: UpdateUserInput) {
        const { id, ...data } = input;

        return this.userService.update(id, data);
    }

    @Mutation(() => User)
    public async removeUser(@Args('id', { type: () => Int }) id: string) {
        return this.userService.remove(id);
    }
}
