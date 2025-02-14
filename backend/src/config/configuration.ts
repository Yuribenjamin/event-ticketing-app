import * as dotEnv from "dotenv";
import { Configuration } from "src/types";

dotEnv.config();

export const getConfiguration = (): Configuration => {
  return {
    app: {
      env: process.env.NODE_ENV || "development",
      port: parseInt(process.env.SERVER_PORT as string, 10) || 3000,
    },
    postgresDatabase: {
      host: process.env.DATABASE_HOST as string,
      port: parseInt(process.env.DATABASE_PORT as string, 10) || 5433,
      username: process.env.DATABASE_USER as string,
      password: process.env.DATABASE_PASSWORD as string,
      database: process.env.DATABASE_NAME as string,
    },
  };
};
