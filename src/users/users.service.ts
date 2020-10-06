import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas';
import { CreateUserDto, UserDto } from './dto';
import { createHash } from '../utils';
import { ProductDto } from '../products/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  /**
   * Finds a user with given email.
   * @param email Email of wanted user.
   */
  async findByEmail(email: string): Promise<UserDto> {
    const users: UserDto[] = await this.usersModel
      .aggregate<ProductDto>([
        {
          $match: {
            email: email,
          },
        },
        {
          $project: {
            id: '$_id',
            _id: 0,
            name: 1,
            phoneNumber: 1,
            email: 1,
          },
        },
      ])
      .exec();

    if (users.length !== 0) {
      return users[0];
    } else {
      return null;
    }
  }

  /**
   * Creates a user.
   * @param userPayload
   */
  async create(userPayload: CreateUserDto): Promise<UserDto> {
    userPayload.password = await createHash(userPayload.password);
    return new UserDto(await this.usersModel.create(userPayload));
  }
}
