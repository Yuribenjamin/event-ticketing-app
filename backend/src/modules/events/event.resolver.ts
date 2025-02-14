import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Event } from "./event.entity";
import { EventService } from "./event.service";
import { BadRequestException, Logger } from "@nestjs/common";
import { CreateEventDto, GetEventDto } from "./dto/event.dto";

@Resolver(() => Event)
export class EventResolver {
  private readonly logger = new Logger(EventResolver.name);

  constructor(private readonly eventService: EventService) {}

  @Query(() => [Event])
  async getEvents(): Promise<Event[]> {
    this.logger.log("Fetching all events");
    return this.eventService.findAll();
  }

  @Query(() => Event)
  async getEvent(@Args() args: GetEventDto): Promise<Event> {
    const { id } = args;
    if (!id || typeof id !== "string") {
      this.logger.error(`Invalid ID format: ${id}`);
      throw new BadRequestException("Invalid ID format");
    }

    this.logger.log(`Fetching event with id=${id}`);
    const event = await this.eventService.findOne(id);
    if (!event) {
      this.logger.warn(`Event not found with id=${id}`);
      throw new BadRequestException("Event not found");
    }
    return event;
  }

  @Mutation(() => Event)
  async createEvent(
    @Args("createEvent") createEvent: CreateEventDto,
  ): Promise<Event> {
    this.logger.log(`Creating event with name=${createEvent.name}`);
    return this.eventService.createEvent(createEvent);
  }
}
