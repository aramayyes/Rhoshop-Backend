import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas';
import { CreateUserDto, UserDto } from './dto';
import { createHash } from '../utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  /**
   * Finds a user with given email.
   * @param email Email of wanted user.
   */
  async findByEmail(email: string): Promise<User> {
    return this.usersModel.findOne({ email: email }).exec();
  }

  /**
   * Creates a user.
   * @param userPayload Contains user data which will be created.
   */
  async create(userPayload: CreateUserDto): Promise<UserDto> {
    userPayload.password = await createHash(userPayload.password);
    return new UserDto(await this.usersModel.create(userPayload));
  }
}
