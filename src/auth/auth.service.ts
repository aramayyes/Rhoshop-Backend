import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { isValidPassword } from '../utils';
import { UserDto } from '../users/dto';
import { JwtTokenDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await isValidPassword(password, user.password))) {
      return new UserDto(user);
    }
    return null;
  }

  async signIn(user: UserDto): Promise<JwtTokenDto> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      email: user.email,
    };
  }
}
