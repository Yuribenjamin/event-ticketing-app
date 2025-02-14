import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { BadRequestException, Logger } from "@nestjs/common";
import { CreateUserDto } from "./dto/user.dto";

@Resolver(() => User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async getUser(@Args("id") id: string): Promise<User> {
    if (!id || typeof id !== "string") {
      this.logger.error(`Invalid ID format: ${id}`);
      throw new BadRequestException("Invalid ID format");
    }

    const user = await this.userService.findOne(id);
    if (!user) {
      this.logger.warn(`User not found with id=${id}`);
      throw new BadRequestException("User not found");
    }
    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Args("createUser") createUser: CreateUserDto,
  ): Promise<User> {
    this.logger.log(`Creating user with email=${createUser.email}`);
    return await this.userService.createUser(createUser);
  }
}
