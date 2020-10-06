import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfiguration } from './envConfiguration';
import { AppConfigService } from './appConfig.service';

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
