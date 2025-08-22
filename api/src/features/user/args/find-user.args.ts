import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { PaginationArgs } from 'src/common/dto';
import { WhereUserInput } from '../inputs/where-user.input';

@ArgsType()
export class FindUsersInput extends PaginationArgs {
    @Field(() => WhereUserInput, { nullable: true })
    @IsOptional()
    where: WhereUserInput;
}

@ArgsType()
export class FindUserInput extends FindUsersInput {
    @Field(() => String, { nullable: false })
    id: string;
}