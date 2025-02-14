import { join } from "path";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLFormattedError } from "graphql";

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), "src/schema.gql"),
  playground: process.env.NODE_ENV !== "production",
  debug: process.env.NODE_ENV !== "production",
  formatError: (error: GraphQLFormattedError) => {
    const extensions = error.extensions as Record<string, unknown> | undefined;
    const originalError = extensions?.["originalError"] as
      | Record<string, unknown>
      | undefined;

    return {
      message:
        typeof originalError?.["message"] === "string"
          ? originalError.message
          : (error.message ?? "Internal server error"),
      code:
        typeof extensions?.["code"] === "string"
          ? extensions.code
          : "Internal server error",
      statusCode: 400,
    };
  },
};
