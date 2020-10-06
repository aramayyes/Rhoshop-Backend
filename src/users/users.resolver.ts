import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto, UserDto } from './dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  async create(
    @Args('createUserInput') userInput: CreateUserDto,
  ): Promise<UserDto> {
    return this.usersService.create(userInput);
  }
}
