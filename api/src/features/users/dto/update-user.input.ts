import { IsDateString, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field(() => String)
    id: string;

    @Field(() => String, { description: 'Public id' })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    publicId: string;

    @Field(() => String, { description: 'Name' })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    fullname: string;

    @Field(() => String, { description: 'Biography' })
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    biography: string;

    @Field(() => String, { description: 'Birth date' })
    @IsOptional()
    @IsDateString()
    birthDate: string;
}
