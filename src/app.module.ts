import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './app-config/app-config.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresqlModule } from './postgresql/postgresql.module';
import { TransactionModule } from './transaction/transaction.module';
import {AuthModule} from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    // env
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env${process.env.NODE_ENV}` }),

    AppConfigModule,
    PostgresqlModule,
    AuthModule,
    TransactionModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
