import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email' })
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  publicId: string;
}
