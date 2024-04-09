import { Module } from '@nestjs/common';
import { CONFIG_SERVICE } from '../constants';
import { ConfigServiceProvider } from './app-config.service';

@Module({
  providers: [
    {
      provide: CONFIG_SERVICE,
      useClass: ConfigServiceProvider,
    },
    ConfigServiceProvider,
  ],
  exports: [AppConfigModule, ConfigServiceProvider],
})
export class AppConfigModule {}
