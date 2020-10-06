import { User } from '../../graphql';
import { User as DbUser } from '../schemas';

export class UserDto extends User {
  constructor(user: DbUser) {
    super();
    this.id = user.id;
    this.name = user.name;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
  }
}
