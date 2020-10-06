import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfiguration } from './env-configuration';
import { AppConfigService } from './app-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
