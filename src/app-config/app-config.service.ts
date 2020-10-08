import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get dbConnectionString(): string {
    return this.configService.get<string>('DB_CONNECTION_STRING');
  }

  get jwtKey(): string {
    return this.configService.get<string>('JWT_KEY');
  }

  get jwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRES');
  }
}
