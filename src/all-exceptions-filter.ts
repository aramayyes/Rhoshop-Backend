import { ArgumentsHost, Catch } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(exception: unknown, host: ArgumentsHost) {
    if (!(exception instanceof ApolloError)) {
      return new Error('Something went wrong.');
    }

    return exception;
  }
}
