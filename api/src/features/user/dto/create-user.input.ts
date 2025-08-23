import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDateString, IsEmail, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
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
}
