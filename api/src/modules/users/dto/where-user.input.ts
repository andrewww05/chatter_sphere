import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { UserRole } from 'src/common/enums';

@InputType()
export class WhereUserInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    id: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    email: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    role: UserRole;

    @Field(() => String, { nullable: true })
    @IsOptional()
    publicId: string;
}
