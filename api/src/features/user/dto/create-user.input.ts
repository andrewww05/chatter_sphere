import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email' })
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @MaxLength(30)
  publicId: string;
}
