import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { PaginationArgs } from 'src/common/dto';
import { WhereUserInput } from './where-user.input';

@ArgsType()
export class FindUsersInput extends PaginationArgs {
    @Field(() => WhereUserInput, { nullable: true })
    @IsOptional()
    where: WhereUserInput;
}

@ArgsType()
export class FindUserInput extends FindUsersInput {
    @Field(() => String, { nullable: false })
    @IsString()
    id: string;
}