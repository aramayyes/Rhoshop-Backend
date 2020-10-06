import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtTokenDto, SignInDto } from './dto';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('signIn')
  async signIn(
    @Args('signInInput') { email, password }: SignInDto,
  ): Promise<JwtTokenDto> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.authService.signIn(user);
  }
}
