import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtTokenDto, SignInDto } from './dto';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('signIn')
  async signIn(
    @Args('signInInput') { email, password }: SignInDto,
  ): Promise<JwtTokenDto> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    return this.authService.signIn(user);
  }
}
