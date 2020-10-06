import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, SECRET } from './jwtOptions';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: EXPIRES_IN },
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
