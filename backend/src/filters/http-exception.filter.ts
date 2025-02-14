import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";

@Catch()
export class GraphQLExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();

    const httpException =
      exception instanceof HttpException
        ? exception
        : new HttpException(
            "Internal server error",
            HttpStatus.INTERNAL_SERVER_ERROR,
          );

    const status = httpException.getStatus();
    const responseMessage = httpException.getResponse();

    let errorMessage: string;
    let errorDetails: string | null = null;

    if (typeof responseMessage === "string") {
      errorMessage = responseMessage;
    } else if (
      typeof responseMessage === "object" &&
      responseMessage !== null
    ) {
      const errorResponse = responseMessage as {
        error?: string;
        message?: string;
      };
      errorMessage = errorResponse.message ?? "Internal server error";
      errorDetails = errorResponse.error ?? null;
    } else {
      errorMessage = "Internal server error";
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      error: errorDetails ?? errorMessage,
      type: info?.parentType?.toString() ?? "UnknownType",
      field: info?.fieldName ?? "UnknownField",
    };

    Logger.error(
      `${errorResponse.type} ${errorResponse.field}`,
      JSON.stringify(errorResponse),
      "GraphQLExceptionFilter",
    );

    return httpException;
  }
}
