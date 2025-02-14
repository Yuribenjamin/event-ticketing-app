import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./event.entity";
import { EventResolver } from "./event.resolver";
import { EventService } from "./event.service";
import { EventRepository } from "./event.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventResolver, EventService, EventRepository],
})
export class EventModule {}
