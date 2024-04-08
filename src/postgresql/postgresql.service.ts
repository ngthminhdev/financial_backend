import {
  Global,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Client, QueryArrayResult } from 'pg';

import { userScript } from "../sql/user-sql";

import { RetryTime } from 'src/enums';
import {categoryScript} from 'src/sql/category-sql';

@Global()
@Injectable()
export class PostgresqlService implements OnModuleInit, OnModuleDestroy {
  private postgresClient: Client;
  logger = new Logger('PostgreSQL-Service');

  async onModuleInit() {
    await this.connectPostgreSQL();

    this.logger.log('Start initing tables...');
    await this.initTables();
    this.logger.log('Init tables successfully');
  }

  async onModuleDestroy() {
    await this.postgresClient.end();
  }

  async initTables() {
    // const userTableScript = await fs.readFileSync(join(__dirname, '..', '/sql/user.sql'));
    await Promise.all([
      this.postgresClient.query(userScript),
      this.postgresClient.query(categoryScript),
    ]);
  }

  async connectPostgreSQL() {
    let isConnected: Boolean = false;
    let retryTime = RetryTime.Init;
    const maxRetry = RetryTime.Ten;

    while (!isConnected && retryTime < maxRetry) {
      try {
        this.logger.log('Connecting to PostgreSQL...');
        this.postgresClient = new Client({
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT),
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
          connectionTimeoutMillis: 5000,
          keepAlive: true,
          
        });
        await this.postgresClient.connect();
        isConnected = true;
        this.logger.log('Connect to PostgreSQL successfully');
      } catch (e) {
        isConnected = false;
        retryTime++;
        this.logger.error(`Error connecting to PostgreSQL at ${retryTime} times: ${e}`);
      }
    }
  }

  async query<T>(text: string, values?: any[]): Promise<T[]> {
    const result: QueryArrayResult<T[]> = await this.postgresClient.query(
      text,
      values,
    );
    return result.rows as T[];
  }

  async queryDetail<T>(text: string, values?: any[]): Promise<QueryArrayResult<T[]>> {
    const result: QueryArrayResult<T[]> = await this.postgresClient.query(
      text,
      values,
    );
    return result;
  }

}
