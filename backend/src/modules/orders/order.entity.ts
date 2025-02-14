import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { ulid } from "ulid";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Event } from "../events/event.entity";
import { User } from "../users/user.entity";
import { IsInt, Min } from "class-validator";
import { OrderStatus } from "../../constant";

@ObjectType()
@Entity()
@Index("idx_order_event_id", ["eventId"])
@Index("idx_order_user_id", ["userId"])
@Index("idx_order_status", ["status"])
export class Order {
  @Field(() => String)
  @PrimaryColumn()
  id: string = ulid();

  @Field(() => String)
  @Column({ unique: true })
  orderNumber: string = ulid();

  @Field(() => Event)
  @ManyToOne(() => Event, (event) => event.id, { eager: true })
  @JoinColumn({ name: "eventId" })
  event: Event;

  @Field(() => String)
  @Column()
  eventId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => Int)
  @Column()
  @IsInt()
  @Min(1)
  ticketCount: number;

  @Field(() => Date)
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field(() => Date)
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  purchaseDate: Date;

  @Field(() => String)
  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.ACTIVE })
  status: OrderStatus;
}
