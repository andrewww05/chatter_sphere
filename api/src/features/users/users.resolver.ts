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
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import type { GraphQLResolveInfo } from 'graphql';
import {
    FindUserInput,
    FindUsersInput,
    UpdateUserInput,
} from './dto';
import { CommonHelper } from 'src/common/helpers';
import { UserProfile } from './entities/user-profile.entity';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => [User], { name: 'users' })
    public async findAll(
        @Args() args: FindUsersInput,
        @Info() info: GraphQLResolveInfo,
    ) {
        const fields = CommonHelper.getGraphQlFields(info);
        return this.usersService.findAll(
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

        const user = await this.usersService.findOneById(
            args.id,
            fields,
            args.where,
        );

        return user;
    }

    @ResolveField(() => UserProfile)
    public async profile(@Parent() user: Partial<User> & { id: string }, @Info() info: GraphQLResolveInfo) {
        const fields = CommonHelper.getGraphQlFields(info);
        return this.usersService.getProfile(user.id, fields);
    }

    @Mutation(() => User)
    public async updateUser(@Args('input') input: UpdateUserInput) {
        const { id, ...data } = input;

        return this.usersService.update(id, data);
    }

    @Mutation(() => User)
    public async removeUser(@Args('id', { type: () => Int }) id: string) {
        return this.usersService.remove(id);
    }
}
