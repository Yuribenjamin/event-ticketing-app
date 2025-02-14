import { InputType, Field, Int, ArgsType } from "@nestjs/graphql";
import {
  IsString,
  IsDate,
  IsInt,
  Min,
  IsNotEmpty,
  Matches,
} from "class-validator";

@InputType()
export class CreateEventDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  totalTickets: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  availableTickets: number;

  @Field(() => Boolean, { nullable: true })
  get isSoldOut(): boolean {
    return this.availableTickets === 0;
  }
}

@ArgsType()
export class GetEventDto {
  @Field()
  @IsString()
  @Matches(/^[0-9A-HJKMNP-TV-Z]{26}$/, {
    message: "ID must be a valid ULID",
  })
  id: string;
}
