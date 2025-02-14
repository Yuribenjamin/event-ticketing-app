import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userRepo.find({
      order: { name: "ASC" },
    });
  }

  async findOne(id: string): Promise<User | null> {
    this.logger.log(`Fetching user with id=${id}`);
    return this.userRepo.findOne({ where: { id } });
  }

  async createUser(createUser: CreateUserDto): Promise<User> {
    this.logger.log(`Creating a new user with email=${createUser.email}`);
    const newUser = this.userRepo.create(createUser);
    return this.userRepo.save(newUser);
  }
}
