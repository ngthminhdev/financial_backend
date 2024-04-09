import { Global, Module } from '@nestjs/common';
import { PostgresqlService } from './postgresql.service';

@Global()
@Module({
  providers: [PostgresqlService],
  exports: [PostgresqlService]
})
export class PostgresqlModule {}
