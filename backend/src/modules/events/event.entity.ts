import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import {
  Entity,
  PrimaryColumn,
  Column,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { ulid } from "ulid";
import { IsDate, IsInt, Min } from "class-validator";

@ObjectType()
@Entity()
@Index("idx_event_date", ["date"])
@Index("idx_event_id", ["id"])
@Index("idx_event_future", ["isFutureEvent"])
export class Event {
  @Field(() => ID)
  @PrimaryColumn()
  id: string = ulid();

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: "timestamp" })
  @IsDate()
  date: Date;

  @Field(() => Int)
  @Column()
  @IsInt()
  @Min(0)
  totalTickets: number;

  @Field(() => Int)
  @Column()
  @IsInt()
  @Min(0)
  availableTickets: number;

  @Field()
  @Column({ type: "boolean", default: false })
  isFutureEvent: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  updateIsFutureEvent() {
    this.isFutureEvent = this.date > new Date();
  }

  @Field(() => Boolean)
  get isSoldOut(): boolean {
    return this.availableTickets === 0;
  }
}
