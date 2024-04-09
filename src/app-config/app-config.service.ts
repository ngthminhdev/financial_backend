import { Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class ConfigServiceProvider {

  async createRedisOptions(): Promise<any> {};

  createJwtOptions(): JwtModuleOptions {
    return {secretOrPrivateKey: process.env.ACCESS_TOKEN_SECRET};
  }

}
