import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { BadRequestException, Logger } from "@nestjs/common";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";
import { PurchaseTicketsDto } from "./dto/order.dto";

@Resolver(() => Order)
export class OrderResolver {
  private readonly logger = new Logger(OrderResolver.name);

  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  async getOrders(): Promise<Order[]> {
    this.logger.log("Fetching all orders");
    return await this.orderService.findAll();
  }

  @Mutation(() => Order)
  async purchaseTickets(
    @Args("purchaseTicketsData") purchaseTicketsData: PurchaseTicketsDto,
  ): Promise<Order> {
    const { eventId, userId, ticketCount } = purchaseTicketsData;
    console.log(purchaseTicketsData);
    if (!eventId || typeof eventId !== "string") {
      this.logger.error(`Invalid eventId format: ${eventId}`);
      throw new BadRequestException("Invalid eventId format");
    }
    if (!userId || typeof userId !== "string") {
      this.logger.error(`Invalid userId format: ${userId}`);
      throw new BadRequestException("Invalid userId format");
    }

    this.logger.log(
      `Purchase request: eventId=${eventId}, userId=${userId}, ticketCount=${ticketCount}`,
    );

    return await this.orderService.purchaseTickets(purchaseTicketsData);
  }
}
