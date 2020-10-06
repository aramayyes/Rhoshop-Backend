import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto, UserDto } from './dto';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../auth/guards';
import { CurrentUser } from '../current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  async create(
    @Args('createUserInput') userInput: CreateUserDto,
  ): Promise<UserDto> {
    return this.usersService.create(userInput);
  }

  @Mutation('updateUser')
  async update(
    @Args('updateUserInput') userInput: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.update(userInput);
  }

  @Query('user')
  @UseGuards(GqlJwtAuthGuard)
  async getUser(
    @CurrentUser() user: { id: string; email: string },
  ): Promise<UserDto> {
    return this.usersService.findById(user.id);
  }
}
