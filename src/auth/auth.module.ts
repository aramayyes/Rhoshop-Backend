import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { AppConfigService } from '../appConfig/app-config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: AppConfigService) => ({
        secret: configService.jwtKey,
        signOptions: { expiresIn: configService.jwtExpirationTime },
      }),
      inject: [AppConfigService],
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
