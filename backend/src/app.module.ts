import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { databaseConfig } from "./config/database.config";
import { graphqlConfig } from "./config/graphql.config";
import { EventModule, OrderModule, UserModule } from "./modules";
import { validate } from "./config/config.validation";
import { ApolloDriver } from "@nestjs/apollo";
import { getConfiguration } from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfiguration],
      validate,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: () => graphqlConfig,
    }),
    EventModule,
    OrderModule,
    UserModule,
  ],
})
export class AppModule {}
