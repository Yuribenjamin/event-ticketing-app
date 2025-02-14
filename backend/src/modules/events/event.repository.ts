import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "./event.entity";
import { CreateEventDto } from "./dto/event.dto";

// Demonstrating the use of the Repository pattern in a single service as a showcase.
// This implementation encapsulates database interactions, promoting better separation of concerns and testability.
// It works independently of the database used, allowing flexibility in switching between different databases.
// An advanced usage involves creating a class that holds all common methods, which can be reused across different layers for consistency and maintainability.
@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepo.find({ order: { date: "ASC" } });
  }

  async findOne(id: string): Promise<Event | null> {
    return this.eventRepo.findOne({ where: { id } });
  }

  async create(createEvent: CreateEventDto): Promise<Event> {
    const newEvent = this.eventRepo.create(createEvent);
    return this.eventRepo.save(newEvent);
  }
}
