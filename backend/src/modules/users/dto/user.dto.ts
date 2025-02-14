import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsEmail, Length } from "class-validator";

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @Length(1, 50)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}
