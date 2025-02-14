import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GraphQLExceptionFilter } from "./filters/http-exception.filter";
import * as dotEnv from "dotenv";

dotEnv.config();

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix("/v1/api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new GraphQLExceptionFilter());

  app.enableShutdownHooks();

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Server is running on: http://localhost:${port}/graphql`);
}

bootstrap();
