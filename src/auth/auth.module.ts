import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PostgresqlService } from 'src/postgresql/postgresql.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, JwtService, PostgresqlService],
})
export class AuthModule {}
