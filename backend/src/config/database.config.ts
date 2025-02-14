import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Event } from "../modules/events/event.entity";
import { Order } from "../modules/orders/order.entity";
import { User } from "../modules/users/user.entity";
import { getConfiguration } from "./configuration";

const config = getConfiguration();

export const databaseConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: config.postgresDatabase.host,
  port: config.postgresDatabase.port,
  username: config.postgresDatabase.username,
  password: config.postgresDatabase.password,
  database: config.postgresDatabase.database,
  entities: [Event, Order, User],
  migrations: ["dist/migrations/*.js"],
  synchronize: false,
  logging: config.app.env !== "production",
};
