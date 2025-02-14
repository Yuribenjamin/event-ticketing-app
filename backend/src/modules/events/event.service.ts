import { Injectable } from "@nestjs/common";
import { EventRepository } from "./event.repository";
import { Event } from "./event.entity";
import { CreateEventDto } from "./dto/event.dto";

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }

  async findOne(id: string): Promise<Event | null> {
    return this.eventRepository.findOne(id);
  }

  async createEvent(createEvent: CreateEventDto): Promise<Event> {
    return this.eventRepository.create(createEvent);
  }
}
