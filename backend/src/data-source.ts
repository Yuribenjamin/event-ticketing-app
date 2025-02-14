import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { join } from "path";
import { Event } from "./modules/events/event.entity";
import { User } from "./modules/users/user.entity";
import { Order } from "./modules/orders/order.entity";

config();

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 5433,
  username: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "password",
  database: process.env.DATABASE_NAME || "ticketing",
  entities: [Event, Order, User],
  migrations: [join(__dirname, "./migrations/*.ts")],
  synchronize: false,
  logging: process.env.NODE_ENV !== "production",
  extra: {
    max: process.env.DB_MAX_CONNECTIONS
      ? Number(process.env.DB_MAX_CONNECTIONS)
      : 10,
    idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT
      ? Number(process.env.DB_IDLE_TIMEOUT)
      : 30000,
  },
};

export const AppDataSource = new DataSource(dataSourceOptions);
