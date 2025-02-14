import { IsString, IsInt, Min, IsNotEmpty } from "class-validator";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class PurchaseTicketsDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  ticketCount: number;
}
