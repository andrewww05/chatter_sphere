import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Min, Max, IsOptional } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 1 })
  @IsOptional()
  @Min(1)
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  @IsOptional()
  @Min(0)
  @Max(100)
  items: number;
}