import { Entity, PrimaryColumn, Column } from "typeorm";
import { ulid } from "ulid";
import { ObjectType, Field } from "@nestjs/graphql";
import { IsEmail, IsString, Length } from "class-validator";

@ObjectType()
@Entity()
export class User {
  @Field(() => String)
  @PrimaryColumn()
  id: string = ulid();

  @Field(() => String)
  @Column()
  @IsString()
  @Length(1, 50)
  name: string;

  @Field(() => String)
  @Column()
  @IsEmail()
  email: string;
}
