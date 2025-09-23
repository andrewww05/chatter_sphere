import {
    IsDateString,
    IsEmail,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
    @Field(() => String)
    id: string;

    @Field(() => String, { description: 'Email' })
    @IsEmail()
    email: string;

    @Field(() => String, { description: 'Public id' })
    @IsString()
    @MaxLength(30)
    publicId: string;

    @Field(() => String, { description: 'Name' })
    @IsString()
    @MaxLength(100)
    fullname: string;

    @Field(() => String, { description: 'Birth date' })
    @IsDateString()
    birthDate: string;

    @Field(() => String, { description: 'Biography' })
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    biography: string;
}
