import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas';
import { CreateUserDto, UserDto } from './dto';
import { createHash } from '../utils';
import { UpdateUserDto } from './dto/update-user.dto';

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
   * Finds a user with given id.
   * @param id Id of wanted user.
   */
  async findById(id: string): Promise<UserDto> {
    return new UserDto(await this.usersModel.findById(id));
  }

  /**
   * Updates a user with given id.
   * @param id Id of user to be updated.
   * @param payload Contains new data for user.
   */
  async update({ id, ...payload }: UpdateUserDto): Promise<UserDto> {
    if (payload.password) {
      payload.password = await createHash(payload.password);
    }
    return new UserDto(
      await this.usersModel.findByIdAndUpdate(id, payload, { new: true }),
    );
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
