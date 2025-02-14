import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { DataSource } from "typeorm";
import { Event } from "../events/event.entity";
import { Order } from "./order.entity";
import { User } from "../users/user.entity";
import { PurchaseTicketsDto } from "./dto/order.dto";
import { ulid } from "ulid";

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(private readonly dataSource: DataSource) {}

  async purchaseTickets(
    purchaseTicketsData: PurchaseTicketsDto,
  ): Promise<Order> {
    const { eventId, userId, ticketCount } = purchaseTicketsData;

    if (ticketCount < 1) {
      this.logger.error(`Invalid ticket count: ${ticketCount}`);
      throw new BadRequestException("You must purchase at least one ticket.");
    }

    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        this.logger.log(
          `Starting transaction for eventId=${eventId}, userId=${userId}`,
        );
        const event = await transactionalEntityManager.findOne(Event, {
          where: { id: eventId },
          lock: { mode: "pessimistic_write" },
        });
        if (!event) {
          this.logger.error(`Event not found: eventId=${eventId}`);
          throw new NotFoundException("Event not found");
        }

        if (event.availableTickets < ticketCount) {
          this.logger.warn(
            `Not enough tickets available: requested=${ticketCount}, available=${event.availableTickets}`,
          );
          throw new BadRequestException(
            `Only ${event.availableTickets} tickets are available`,
          );
        }

        const user = await transactionalEntityManager.findOne(User, {
          where: { id: userId },
        });

        if (!user) {
          this.logger.error(`User not found: userId=${userId}`);
          throw new NotFoundException("User not found");
        }

        event.availableTickets -= ticketCount;
        await transactionalEntityManager.save(event);

        const order = transactionalEntityManager.create(Order, {
          id: ulid(),
          orderNumber: ulid(),
          event,
          user,
          ticketCount,
          purchaseDate: new Date(),
        });

        return await transactionalEntityManager.save(order);
      },
    );
  }

  async findAll(): Promise<Order[]> {
    return await this.dataSource.getRepository(Order).find({
      order: { createdAt: "DESC" },
    });
  }
}
