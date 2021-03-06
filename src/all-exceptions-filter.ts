import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-express';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof ApolloError) {
      return exception;
    }

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      const props = typeof res === 'string' ? {} : res;
      let GqlError: any = ApolloError;

      switch (exception.constructor) {
        case BadRequestException:
          GqlError = UserInputError;
          break;
        case ForbiddenException:
          GqlError = ForbiddenError;
          break;
        case UnauthorizedException:
          GqlError = AuthenticationError;
          break;
      }

      return new GqlError(exception.message, props);
    }

    if (exception.constructor.name === 'MongoError') {
      const mongoException = <any>exception;
      if (mongoException.code === 11000) {
        return new UserInputError('Duplicate entry', {
          keys: Object.keys(mongoException.keyPattern),
        });
      }
    }
    return new Error('Something went wrong.');
  }
}
