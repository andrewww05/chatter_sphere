import { Field } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class RegisterUserDto {
    @Field(() => String, { description: 'Email' })
    @IsEmail()
    email: string;

    @Field(() => String, { description: 'Name' })
    @IsString()
    @MaxLength(100)
    fullname: string;
}
